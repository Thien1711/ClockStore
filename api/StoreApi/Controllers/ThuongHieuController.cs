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
    public class ThuongHieuController : ControllerBase
    {
        private int pageSize = 9;
        private int range = 9;
        private readonly IThuongHieuRepository ThuongHieuRepository;
        private readonly INhanVienRepository nhanVienRepository;
        private readonly JwtNhanVienService jwtNhanVien;
        private readonly IQuyenRepository quyenRepository;
        public ThuongHieuController(IThuongHieuRepository ThuongHieuRepository, INhanVienRepository nhanVienRepository,
        JwtNhanVienService jwtNhanVien, IQuyenRepository quyenRepository)
        {
            this.ThuongHieuRepository = ThuongHieuRepository;
            this.nhanVienRepository = nhanVienRepository;
            this.jwtNhanVien = jwtNhanVien;
            this.quyenRepository = quyenRepository;
        }

        // Shop Page
        [HttpGet]
        public IEnumerable<ThuongHieu> GetAll()
        {
            return this.ThuongHieuRepository.ThuongHieu_GetAll();
        }

        // [HttpGet("{id}")]
        // public ActionResult<ThuongHieu> GetById(int id) {
        //     return this.ThuongHieuRepository.ThuongHieu_GetById(id);
        // }

        // Thuong HIeu Page - Admin
        [HttpPost]
        public ActionResult<ThuongHieu> AddTH(ThuongHieuDto thdto)
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

                    var quyen = quyenRepository.Quyen_CheckQuyenUser(nv.quyenId, "qlThuongHieu");

                    // Kiểm tra nhân viên có quyền thêm thương hiệu không
                    if (!quyen)
                    {
                        return BadRequest(new { message = "Tài khoản không có quyền thêm thương hiệu!" });
                    }

                    ThuongHieu th = new ThuongHieu();

                    // Mapping
                    //th.Id = thdto.Id;
                    th.name = thdto.name;
                    var TH = this.ThuongHieuRepository.ThuongHieu_Add(th);
                    return Created("success", TH);
                }
                catch (Exception e)
                {
                    return BadRequest(e);
                }
            }

            return BadRequest();
        }

        // Thương hiệu Page - Admin
        [HttpPut("{id}")]
        public ActionResult<ThuongHieu> UpdateTH([FromBody] ThuongHieuDto thdto, int id)
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

                    var quyen = quyenRepository.Quyen_CheckQuyenUser(nv.quyenId, "qlThuongHieu");

                    // Kiểm tra nhân viên có quyền sửa thương hiệu không
                    if (!quyen)
                    {
                        return BadRequest(new { message = "Tài khoản không có quyền sửa thương hiệu!" });
                    }

                    var th = ThuongHieuRepository.ThuongHieu_GetById(id);

                    if (th == null || thdto.Id != id)
                    {
                        return NotFound();
                    }

                    // Mapping
                    //th.Id = thdto.Id;
                    th.name = thdto.name;

                    var TH = this.ThuongHieuRepository.ThuongHieu_Update(th);
                    return Created("success", TH);
                }
                catch (Exception e)
                {
                    return BadRequest(e);
                }
            }
            return BadRequest();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteTH(int id)
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

            var quyen = quyenRepository.Quyen_CheckQuyenUser(nv.quyenId, "qlThuongHieu");

            // Kiểm tra nhân viên có quyền xóa thương hiệu không
            if (!quyen)
            {
                return BadRequest(new { message = "Tài khoản không có quyền xóa thương hiệu!" });
            }

            var th = ThuongHieuRepository.ThuongHieu_GetById(id);
            if (th == null)
            {
                return NotFound();
            }
            ThuongHieuRepository.ThuongHieu_Delete(th);
            return Ok(new { messgae = "Ok" });
        }

        [HttpPost("filter-admin")]
        public ViewThuongHieuAdminDto FilterAdmin(FilterDataAdminDto data)
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

            var quyen = quyenRepository.Quyen_CheckQuyenUser(nv.quyenId, "ThuongHieu");

            // Kiểm tra nhân viên có quyền xem thuong hieu không
            if (!quyen)
            {
                return null;
            }

            int count;
            var ThuongHieus = ThuongHieuRepository.ThuongHieu_FilterAdmin(data.search, data.sort, data.pageIndex, pageSize, out count);
            var ListTH = new PaginatedList<ThuongHieu>(ThuongHieus, count, data.pageIndex, pageSize);
            ViewThuongHieuAdminDto view = new ViewThuongHieuAdminDto()
            {
                ListTH = ListTH,
                search = data.search,
                sort = data.sort,
                pageIndex = data.pageIndex,
                pageSize = this.pageSize,
                count = count,
                range = this.range,
                totalPage = ListTH.TotalPages
            };
            return view;
        }
    }
}