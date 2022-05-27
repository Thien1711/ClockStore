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
    public class KieuMayController : ControllerBase
    {
        private int pageSize = 9;
        private int range = 9;
        private readonly IKieuMayRepository KieuMayRepository;
        private readonly INhanVienRepository nhanVienRepository;
        private readonly JwtNhanVienService jwtNhanVien;
        private readonly IQuyenRepository quyenRepository;
        public KieuMayController(IKieuMayRepository KieuMayRepository, INhanVienRepository nhanVienRepository,
        JwtNhanVienService jwtNhanVien, IQuyenRepository quyenRepository)
        {
            this.KieuMayRepository = KieuMayRepository;
            this.nhanVienRepository = nhanVienRepository;
            this.quyenRepository = quyenRepository;
            this.jwtNhanVien = jwtNhanVien;
        }

        // Shop Page
        [HttpGet]
        public IEnumerable<KieuMay> GetAll()
        {
            return this.KieuMayRepository.KieuMay_GetAll();
        }

        // [HttpGet("{id}")]
        // public ActionResult<KieuMay> GetById(int id) {
        //     return this.KieuMayRepository.KieuMay_GetById(id);
        // }

        // Kiểu Máy Page - Admin
        // Thêm kiểu máy
        [HttpPost]
        public ActionResult<KieuMay> AddKM(KieuMayDto kmdto)
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

                    var quyen = quyenRepository.Quyen_CheckQuyenUser(nv.quyenId, "qlKieuMay");

                    // Kiểm tra nhân viên có quyền thêm kiểu máy không
                    if (!quyen)
                    {
                        return BadRequest(new { message = "Tài khoản không có quyền thêm kiểu máy!" });
                    }

                    KieuMay km = new KieuMay();

                    // Mapping
                    //km.Id = kmdto.Id;
                    km.name = kmdto.name;
                    var KM = this.KieuMayRepository.KieuMay_Add(km);
                    return Created("success", KM);
                }
                catch (Exception e)
                {
                    return BadRequest(e);
                }
            }

            return BadRequest();
        }

        // Kiểu máy Page - Admin
        // Sửa kiểu máy
        [HttpPut("{id}")]
        public ActionResult<KieuMay> UpdateKM([FromBody] KieuMayDto kmdto, int id)
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

                    var quyen = quyenRepository.Quyen_CheckQuyenUser(nv.quyenId, "qlKieuMay");

                    // Kiểm tra nhân viên có quyền sửa kiểu máy không
                    if (!quyen)
                    {
                        return BadRequest(new { message = "Tài khoản không có quyền sửa kiểu máy!" });
                    }

                    var km = KieuMayRepository.KieuMay_GetById(id);

                    if (km == null || kmdto.Id != id)
                    {
                        return NotFound();
                    }

                    // Mapping
                    //km.Id = kmdto.Id;
                    km.name = kmdto.name;

                    var KM = this.KieuMayRepository.KieuMay_Update(km);
                    return Created("success", KM);
                }
                catch (Exception e)
                {
                    return BadRequest(e);
                }
            }
            return BadRequest();
        }

        // Kiểu máy Page - Admin
        // Xóa kiểu máy
        [HttpDelete("{id}")]
        public ActionResult DeleteKM(int id)
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

            var quyen = quyenRepository.Quyen_CheckQuyenUser(nv.quyenId, "qlKieuMay");

            // Kiểm tra nhân viên có quyền xóa kiểu máy không
            if (!quyen)
            {
                return BadRequest(new { message = "Tài khoản không có quyền xóa kiểu máy!" });
            }

            var km = KieuMayRepository.KieuMay_GetById(id);
            if (km == null)
            {
                return NotFound();
            }
            KieuMayRepository.KieuMay_Delete(km);
            return Ok(new { messgae = "Ok" });
        }

        // Kiểu máy Page - Admin
        // Load kiểu máy
        [HttpPost("filter-admin")]
        public ViewKieuMayAdminDto FilterAdmin(FilterDataAdminDto data)
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

            var quyen = quyenRepository.Quyen_CheckQuyenUser(nv.quyenId, "KieuMay");

            // Kiểm tra nhân viên có quyền xem kiểu máy không
            if (!quyen)
            {
                return null;
            }
            int count;
            var KieuMays = KieuMayRepository.KieuMay_FilterAdmin(data.search, data.sort, data.pageIndex, pageSize, out count);
            var ListKM = new PaginatedList<KieuMay>(KieuMays, count, data.pageIndex, pageSize);
            ViewKieuMayAdminDto view = new ViewKieuMayAdminDto()
            {
                ListKM = ListKM,
                search = data.search,
                sort = data.sort,
                pageIndex = data.pageIndex,
                pageSize = this.pageSize,
                count = count,
                range = this.range,
                totalPage = ListKM.TotalPages
            };
            return view;
        }
    }
}