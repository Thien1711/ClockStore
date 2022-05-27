using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StoreApi.DTOs;
using StoreApi.Interfaces;
using StoreApi.Models;
using StoreApi.Services;

namespace StoreApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DonHangController : ControllerBase
    {
        private int pageSize = 9;
        private int range = 9;
        private readonly IDonHangRepository DonHangRepository;
        private readonly IKhachHangRepository khachHangRepository;
        private readonly INhanVienRepository nhanVienRepository;
        private readonly JwtKhachHangService jwtKhachHang;
        private readonly JwtNhanVienService jwtNhanVien;
        private readonly IQuyenRepository quyenRepository;
        private readonly IChiTietDHRepository chiTietDHRepository;
        private readonly ISanPhamRepository sanPhamRepository;
        public DonHangController(IDonHangRepository DonHangRepository, JwtKhachHangService jwtKhachHang,
        IKhachHangRepository khachHangRepository, JwtNhanVienService jwtNhanVien, INhanVienRepository nhanVienRepository,
        IQuyenRepository quyenRepository, IChiTietDHRepository chiTietDHRepository, ISanPhamRepository sanPhamRepository)
        {
            this.DonHangRepository = DonHangRepository;
            this.jwtKhachHang = jwtKhachHang;
            this.khachHangRepository = khachHangRepository;
            this.jwtNhanVien = jwtNhanVien;
            this.nhanVienRepository = nhanVienRepository;
            this.quyenRepository = quyenRepository;
            this.chiTietDHRepository = chiTietDHRepository;
            this.sanPhamRepository = sanPhamRepository;
        }

        // Client ko gọi api này nên bỏ
        // [HttpGet]
        // public IEnumerable<DonHang> GetAll()
        // {
        //     return this.DonHangRepository.DonHang_GetAll();
        // }
        
        // Client ko gọi api này nên bỏ
        // [HttpGet("{id}")]
        // public ActionResult<DonHang> GetById(int id)
        // {
        //     return this.DonHangRepository.DonHang_GetById(id);
        // }

        // User Page 
        // Hiển thị danh sách đơn hàng của tài khoản khách hàng
        [HttpGet("getByUserKH/{pageIndex}")]
        public ActionResult<ViewBillShopDto> GetByUserKH(int pageIndex)
        {
            // Phần xác thực tài khoản khách hàng 
            var jwt = Request.Cookies["jwt-khachhang"];
            
            if (jwt == null) {
                return null;
            }
            var token = jwtKhachHang.Verify(jwt);
            var user = token.Issuer;
            var kh = khachHangRepository.KhachHang_GetByUser(user);

            // Không tìm thấy khách hàng hoặc tài khoản bị khóa => return null
            // Tài khoản bị khóa thì không có quyền xem danh sách đơn hàng của tài khoản
            if(kh == null || kh.status == 0) {
                return null;
            }

            int count;

            var DonHangs = DonHangRepository.DonHang_GetByUserKH(user, pageIndex, pageSize, out count);
            
            var ListHD = new PaginatedList<DonHang>(DonHangs, count, pageIndex, pageSize);
            ViewBillShopDto view = new ViewBillShopDto() {
                ListHD = ListHD,
                pageIndex = pageIndex,
                pageSize = this.pageSize,
                count = count,
                range = this.range,
                totalPage = ListHD.TotalPages
            };
            return view;
        }

        // đơn hàng Page - Admin
        // Chỉ có quyền sửa trạng thái của đơn hàng
        [HttpPut("{id}")]
        public ActionResult<DonHang> UpdateHD([FromBody] DonHangDto hddto, int id)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    // Phần xác thực tài khoản nhân viên
                    var jwt = Request.Cookies["jwt-nhanvien"];
                    if (jwt == null)
                    {
                        return NotFound(new { message = "Nhân viên chưa đăng nhập tài khoản!" });
                    }
                    var token = jwtNhanVien.Verify(jwt);
                    var user = token.Issuer;
                    var nv = nhanVienRepository.NhanVien_GetByUser(user);

                    if (nv == null) {
                        return NotFound(new { message = "Không tìm thấy tài khoản nhân viên đang đăng nhập!" });
                    }

                    if (nv.status == 0) {
                        return NotFound(new { message = "Tài khoản nhân viên đang đăng nhập đã bị khóa!" });
                    }

                    // Kiểm tra nhân viên có quyền sửa đơn hàng không
                    var checkQuyen = quyenRepository.Quyen_CheckQuyenUser(nv.quyenId, "qlDonHang");

                    if(!checkQuyen) {
                        return BadRequest(new { message = "Tài khoản không có quyền sửa đơn hàng!" });
                    }
                    
                    var hd = DonHangRepository.DonHang_GetById(id);

                    if (hd == null || hddto.Id != id)
                    {
                        return NotFound(new { message = "Không tìm thấy đơn hàng cần sửa!" });
                    }

                    // đơn hàng chưa được nhân viên nào xử lý và đơn hàng thuộc quyền xử lý của nhân viên
                    // đó thì nhân viên đó mới được xử lý
                    // if(hd.NVuser != null && hd.NVuser != nv.user) {
                    //     return BadRequest(new { message = "đơn hàng thuộc quyền sửa đổi của nhân viên khác!" });
                    // }

                    // hd.status = hddto.status;
                    // Mapping
                    // Trạng thái gồm có
                    //     -   Đang xử lý : 1
                    //     -   Đang giao hàng: 2
                    //     -   Đã giao hàng : 3
                    //     -   Đã hủy đơn hàng : 4
                    if (hd.status < hddto.status)
                    {
                        if(hd.status == 1) {
                            hd.NVuser = nv.user;
                        }
                        
                        hd.status = hddto.status;

                        // Đã giao hàng thì cập nhật ngày nhận hàng
                        if(hd.status == 3) {
                            hd.date_receice = System.DateTime.Now;
                        }

                        if(hd.status == 4) {
                            var ctdh = chiTietDHRepository.ChiTietDH_GetByBillId(hd.Id);
                            List<int> listProduct_id = new List<int>(); // lưu Id sản phẩm
                            List<int> listSoluong = new List<int>();    // lưu số lượng sản phẩm 

                            foreach (var item in ctdh)
                            {
                                listProduct_id.Add(item.productId);
                                listSoluong.Add(item.amount);
                            }

                            var sps = sanPhamRepository.SanPham_LoadByListIdSP(listProduct_id);
                            
                            // cập nhật số lượng sản phẩm khi đơn hàng bị hủy
                            foreach (var item in sps)
                            {
                                for(int i = 0; i < listProduct_id.Count(); ++i) {
                                    if(item.Id == listProduct_id[i]) {
                                        item.amount = item.amount + listSoluong[i];
                                    }
                                }
                            }
                            // cập nhật sản phẩm trong database
                            sanPhamRepository.SanPham_UpdateRand((List<SanPham>)sps);
                        }
                        
                    }
                    else
                    {
                        return BadRequest(new { message = "Cập nhật trạng thái đơn hàng không thành công!" });
                    }

                    var HD = this.DonHangRepository.DonHang_Update(hd);
                    return Ok();
                }
                catch (Exception e)
                {
                    return BadRequest(e);
                }
            }
            return BadRequest();
        }

        // đơn hàng Page - Admin
        // Xóa đơn hàng
        [HttpDelete("{id}")]
        public ActionResult DeleteHD(int id)
        {
            // Phần xác thực tài khoản nhân viên
            var jwt = Request.Cookies["jwt-nhanvien"];
            if (jwt == null)
            {
                return NotFound(new { message = "Nhân viên chưa đăng nhập tài khoản!" });
            }
            var token = jwtNhanVien.Verify(jwt);
            var user = token.Issuer;
            var nv = nhanVienRepository.NhanVien_GetByUser(user);

            if (nv == null) {
                return NotFound(new { message = "Không tìm thấy tài khoản nhân viên đang đăng nhập!" });
            }

            if (nv.status == 0) {
                return NotFound(new { message = "Tài khoản nhân viên đang đăng nhập đã bị khóa!" });
            }

            var quyen = quyenRepository.Quyen_CheckQuyenUser(nv.quyenId, "qlDonHang");

            // Kiểm tra nhân viên có quyền xóa không
            if(!quyen) {
                return BadRequest(new { message = "Tài khoản không có quyền xóa đơn hàng!" });
            }
            
            var HD = DonHangRepository.DonHang_GetById(id);
            if (HD == null)
            {
                return NotFound();
            }

            // Đơn hàng ở trạng thái bị hủy thì mới được xóa
            if(HD.status != 4) {
                return BadRequest(new {message = "Đơn hàng phải ở trạng thái đã bị hủy mới được xóa!"});
            }

            DonHangRepository.DonHang_Delete(HD);
            return Ok(new { messgae = "Ok" });
        }

        // đơn hàng Page - Admin
        // Load danh sách đơn hàng
        [HttpPost("filter-admin")]
        public ViewDonHangAdminDto FilterAdmin(FilterDonHangDto data)
        {
            // Phần xác thực tài khoản nhân viên
            var jwt = Request.Cookies["jwt-nhanvien"];
            if (jwt == null)
            {
                return null;
            }
            var token = jwtNhanVien.Verify(jwt);
            var user = token.Issuer;
            var nv = nhanVienRepository.NhanVien_GetByUser(user);

            // Không tìm thấy nhân viên hoặc tài khoản bị khóa thì trả về null
            if (nv == null || nv.status == 0) {
                return null;
            }

            var quyen = quyenRepository.Quyen_CheckQuyenUser(nv.quyenId, "DonHang");
            if(!quyen) {
                return null;
            }

            int count;
            var DonHangs = DonHangRepository.DonHang_FilterAdmin(data.search, data.status, data.pageIndex, pageSize, out count);
            var ListHD = new PaginatedList<DonHang>(DonHangs, count, data.pageIndex, pageSize);
            ViewDonHangAdminDto view = new ViewDonHangAdminDto()
            {
                ListHD = ListHD,
                search = data.search,
                status = data.status,
                pageIndex = data.pageIndex,
                pageSize = this.pageSize,
                count = count,
                range = this.range,
                totalPage = ListHD.TotalPages
            };
            return view;
        }

        // [HttpPost]
        // public ActionResult<DonHang> AddHD(DonHangDto hddto) {

        //     if(ModelState.IsValid){
        //         try {
        //             DonHang hd = new DonHang();

        //             // Mapping
        //             // hd.LSPId = hddto.LSPId;
        //             hd.KHuser = hddto.KHuser;
        //             hd.NVuser = hddto.NVuser;
        //             hd.phone = hddto.phone;
        //             hd.address = hddto.address;
        //             hd.date_receice = hddto.date_receice;
        //             hd.date_order = hddto.date_order;
        //             hd.total = hddto.total;
        //             hd.status = 0;

        //             var HD = this.DonHangRepository.DonHang_Add(hd);
        //             return Created("success", HD);
        //         }
        //         catch(Exception e) {
        //             return StatusCode(StatusCodes.Status500InternalServerError);
        //         }
        //     }

        //     return StatusCode(StatusCodes.Status500InternalServerError);
        // }
    }
}