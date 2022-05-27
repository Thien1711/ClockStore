using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StoreApi.DTOs;
using StoreApi.Interfaces;
using StoreApi.Models;
using StoreApi.Services;

namespace StoreApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NhapHangController : ControllerBase
    {
        private int pageSize = 9;
        private int range = 9;
        private readonly ISanPhamRepository sanPhamRepository;
        private readonly IKieuDayRepository kieuDayRepository;
        private readonly IKieuMayRepository kieuMayRepository;
        private readonly ILoaiSanPhamRepository loaiSanPhamRepository;
        private readonly IThuongHieuRepository thuongHieuRepository;
        private readonly JwtNhanVienService jwtNhanVienService;
        private readonly INhanVienRepository nhanVienRepository;
        private readonly IPhieuNhapRepository phieuNhapRepository;
        private readonly IChiTietPNRepository chiTietPNRepository;
        private readonly IQuyenRepository quyenRepository;
        public NhapHangController(ISanPhamRepository sanPhamRepository, IKieuDayRepository kieuDayRepository,
        IKieuMayRepository kieuMayRepository, ILoaiSanPhamRepository loaiSanPhamRepository, IThuongHieuRepository thuongHieuRepository,
        JwtNhanVienService jwtNhanVienService, INhanVienRepository nhanVienRepository, IPhieuNhapRepository phieuNhapRepository,
        IChiTietPNRepository chiTietPNRepository, IQuyenRepository quyenRepository)
        {
            this.sanPhamRepository = sanPhamRepository;
            this.kieuDayRepository = kieuDayRepository;
            this.kieuMayRepository = kieuMayRepository;
            this.loaiSanPhamRepository = loaiSanPhamRepository;
            this.thuongHieuRepository = thuongHieuRepository;
            this.jwtNhanVienService = jwtNhanVienService;
            this.nhanVienRepository = nhanVienRepository;
            this.phieuNhapRepository = phieuNhapRepository;
            this.chiTietPNRepository = chiTietPNRepository;
            this.quyenRepository = quyenRepository;
        }

        // [HttpGet]
        // public IEnumerable<SanPham> GetAll()
        // {
        //     var kds = kieuDayRepository.KieuDay_GetAll();
        //     var kms = kieuMayRepository.KieuMay_GetAll();
        //     var ths = thuongHieuRepository.ThuongHieu_GetAll();
        //     var lsps = loaiSanPhamRepository.LoaiSanPham_GetAll();
        //     return this.sanPhamRepository.SanPham_GetAll();
        // }



        [HttpPost("filter-admin")]
        public ViewLoadProductNhapHangAdminDto FilterAdmin(FilterLoadSanPhamNhapHangDto data)
        {
            // Phần xác thực tài khoản nhân viên
            var jwt = Request.Cookies["jwt-nhanvien"];
            if (jwt == null)
            {
                return null;
            }
            var token = jwtNhanVienService.Verify(jwt);
            var user = token.Issuer;
            var nv = nhanVienRepository.NhanVien_GetByUser(user);

            if (nv == null)
            {
                return null;
            }

            if (nv.status == 0)
            {
                return null;
            }

            var quyen = quyenRepository.Quyen_CheckQuyenUser(nv.quyenId, "NhapHang");

            // Kiểm tra nhân viên có quyền thêm loại sản phẩm không
            if (!quyen)
            {
                return null;
            }

            var kds = kieuDayRepository.KieuDay_GetAll();
            var kms = kieuMayRepository.KieuMay_GetAll();
            var ths = thuongHieuRepository.ThuongHieu_GetAll();
            var lsps = loaiSanPhamRepository.LoaiSanPham_GetAll();
            var sps = this.sanPhamRepository.SanPham_GetAll();
            var res = new List<SanPham>();

            data.search = data.search.ToLower();
            int id, count;

            if (!string.IsNullOrEmpty(data.search))
            {
                switch (data.typeSearch)
                {
                    case "id":
                        if (Int32.TryParse(data.search, out id))
                        {
                            foreach (var item in sps)
                            {
                                if (item.Id == id)
                                {
                                    res.Add(item);
                                }
                            }
                        }
                        break;
                    case "name":
                        foreach (var item in sps)
                        {
                            if (item.name.ToLower().Contains(data.search))
                            {
                                res.Add(item);
                            }
                        }
                        break;
                    case "lsp":
                        foreach (var item in sps)
                        {
                            if (item.LSP.name.ToLower().Contains(data.search))
                            {
                                res.Add(item);
                            }
                        }
                        break;
                    case "th":
                        foreach (var item in sps)
                        {
                            if (item.brand.name.ToLower().Contains(data.search))
                            {
                                res.Add(item);
                            }
                        }
                        break;
                    case "kd":
                        foreach (var item in sps)
                        {
                            if (item.wire.name.ToLower().Contains(data.search))
                            {
                                res.Add(item);
                            }
                        }
                        break;
                    case "km":
                        foreach (var item in sps)
                        {
                            if (item.machine.name.ToLower().Contains(data.search))
                            {
                                res.Add(item);
                            }
                        }
                        break;
                    default:
                        if (Int32.TryParse(data.search, out id))
                        {
                            foreach (var item in sps)
                            {
                                if (item.Id == id || item.name.ToLower().Contains(data.search) || item.LSP.name.ToLower().Contains(data.search) ||
                                item.brand.name.ToLower().Contains(data.search) || item.wire.name.ToLower().Contains(data.search) ||
                                item.machine.name.ToLower().Contains(data.search))
                                {
                                    res.Add(item);
                                }
                            }
                        }
                        else
                        {
                            foreach (var item in sps)
                            {
                                if (item.name.ToLower().Contains(data.search) || item.LSP.name.ToLower().Contains(data.search) ||
                                item.brand.name.ToLower().Contains(data.search) || item.wire.name.ToLower().Contains(data.search) ||
                                item.machine.name.ToLower().Contains(data.search))
                                {
                                    res.Add(item);
                                }
                            }
                        }

                        break;
                }
            }
            else
            {
                res = (List<SanPham>)sps;
            }

            count = res.Count();
            int TotalPages = (int)Math.Ceiling(count / (double)pageSize);

            if (data.pageIndex < 1)
            {
                data.pageIndex = 1;
            }

            res = res.Skip((data.pageIndex - 1) * pageSize)
                        .Take(pageSize).ToList();

            var ListSP = new PaginatedList<SanPham>(res, count, data.pageIndex, pageSize);
            ViewLoadProductNhapHangAdminDto view = new ViewLoadProductNhapHangAdminDto()
            {
                ListSP = ListSP,
                search = data.search,
                typeSearch = data.typeSearch,
                pageIndex = data.pageIndex,
                pageSize = this.pageSize,
                count = count,
                range = this.range,
                totalPage = ListSP.TotalPages
            };
            return view;
        }

        [HttpPost("create-bill-import")]
        public ActionResult LapPhieuNhap(NhapHangDto data)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var jwt = Request.Cookies["jwt-nhanvien"];

                    if (jwt == null)
                    {
                        return NotFound(new { messgae = "Nhân viên chưa đăng nhập tài khoản!" });
                    }

                    var token = jwtNhanVienService.Verify(jwt);
                    string userId = token.Issuer;

                    var user = nhanVienRepository.NhanVien_GetByUser(userId);

                    if (user == null)
                    {
                        return NotFound(new { messgae = "Không tìm thấy tài khoản nhân viên!" });
                    }

                    if (user.status == 0)
                    {
                        return NotFound(new { messgae = "Tài khoản đã bị khóa!" });
                    }

                    if (user.user != data.user)
                    {
                        return BadRequest(
                            new { message = "Tên tài khoản đăng nhập không khớp với tên tài khoản cần nhập hàng!" }
                        );
                    }
                    var quyen = quyenRepository.Quyen_CheckQuyenUser(user.quyenId, "qlNhapHang");

                    // Kiểm tra nhân viên có quyền thêm loại sản phẩm không
                    if (!quyen)
                    {
                        return null;
                    }

                    List<int> listProduct_id = new List<int>(); // lưu Id sản phẩm
                    List<int> listSoluong = new List<int>();    // lưu số lượng sản phẩm 
                    List<int> listPrice = new List<int>();    // lưu giá sản phẩm 
                    var list = data.listSP.Trim('&');
                    string[] arrlist = list.Split('&');
                    string[] temp;
                    int i = 0, id = 0, amount = 0, price = 0;
                    long total = 0;

                    for (i = 0; i < arrlist.Length - 1; ++i)
                    {
                        if (!string.IsNullOrEmpty(arrlist[i]))
                        {
                            temp = arrlist[i].Split('-');
                            if (!string.IsNullOrEmpty(temp[0]))
                            {
                                id = int.Parse(temp[0]);
                                amount = int.Parse(temp[1]);
                                price = int.Parse(temp[2]);

                                if (amount == 0 || price == 0)
                                {
                                    return BadRequest(new { message = "Giá và số lượng của sản phẩm phải khác 0!" });
                                }

                                listProduct_id.Add(id);
                                listSoluong.Add(amount);
                                listPrice.Add(price);

                                total += amount * price;
                            }
                        }
                    }
                    if (!string.IsNullOrEmpty(arrlist[i]))
                    {
                        temp = arrlist[i].Split('-');
                        if (!string.IsNullOrEmpty(temp[0]))
                        {
                            id = int.Parse(temp[0]);
                            amount = int.Parse(temp[1]);
                            price = int.Parse(temp[2]);

                            if (amount == 0 || price == 0)
                            {
                                return BadRequest(new { message = "Giá và số lượng của sản phẩm phải khác 0!" });
                            }

                            listProduct_id.Add(id);
                            listSoluong.Add(amount);
                            listPrice.Add(price);

                            total += amount * price;
                        }
                    }

                    // load danh sách sản phẩm xem thử sản phẩm nào đã hết hàng
                    var sps = sanPhamRepository.SanPham_LoadByListIdSP(listProduct_id);

                    PhieuNhap pn = new PhieuNhap();
                    pn.NVuser = user.user;
                    pn.phone = data.phone;
                    pn.nameNCC = data.nameNCC;
                    pn.mail = data.mail;
                    pn.address = data.address;
                    pn.date_receice = System.DateTime.Now;
                    pn.total = total;
                    // pn.status = 1;

                    pn = phieuNhapRepository.PhieuNhap_Add(pn);
                    List<ChiTietPN> listCTPN = new List<ChiTietPN>();
                    foreach (var item in sps)
                    {
                        for (i = 0; i < listProduct_id.Count(); ++i)
                        {
                            if (item.Id == listProduct_id[i])
                            {
                                ChiTietPN newChiTietPN = new ChiTietPN();
                                newChiTietPN.couponId = pn.Id;
                                newChiTietPN.productId = item.Id;
                                newChiTietPN.name = item.name;
                                newChiTietPN.amount = listSoluong[i];
                                newChiTietPN.price = listPrice[i];
                                newChiTietPN.img = item.img;
                                listCTPN.Add(newChiTietPN);

                                item.amount = item.amount + listSoluong[i];
                            }
                        }
                    }

                    chiTietPNRepository.ChiTietPN_AddRange(listCTPN);
                    sanPhamRepository.SanPham_UpdateRand((List<SanPham>)sps);
                    return Ok(new { message = "Nhập hàng thành công!" });
                }
                catch (Exception e)
                {
                    return BadRequest(new { message = "Lỗi nhập hàng!", error = e });
                }
            }
            return BadRequest(new { message = "Tham số truyền vào không chính xác!" });
        }
    }
}