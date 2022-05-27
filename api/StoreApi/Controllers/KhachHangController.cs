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
    public class KhachHangController : ControllerBase
    {
        private int pageSize = 9;
        private int range = 9;
        private readonly IKhachHangRepository KhachHangRepository;
        // private readonly IDonHangRepository DonHangRepository;
        private readonly JwtKhachHangService jwtKhachHang;
        private readonly INhanVienRepository nhanVienRepository;
        private readonly JwtNhanVienService jwtNhanVien; 
        private readonly IQuyenRepository quyenRepository;
        public KhachHangController(IKhachHangRepository KhachHangRepository, JwtKhachHangService jwtKhachHang,
        INhanVienRepository nhanVienRepository, JwtNhanVienService jwtNhanVien, IQuyenRepository quyenRepository)
        {
            this.KhachHangRepository = KhachHangRepository;
            this.jwtKhachHang = jwtKhachHang;
            this.nhanVienRepository = nhanVienRepository;
            this.jwtNhanVien = jwtNhanVien;
            this.quyenRepository = quyenRepository;
        }

        // Bỏ do client ko gọi api này
        // [HttpGet]
        // public IEnumerable<KhachHang> GetAll()
        // {
        //     return this.KhachHangRepository.KhachHang_GetAll();
        // }

        // Bỏ do client ko gọi api này
        // [HttpGet("{user}")]
        // public ActionResult<KhachHang> GetByUser(String user)
        // {
        //     return this.KhachHangRepository.KhachHang_GetByUser(user);
        // }

        // Khách Hàng Page - Admin
        [HttpPut("changeStatus/{user}")]
        public ActionResult<KhachHang> ChangeStatus(string user)
        {
            var jwt = Request.Cookies["jwt-nhanvien"];

            if (jwt == null)
            {
                Console.WriteLine("Nhân viên null");
                return NotFound(new { message = "Nhân viên chưa đăng nhập tài khoản!" });
            }
            
            var token = jwtNhanVien.Verify(jwt);
            string userId = token.Issuer;

            var nv= nhanVienRepository.NhanVien_GetByUser(userId);

            if (nv== null)
            {
                
                return NotFound(new { messgae = "Không tìm thấy tài khoản nhân viên!" });
            }

            var checkQuyen = quyenRepository.Quyen_CheckQuyenUser(nv.quyenId, "qlKhachHang");
            // Kiểm tra nhân viên có quyền thay đổi trạng thái khách hàng không
            if(!checkQuyen) {
                return BadRequest(new { message = "Tài khoản không có quyền thay đổi trạng thái khách hàng!" });
            }

            var kh = KhachHangRepository.KhachHang_GetByUser(user);
            
            if (kh == null)
            {
                return NotFound(new { message = "Không tìm thấy tài khoản khách hàng!" });
            }

            if (kh.status == 1)
            {
                kh.status = 0;
            }
            else
            {
                kh.status = 1;
            }

            var res = KhachHangRepository.KhachHang_Update(kh);
            return Ok(res);
        }

        // Khách hàng Page
        // Thay đổi thông tin khách hàng
        [HttpPut("updateInfoKH")]
        public ActionResult<KhachHang> UpdateInfoKH([FromBody] KhachHangInfoDto khdto)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    // Phần xác thực tài khoản khách hàng để thực hiện thao tác sửa thông tin khách hàng
                    var jwt = Request.Cookies["jwt-khachhang"];
                    if (jwt == null)
                    {
                        return NotFound(new { messgae = "Khách hàng chưa đăng nhập tài khoản!" });
                    }
                    var token = jwtKhachHang.Verify(jwt);
                    var user = token.Issuer;
                    var kh = KhachHangRepository.KhachHang_GetByUser(user);

                    if (kh == null || khdto.user != user)
                    {
                        return NotFound(new { messgae = "Không tìm thấy tài khoản khách hàng!" });
                    }

                    if(kh.status == 0) {
                        return NotFound(new { messgae = "Tài khoản đã bị khóa!" });
                    }

                    // Mapping và sửa thông tin
                    // kh.user = khdto.user;
                    kh.name = khdto.name;
                    kh.phone = khdto.phone;
                    kh.mail = khdto.mail;
                    kh.address = khdto.address;
                    kh.gender = khdto.gender;
                    kh.dateborn = khdto.dateborn;

                    var KH = this.KhachHangRepository.KhachHang_Update(kh);
                    return Created("success", KH);
                }
                catch (Exception e)
                {
                    return BadRequest(e);
                }
            }
            return BadRequest();
        }

        // Khách hàng Page 
        // Thay đổi pass khách hàng
        [HttpPut("updatePasswordKH")]
        public ActionResult<KhachHang> UpdatePasswordKH([FromBody] KhachHangPasswordDto khdto)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    // Phần xác thực tài khoản khách hàng để thực hiện thao tác sửa thông tin khách hàng
                    var jwt = Request.Cookies["jwt-khachhang"];
                    if (jwt == null)
                    {
                        return NotFound(new { messgae = "Khách hàng chưa đăng nhập tài khoản!" });
                    }
                    var token = jwtKhachHang.Verify(jwt);
                    var user = token.Issuer;
                    var kh = KhachHangRepository.KhachHang_GetByUser(user);

                    if (kh == null || khdto.user != user)
                    {
                        return NotFound(new { messgae = "Không tìm thấy tài khoản khách hàng!" });
                    }

                    if(kh.status == 0) {
                        return NotFound(new { messgae = "Tài khoản đã bị khóa!" });
                    }

                    if (!BCrypt.Net.BCrypt.Verify(khdto.oldPassword, kh.password))
                    {
                        return BadRequest(new { message = "Mật khẩu không đúng!" });
                    }

                    // Mapping và sửa thông tin
                    // kh.user = khdto.user;
                    kh.password = BCrypt.Net.BCrypt.HashPassword(khdto.newPassword);

                    var KH = this.KhachHangRepository.KhachHang_Update(kh);
                    return Created("success", KH);
                }
                catch (Exception e)
                {
                    return BadRequest(e);
                }
            }
            return BadRequest();
        }

        // client ko gọi api này
        // [HttpDelete("{user}")]
        // public ActionResult DeleteKH(String user)
        // {
        //     var KH = KhachHangRepository.KhachHang_GetByUser(user);
        //     if (KH == null)
        //     {
        //         return NotFound();
        //     }
        //     KhachHangRepository.KhachHang_Delete(KH);
        //     return Ok(new { messgae = "Ok" });
        // }

        // ====================

        // Register Page
        [HttpPost]
        public ActionResult<KhachHang> AddKH(KhachHangDto khdto)
        {

            if (ModelState.IsValid)
            {
                try
                {
                    KhachHang kh = new KhachHang();

                    // Mapping
                    kh.user = khdto.user;
                    kh.password = BCrypt.Net.BCrypt.HashPassword(khdto.password);
                    kh.name = khdto.name;
                    kh.phone = khdto.phone;
                    kh.mail = khdto.mail;
                    kh.address = khdto.address;
                    kh.gender = khdto.gender;
                    kh.dateborn = khdto.dateborn;
                    kh.status = 1;

                    var KH = this.KhachHangRepository.KhachHang_Add(kh);
                    return Created("success", KH);
                }
                catch (Exception e)
                {
                    return BadRequest(e);
                }
            }

            return BadRequest();
        }

        // Login Page
        [HttpPost("login")]
        public ActionResult<KhachHang> Login(LoginShopDto khdto)
        {

            if (ModelState.IsValid)
            {
                try
                {
                    var kh = KhachHangRepository.KhachHang_GetByUser(khdto.user);

                    if (kh == null)
                    {
                        return NotFound(new { message = "Tài khoản không tồn tại!" });
                    }

                    if(kh.status == 0) {
                        return NotFound(new { message = "Tài khoản đã bị khóa!" });
                    }

                    if (!BCrypt.Net.BCrypt.Verify(khdto.password, kh.password))
                    {
                        return BadRequest(new { message = "Mật khẩu không đúng!" });
                    }

                    var jwt = jwtKhachHang.Generate(kh.user);
                    Response.Cookies.Append("jwt-khachhang", jwt, new CookieOptions
                    {
                        HttpOnly = true
                    });

                    return Ok(kh);
                }
                catch (Exception e)
                {
                    return BadRequest(e);
                }
            }

            return BadRequest();
        }

        // get user shop
        [HttpGet("usercurrent")]
        public ActionResult<KhachHang> UserCurrent()
        {
            try
            {
                var jwt = Request.Cookies["jwt-khachhang"];

                if(jwt == null) {
                    return Unauthorized();
                }

                var token = jwtKhachHang.Verify(jwt);

                var userId = token.Issuer;
                var user = KhachHangRepository.KhachHang_GetByUser(userId);
                if(user.status == 0) {
                    return Unauthorized();
                }
                // Console.WriteLine(user.name);
                return Ok(user);
            }
            catch (Exception e)
            {
                return Unauthorized(e);
            }
        }

        // Đăng xuất tài khoản khách hàng
        [HttpGet("logout")]
        public ActionResult Logout()
        {
            Response.Cookies.Delete("jwt-khachhang");

            return Ok();
        }

        // Khách hàng Page - Admin
        // Xem danh sách khách hàng 
        [HttpPost("filter-admin")]
        public ViewKhachHangAdminDto FilterAdmin(FilterDataAdminDto data)
        {
            var jwt = Request.Cookies["jwt-nhanvien"];

            if (jwt == null)
            {
                return null;
            }
            
            var token = jwtNhanVien.Verify(jwt);
            string userId = token.Issuer;

            var nv= nhanVienRepository.NhanVien_GetByUser(userId);

            if ( nv== null || nv.status == 0)
            {
                return null;
            }

            var checkQuyen = quyenRepository.Quyen_CheckQuyenUser(nv.quyenId, "KhachHang");
            // Kiểm tra nhân viên có quyền thay đổi trạng thái khách hàng không
            if(!checkQuyen) {
                return null;
            }

            int count;
            var KhachHangs = KhachHangRepository.KhachHang_FilterAdmin(data.search, data.sort, data.pageIndex, pageSize, out count);
            var ListKH = new PaginatedList<KhachHang>(KhachHangs, count, data.pageIndex, pageSize);
            ViewKhachHangAdminDto view = new ViewKhachHangAdminDto()
            {
                ListKH = ListKH,
                search = data.search,
                sort = data.sort,
                pageIndex = data.pageIndex,
                pageSize = this.pageSize,
                count = count,
                range = this.range,
                totalPage = ListKH.TotalPages
            };
            return view;
        }
    }
}