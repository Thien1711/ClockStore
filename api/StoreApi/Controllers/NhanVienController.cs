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
    public class NhanVienController : ControllerBase
    {
        private int pageSize = 9;
        private int range = 9;
        private readonly INhanVienRepository nhanVienRepository;
        private readonly IQuyenRepository quyenRepository;
        private readonly JwtNhanVienService jwtNhanVien;
        public NhanVienController(INhanVienRepository nhanVienRepository, JwtNhanVienService jwtNhanVien, IQuyenRepository quyenRepository)
        {
            this.nhanVienRepository = nhanVienRepository;
            this.jwtNhanVien = jwtNhanVien;
            this.quyenRepository = quyenRepository;
        }

        // [HttpGet]
        // public IEnumerable<NhanVien> GetAll()
        // {
        //     // try {
        //     //     var jwt = Request.Cookies["jwt-nhanvien"];
        //     //     var token = jwtNhanVien.Verify(jwt);
        //     //     string userId = token.Issuer;
        //     //     var user = nhanVienRepository.NhanVien_GetByUser(userId);

        //     //     // quyenRepository.getById(user.quyenId)

        //     //     if(user == null) {
        //     //         return null;
        //     //     }
        //     //     return nhanVienRepository.NhanVien_GetAll();
        //     // }
        //     // catch(Exception e) {
        //     //     return null;
        //     // }
        //     return nhanVienRepository.NhanVien_GetAll();
        // }

        // NhanVien Page - Admin
        // Thêm nhân viên
        [HttpPost]
        public ActionResult<NhanVien> AddNV(NhanVienDto nvdto)
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

                    if (nv == null)
                    {
                        return NotFound(new { message = "Không tìm thấy tài khoản nhân viên đang đăng nhập!" });
                    }

                    if (nv.status == 0)
                    {
                        return NotFound(new { message = "Tài khoản nhân viên đang đăng nhập đã bị khóa!" });
                    }

                    var quyen = quyenRepository.Quyen_CheckQuyenUser(nv.quyenId, "qlNhanVien");

                    // Kiểm tra nhân viên có quyền thêm nhân viên không
                    if (!quyen)
                    {
                        return BadRequest(new { message = "Tài khoản không có quyền thêm nhân viên!" });
                    }

                    NhanVien nvupdate = new NhanVien();

                    // Mapping
                    nvupdate.user = nvdto.user;
                    nvupdate.password = BCrypt.Net.BCrypt.HashPassword(nvdto.password);
                    nvupdate.name = nvdto.name;
                    nvupdate.phone = nvdto.phone;
                    nvupdate.quyenId = nvdto.quyenId;
                    nvupdate.address = nvdto.address;
                    nvupdate.gender = nvdto.gender;
                    nvupdate.dateborn = nvdto.dateborn;
                    nvupdate.status = 1;

                    var NV = this.nhanVienRepository.NhanVien_Add(nvupdate);
                    return Created("success", NV);
                }
                catch (Exception e)
                {
                    return BadRequest(e);
                }
            }

            return BadRequest();
        }

        // Nhân viên Page - Admin 
        // Sửa mật khẩu nhân viên
        [HttpPut("updatePasswordNV")]
        public ActionResult<NhanVien> UpdatePasswordNV([FromBody] NhanVienPasswordDto nvdto)
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

                    if (nv == null)
                    {
                        return NotFound(new { message = "Không tìm thấy tài khoản nhân viên đang đăng nhập!" });
                    }

                    if (nv.status == 0)
                    {
                        return NotFound(new { message = "Tài khoản nhân viên đang đăng nhập đã bị khóa!" });
                    }

                    var quyen = quyenRepository.Quyen_CheckQuyenUser(nv.quyenId, "qlNhanVien");

                    // Kiểm tra nhân viên có quyền sửa mật khẩu nhân viên không
                    if (!quyen)
                    {
                        return BadRequest(new { message = "Tài khoản không có quyền sửa mật khẩu nhân viên!" });
                    }

                    var nvupdate = nhanVienRepository.NhanVien_GetByUser(nvdto.user);
                    // Mapping và sửa thông tin
                    // nvupdate.user = nvdto.user;
                    nvupdate.password = BCrypt.Net.BCrypt.HashPassword(nvdto.password);

                    var NV = this.nhanVienRepository.NhanVien_Update(nvupdate);
                    return Created("success", NV);
                }
                catch (Exception e)
                {
                    return BadRequest(e);
                }
            }
            return BadRequest();
        }

        // Nhân viên Page -  Admin
        [HttpPut("updatePermissionNV")]
        public ActionResult<NhanVien> UpdatePermissionNV([FromBody] NhanVienPermissionDto nvdto)
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

                    if (nv == null)
                    {
                        return NotFound(new { message = "Không tìm thấy tài khoản nhân viên đang đăng nhập!" });
                    }

                    if (nv.status == 0)
                    {
                        return NotFound(new { message = "Tài khoản nhân viên đang đăng nhập đã bị khóa!" });
                    }

                    var quyen = quyenRepository.Quyen_CheckQuyenUser(nv.quyenId, "qlNhanVien");

                    // Kiểm tra nhân viên có quyền sửa quyền nhân viên không
                    if (!quyen)
                    {
                        return BadRequest(new { message = "Tài khoản không có quyền sửa quyền nhân viên!" });
                    }

                    var nvupdate = nhanVienRepository.NhanVien_GetByUser(nvdto.user);
                    // Mapping và sửa thông tin
                    // nvupdate.user = nvdto.user;
                    nvupdate.quyenId = nvdto.quyenId;

                    var NV = this.nhanVienRepository.NhanVien_Update(nvupdate);
                    return Created("success", NV);
                }
                catch (Exception e)
                {
                    return BadRequest(e);
                }
            }
            return BadRequest();
        }

        // Login Admin Page -  Admin
        [HttpPost("login")]
        public ActionResult LoginAdmin(LoginAdminDto dto)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var user = nhanVienRepository.NhanVien_GetByUser(dto.user);
                    if (user == null)
                    {
                        return BadRequest(new { message = "Tài khoản không tồn tại!" });
                    }

                    if (!BCrypt.Net.BCrypt.Verify(dto.password, user.password))
                    {
                        return BadRequest(new { message = "Mật khẩu không đúng!" });
                    }

                    if (user.status != 1)
                    {
                        return BadRequest(new { message = "Tài khoản đã bị khóa!" });
                    }

                    var jwt = jwtNhanVien.Generate(user.user);

                    Response.Cookies.Append("jwt-nhanvien", jwt, new CookieOptions
                    {
                        HttpOnly = true
                    });
                    user.quyen = quyenRepository.Quyen_GetById(user.quyenId);

                    return Ok(user);
                }
                catch (Exception e)
                {
                    return BadRequest(e);
                }
            }

            return BadRequest();
        }

        // Get Current User -  Admin
        [HttpGet("user")]
        public ActionResult UserAdmin()
        {
            try
            {
                var jwt = Request.Cookies["jwt-nhanvien"];

                if (jwt == null)
                {
                    return Unauthorized();
                }

                var token = jwtNhanVien.Verify(jwt);

                string userId = token.Issuer;
                var user = nhanVienRepository.NhanVien_GetByUser(userId);

                if (user.status != 1)
                {
                    return BadRequest(new { message = "Tài khoản đã bị khóa!" });
                }

                user.quyen = quyenRepository.Quyen_GetById(user.quyenId);

                return Ok(user);
            }
            catch (Exception e)
            {
                return Unauthorized(e);
            }
        }

        // Tài Khoản Page - Admin
        [HttpPut("updateInfoUserNV")]
        public ActionResult<NhanVien> UpdateInfoUserNV([FromBody] UserInfoAdminDto nvdto)
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

                    var token = jwtNhanVien.Verify(jwt);
                    string userId = token.Issuer;

                    var user = nhanVienRepository.NhanVien_GetByUser(userId);

                    if (user == null)
                    {
                        return NotFound(new { messgae = "Không tìm thấy tài khoản nhân viên!" });
                    }

                    if (user.status != 1)
                    {
                        return NotFound(new { messgae = "Tài khoản đã bị khóa!" });
                    }

                    var quyen = quyenRepository.Quyen_CheckQuyenUser(user.quyenId, "qlTaiKhoan");

                    // Kiểm tra nhân viên có quyền tự sửa thông tin không
                    if (!quyen)
                    {
                        return BadRequest(new { message = "Tài khoản không có quyền tự sửa thông tin!" });
                    }

                    if (user.user != nvdto.user)
                    {
                        return BadRequest(
                            new { message = "Tên tài khoản đăng nhập không khớp với tên tài khoản cần sửa!" }
                        );
                    }

                    // Mapping và sửa thông tin
                    // nv.user = nvdto.user;
                    user.name = nvdto.name;
                    user.phone = nvdto.phone;
                    user.address = nvdto.address;
                    user.gender = nvdto.gender;
                    user.dateborn = nvdto.dateborn;

                    var NV = this.nhanVienRepository.NhanVien_Update(user);
                    return Created("success", NV);
                }
                catch (Exception e)
                {
                    return BadRequest(e);
                }
            }
            return BadRequest();
        }

        // Tài khoản Page -  Admin
        [HttpPut("updatePasswordUserNV")]
        public ActionResult<KhachHang> UpdatePasswordUserNV([FromBody] UserPasswordDto nvdto)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    // Phần xác thực tài khoản khách hàng để thực hiện thao tác sửa thông tin khách hàng
                    var jwt = Request.Cookies["jwt-nhanvien"];
                    if (jwt == null)
                    {
                        return NotFound(new { messgae = "Nhân viên chưa đăng nhập tài khoản!" });
                    }

                    var token = jwtNhanVien.Verify(jwt);
                    var userId = token.Issuer;
                    var user = nhanVienRepository.NhanVien_GetByUser(userId);

                    if (user == null)
                    {
                        return NotFound(new { messgae = "Không tìm thấy tài khoản nhân viên!" });
                    }

                    if (user.status != 1)
                    {
                        return NotFound(new { messgae = "Tài khoản đã bị khóa!" });
                    }

                    var quyen = quyenRepository.Quyen_CheckQuyenUser(user.quyenId, "qlTaiKhoan");

                    // Kiểm tra nhân viên có quyền tự sửa thông tin không
                    if (!quyen)
                    {
                        return BadRequest(new { message = "Tài khoản không có quyền tự sửa thông tin!" });
                    }

                    if (user.user != nvdto.user)
                    {
                        return BadRequest(
                            new { message = "Tên tài khoản đăng nhập không khớp với tên tài khoản cần sửa!" }
                        );
                    }

                    if (!BCrypt.Net.BCrypt.Verify(nvdto.oldPassword, user.password))
                    {
                        return BadRequest(new { message = "Mật khẩu không đúng!" });
                    }

                    // Mapping và sửa thông tin
                    user.password = BCrypt.Net.BCrypt.HashPassword(nvdto.newPassword);

                    var NV = this.nhanVienRepository.NhanVien_Update(user);
                    return Created("success", NV);
                }
                catch (Exception e)
                {
                    return BadRequest(e);
                }
            }
            return BadRequest();
        }

        [HttpGet("logout")]
        public ActionResult LogoutAdmin()
        {
            Response.Cookies.Delete("jwt-nhanvien");
            return Ok(new
            {
                message = "Đăng xuất thành công!"
            });
        }

        // Nhân viên Page - Admin
        [HttpPut("changeStatus/{user}")]
        public ActionResult<NhanVien> ChangeStatus(string user)
        {
            // Phần xác thực tài khoản nhân viên
            var jwt = Request.Cookies["jwt-nhanvien"];
            if (jwt == null)
            {
                return NotFound(new { message = "Nhân viên chưa đăng nhập tài khoản!" });
            }
            var token = jwtNhanVien.Verify(jwt);
            var userId = token.Issuer;
            var nv = nhanVienRepository.NhanVien_GetByUser(userId);

            if (nv == null)
            {
                return NotFound(new { message = "Không tìm thấy tài khoản nhân viên đang đăng nhập!" });
            }

            if (nv.status == 0)
            {
                return NotFound(new { message = "Tài khoản nhân viên đang đăng nhập đã bị khóa!" });
            }

            var quyen = quyenRepository.Quyen_CheckQuyenUser(nv.quyenId, "qlNhanVien");

            // Kiểm tra nhân viên có quyền sửa quyền nhân viên không
            if (!quyen)
            {
                return BadRequest(new { message = "Tài khoản không có quyền sửa quyền nhân viên!" });
            }

            var nvupdate = nhanVienRepository.NhanVien_GetByUser(user);

            if (nvupdate == null)
            {
                return NotFound(new { message = "Không tìm thấy tài khoản nhân viên!" });
            }

            if (nvupdate.status == 1)
            {
                nvupdate.status = 0;
            }
            else
            {
                nvupdate.status = 1;
            }

            var res = nhanVienRepository.NhanVien_Update(nvupdate);
            return Ok(res);
        }

        // Staff Page Admin
        [HttpPost("filter-admin")]
        public ViewNhanVienAdminDto FilterAdmin(FilterDataAdminDto data)
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

            if (nv == null || nv.status == 0)
            {
                return null;
            }

            var quyen = quyenRepository.Quyen_CheckQuyenUser(nv.quyenId, "NhanVien");

            // Kiểm tra nhân viên có quyền xem kiểu dây không
            if (!quyen)
            {
                return null;
            }

            int count;
            var nhanViens = nhanVienRepository.NhanVien_FilterAdmin(data.search, data.sort, data.pageIndex, pageSize, out count);
            var ListNV = new PaginatedList<NhanVien>(nhanViens, count, data.pageIndex, pageSize);
            ViewNhanVienAdminDto view = new ViewNhanVienAdminDto()
            {
                ListNV = ListNV,
                search = data.search,
                sort = data.sort,
                pageIndex = data.pageIndex,
                pageSize = this.pageSize,
                count = count,
                range = this.range,
                totalPage = ListNV.TotalPages
            };
            return view;
        }
    }
}