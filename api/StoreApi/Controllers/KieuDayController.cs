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
    public class KieuDayController : ControllerBase
    {
        private int pageSize = 9;
        private int range = 9;
        private readonly IKieuDayRepository KieuDayRepository;
        private readonly INhanVienRepository nhanVienRepository;
        private readonly JwtNhanVienService jwtNhanVien;
        private readonly IQuyenRepository quyenRepository;
        public KieuDayController(IKieuDayRepository KieuDayRepository, INhanVienRepository nhanVienRepository,
        JwtNhanVienService jwtNhanVien, IQuyenRepository quyenRepository)
        {
            this.KieuDayRepository = KieuDayRepository;
            this.nhanVienRepository = nhanVienRepository;
            this.jwtNhanVien = jwtNhanVien;
            this.quyenRepository = quyenRepository;
        }

        // Shop Page
        [HttpGet]
        public IEnumerable<KieuDay> GetAll()
        {
            return this.KieuDayRepository.KieuDay_GetAll();
        }

        // [HttpGet("{id}")]
        // public ActionResult<KieuDay> GetById(int id) {
        //     return this.KieuDayRepository.KieuDay_GetById(id);
        // }
        
        // Kiểu dây Page - Admin
        // Thêm kiểu dây
        [HttpPost]
        public ActionResult<KieuDay> AddKD(KieuDayDto kddto)
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

                    var quyen = quyenRepository.Quyen_CheckQuyenUser(nv.quyenId, "qlKieuDay");

                    // Kiểm tra nhân viên có quyền thêm kiểu dây không
                    if (!quyen)
                    {
                        return BadRequest(new { message = "Tài khoản không có quyền thêm kiểu dây!" });
                    }

                    KieuDay kd = new KieuDay();

                    // Mapping
                    // kd.Id = kddto.Id;
                    kd.name = kddto.name;

                    var KD = this.KieuDayRepository.KieuDay_Add(kd);
                    return Created("success", KD);
                }
                catch (Exception e)
                {
                    return BadRequest(e);
                }
            }

            return BadRequest();
        }

        // Kiểu dây Page - Admin
        // Sửa kiểu dây
        [HttpPut("{id}")]
        public ActionResult<KieuDay> UpdateKD([FromBody] KieuDayDto kddto, int id)
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

                    var quyen = quyenRepository.Quyen_CheckQuyenUser(nv.quyenId, "qlKieuDay");

                    // Kiểm tra nhân viên có quyền sửa kiểu dây không
                    if (!quyen)
                    {
                        return BadRequest(new { message = "Tài khoản không có quyền sửa kiểu dây!" });
                    }

                    var kd = KieuDayRepository.KieuDay_GetById(id);

                    if (kd == null || kddto.Id != id)
                    {
                        return NotFound();
                    }

                    // Mapping
                    kd.Id = kddto.Id;
                    kd.name = kddto.name;

                    var KD = this.KieuDayRepository.KieuDay_Update(kd);
                    return Created("success", KD);
                }
                catch (Exception e)
                {
                    return BadRequest(e);
                }
            }
            return BadRequest();
        }

        // Kiểu dây Page - Admin
        // Xóa kiểu dây
        [HttpDelete("{id}")]
        public ActionResult DeleteKD(int id)
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

            var quyen = quyenRepository.Quyen_CheckQuyenUser(nv.quyenId, "qlKieuDay");

            // Kiểm tra nhân viên có quyền xóa kiểu dây không
            if (!quyen)
            {
                return BadRequest(new { message = "Tài khoản không có quyền xóa kiểu dây!" });
            }

            var KD = KieuDayRepository.KieuDay_GetById(id);
            if (KD == null)
            {
                return NotFound();
            }
            KieuDayRepository.KieuDay_Delete(KD);
            return Ok(new { messgae = "Ok" });
        }

        // Kiểu dây Page - Admin
        // Load danh sách kiểu dây
        [HttpPost("filter-admin")]
        public ViewKieuDayAdminDto FilterAdmin(FilterDataAdminDto data)
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

            var quyen = quyenRepository.Quyen_CheckQuyenUser(nv.quyenId, "KieuDay");

            // Kiểm tra nhân viên có quyền xem kiểu dây không
            if (!quyen)
            {
                return null;
            }

            int count;
            var KieuDays = KieuDayRepository.KieuDay_FilterAdmin(data.search, data.sort, data.pageIndex, pageSize, out count);
            var ListKD = new PaginatedList<KieuDay>(KieuDays, count, data.pageIndex, pageSize);
            ViewKieuDayAdminDto view = new ViewKieuDayAdminDto()
            {
                ListKD = ListKD,
                sort = data.sort,
                search = data.search,
                pageIndex = data.pageIndex,
                pageSize = this.pageSize,
                count = count,
                range = this.range,
                totalPage = ListKD.TotalPages
            };
            return view;
        }
    }
}