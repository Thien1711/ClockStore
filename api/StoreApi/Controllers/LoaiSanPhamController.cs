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
    public class LoaiSanPhamController : ControllerBase
    {
        private int pageSize = 9;
        private int range = 9;
        private readonly ILoaiSanPhamRepository LoaiSanPhamRepository;
        private readonly INhanVienRepository nhanVienRepository;
        private readonly JwtNhanVienService jwtNhanVien;
        private readonly IQuyenRepository quyenRepository;
        public LoaiSanPhamController(ILoaiSanPhamRepository LoaiSanPhamRepository, INhanVienRepository nhanVienRepository,
        JwtNhanVienService jwtNhanVien, IQuyenRepository quyenRepository)
        {
            this.LoaiSanPhamRepository = LoaiSanPhamRepository;
            this.nhanVienRepository = nhanVienRepository;
            this.jwtNhanVien = jwtNhanVien;
            this.quyenRepository = quyenRepository;
        }

        // Shop Page
        [HttpGet]
        public IEnumerable<LoaiSanPham> GetAll()
        {
            return this.LoaiSanPhamRepository.LoaiSanPham_GetAll();
        }

        // [HttpGet("{id}")]
        // public ActionResult<LoaiSanPham> GetById(int id) {
        //     return this.LoaiSanPhamRepository.LoaiSanPham_GetById(id);
        // }

        // Loại sản phẩm Page - Admin
        // Thêm Loại sản phẩm
        [HttpPost]
        public ActionResult<LoaiSanPham> AddLSP(LoaiSanPhamDto lspdto)
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

                    var quyen = quyenRepository.Quyen_CheckQuyenUser(nv.quyenId, "qlLoaiSanPham");

                    // Kiểm tra nhân viên có quyền thêm loại sản phẩm không
                    if (!quyen)
                    {
                        return BadRequest(new { message = "Tài khoản không có quyền thêm loại sản phẩm!" });
                    }

                    LoaiSanPham lsp = new LoaiSanPham();

                    // Mapping
                    // lsp.Id = lspdto.Id;
                    lsp.name = lspdto.name;
                    lsp.description = lspdto.description;

                    var LSP = this.LoaiSanPhamRepository.LoaiSanPham_Add(lsp);
                    return Created("success", LSP);
                }
                catch (Exception e)
                {
                    return BadRequest(e);
                }
            }

            return BadRequest();
        }

        // Loại sản phẩm Page - Admin
        // SỬa loại sản phẩm
        [HttpPut("{id}")]
        public ActionResult<LoaiSanPham> UpdateLSP([FromBody] LoaiSanPhamDto lspdto, int id)
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

                    var quyen = quyenRepository.Quyen_CheckQuyenUser(nv.quyenId, "qlLoaiSanPham");

                    // Kiểm tra nhân viên có quyền sửa loại sản phẩm không
                    if (!quyen)
                    {
                        return BadRequest(new { message = "Tài khoản không có quyền sửa loại sản phẩm!" });
                    }

                    var lsp = LoaiSanPhamRepository.LoaiSanPham_GetById(id);

                    if (lsp == null || lspdto.Id != id)
                    {
                        return NotFound();
                    }

                    // Mapping
                    lsp.Id = lspdto.Id;
                    lsp.name = lspdto.name;
                    lsp.description = lspdto.description;

                    var LSP = this.LoaiSanPhamRepository.LoaiSanPham_Update(lsp);
                    return Created("success", LSP);
                }
                catch (Exception e)
                {
                    return BadRequest(e);
                }
            }
            return BadRequest();
        }

        // Loại sản phẩm Page - Admin
        // XÓa loại sản phẩm
        [HttpDelete("{id}")]
        public ActionResult DeleteLSP(int id)
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

            var quyen = quyenRepository.Quyen_CheckQuyenUser(nv.quyenId, "qlLoaiSanPham");

            // Kiểm tra nhân viên có quyền xóa loại sản phẩm không
            if (!quyen)
            {
                return BadRequest(new { message = "Tài khoản không có quyền xóa loại sản phẩm!" });
            }

            var LSP = LoaiSanPhamRepository.LoaiSanPham_GetById(id);
            if (LSP == null)
            {
                return NotFound();
            }
            LoaiSanPhamRepository.LoaiSanPham_Delete(LSP);
            return Ok(new { messgae = "Ok" });
        }

        [HttpPost("filter-admin")]
        public ViewLoaiSanPhamAdminDto FilterAdmin(FilterDataAdminDto data)
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

            var quyen = quyenRepository.Quyen_CheckQuyenUser(nv.quyenId, "LoaiSanPham");

            // Kiểm tra nhân viên có quyền xem loại sản phẩm không
            if (!quyen)
            {
                return null;
            }

            int count;
            var LoaiSanPhams = LoaiSanPhamRepository.LoaiSanPham_FilterAdmin(data.search, data.sort, data.pageIndex, pageSize, out count);
            var ListLSP = new PaginatedList<LoaiSanPham>(LoaiSanPhams, count, data.pageIndex, pageSize);
            ViewLoaiSanPhamAdminDto view = new ViewLoaiSanPhamAdminDto()
            {
                ListLSP = ListLSP,
                sort = data.sort,
                search = data.search,
                pageIndex = data.pageIndex,
                pageSize = this.pageSize,
                count = count,
                range = this.range,
                totalPage = ListLSP.TotalPages
            };
            return view;
        }
    }
}