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
    public class QuyenController : ControllerBase
    {
        private int pageSize = 9;
        private int range = 9;
        private readonly IQuyenRepository QuyenRepository;
        private readonly INhanVienRepository nhanVienRepository;
        private readonly JwtNhanVienService jwtNhanVien;
        public QuyenController(IQuyenRepository QuyenRepository, INhanVienRepository nhanVienRepository,
        JwtNhanVienService jwtNhanVien)
        {
            this.QuyenRepository = QuyenRepository;
            this.nhanVienRepository = nhanVienRepository;
            this.jwtNhanVien = jwtNhanVien;
        }

        // NhanVien Page Admin
        // Load cho phần thêm sửa nhân viên
        [HttpGet]
        public IEnumerable<Quyen> GetAll()
        {
            return this.QuyenRepository.Quyen_GetAll();
        }

        // [HttpGet("{id}")]
        // public ActionResult<Quyen> GetById(int id) {
        //     return this.QuyenRepository.Quyen_GetById(id);
        // }

        // Quyen Page Admin
        [HttpPost]
        public ActionResult<Quyen> AddQ(QuyenDto qdto)
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

                    var quyen = QuyenRepository.Quyen_CheckQuyenUser(nv.quyenId, "qlQuyen");

                    // Kiểm tra nhân viên có quyền thêm quyền không
                    if (!quyen)
                    {
                        return BadRequest(new { message = "Tài khoản không có quyền thêm quyền!" });
                    }

                    Quyen q = new Quyen();

                    // Mapping
                    //q.Id = qdto.Id;
                    q.name = qdto.name;
                    q.details = qdto.details;
                    var Q = this.QuyenRepository.Quyen_Add(q);
                    return Created("success", Q);
                }
                catch (Exception e)
                {
                    return BadRequest(e);
                }
            }

            return BadRequest();
        }

        // Quyen Page Admin
        [HttpPut("{id}")]
        public ActionResult<Quyen> UpdateQ([FromBody] QuyenDto qdto, int id)
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

                    var quyen = QuyenRepository.Quyen_CheckQuyenUser(nv.quyenId, "qlQuyen");

                    // Kiểm tra nhân viên có quyền sửa quyền không
                    if (!quyen)
                    {
                        return BadRequest(new { message = "Tài khoản không có quyền sửa quyền!" });
                    }

                    var q = QuyenRepository.Quyen_GetById(id);

                    if (q == null || qdto.Id != id)
                    {
                        return NotFound();
                    }

                    // Mapping
                    //q.Id = qdto.Id;

                    q.name = qdto.name;
                    q.details = qdto.details;

                    var Q = this.QuyenRepository.Quyen_Update(q);
                    return Created("success", Q);
                }
                catch (Exception e)
                {
                    return BadRequest(e);
                }
            }
            return BadRequest();
        }

        // QUyen Page Admin
        [HttpDelete("{id}")]
        public ActionResult DeleteQ(int id)
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

            var quyen = QuyenRepository.Quyen_CheckQuyenUser(nv.quyenId, "qlQuyen");

            // Kiểm tra nhân viên có quyền xóa quyền không
            if (!quyen)
            {
                return BadRequest(new { message = "Tài khoản không có quyền xóa quyền!" });
            }

            var SP = QuyenRepository.Quyen_GetById(id);
            if (SP == null)
            {
                return NotFound();
            }
            QuyenRepository.Quyen_Delete(SP);
            return Ok(new { messgae = "Ok" });
        }

        // Quyen Page Admin
        [HttpPost("filter-admin")]
        public ViewQuyenAdminDto FilterAdmin(FilterDataAdminDto data)
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

            var quyen = QuyenRepository.Quyen_CheckQuyenUser(nv.quyenId, "Quyen");

            // Kiểm tra nhân viên có quyền xem loại sản phẩm không
            if (!quyen)
            {
                return null;
            }

            int count;
            var Quyens = QuyenRepository.Quyen_FilterAdmin(data.search, data.sort, data.pageIndex, pageSize, out count);
            var ListQ = new PaginatedList<Quyen>(Quyens, count, data.pageIndex, pageSize);
            ViewQuyenAdminDto view = new ViewQuyenAdminDto()
            {
                ListQ = ListQ,
                search = data.search,
                sort = data.sort,
                pageIndex = data.pageIndex,
                pageSize = this.pageSize,
                count = count,
                range = this.range,
                totalPage = ListQ.TotalPages
            };
            return view;
        }
    }
}