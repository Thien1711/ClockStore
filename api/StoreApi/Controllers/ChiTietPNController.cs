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
    public class ChiTietPNController : ControllerBase
    {
        // private int pageSize = 9;
        // private int range = 9;
        private readonly IChiTietPNRepository ChiTietPNRepository;
        private readonly JwtNhanVienService jwtNhanVien;
        private readonly INhanVienRepository nhanVienRepository;
        public ChiTietPNController(IChiTietPNRepository ChiTietPNRepository, JwtNhanVienService jwtNhanVien,
        INhanVienRepository nhanVienRepository) {
            this.ChiTietPNRepository = ChiTietPNRepository;
            this.jwtNhanVien = jwtNhanVien;
            this.nhanVienRepository = nhanVienRepository;
        }

        // Client ko gọi api này nên bỏ
        // [HttpGet]
        // public IEnumerable<ChiTietPN> GetAll() {
        //     return this.ChiTietPNRepository.ChiTietPN_GetAll();
        // }

        // Phiếu Nhập Page - Admin
        // Nhân viên ko bị khóa tài khoản có quyền xem chi tiết phiếu nhập
        [HttpGet("{couponId}")]
        public IEnumerable<ChiTietPN> GetByCouponId(int couponId) {
            // Phần xác thực tài khoản nhân viên
            var jwt = Request.Cookies["jwt-nhanvien"];
            if(jwt == null) {
                return null;
            }
            var token = jwtNhanVien.Verify(jwt);
            var user = token.Issuer;
            var nv = nhanVienRepository.NhanVien_GetByUser(user);

            // Nếu không tìm thấy nhân viên hoặc tài khoản nhân viên bị xóa thì trả về null
            if (nv == null || nv.status != 1) {
                return null;
            }
            
            return this.ChiTietPNRepository.ChiTietPN_GetByCouponId(couponId);
        }

    }
}