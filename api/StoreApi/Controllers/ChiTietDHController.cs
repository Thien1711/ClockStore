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
    public class ChiTietDHController : ControllerBase
    {
        // private int pageSize = 9;
        // private int range = 9;
        private readonly IChiTietDHRepository ChiTietDHRepository;
        private readonly JwtKhachHangService jwtKhachHang;
        private readonly JwtNhanVienService jwtNhanVien;
        private readonly INhanVienRepository nhanVienRepository;
        private readonly IKhachHangRepository KhachHangRepository;
        private readonly IDonHangRepository DonHangRepository;
        public ChiTietDHController(IChiTietDHRepository ChiTietDHRepository, IKhachHangRepository KhachHangRepository,
        JwtKhachHangService jwtKhachHang, IDonHangRepository DonHangRepository, JwtNhanVienService jwtNhanVien,
        INhanVienRepository nhanVienRepository) {
            this.ChiTietDHRepository = ChiTietDHRepository;
            this.KhachHangRepository = KhachHangRepository;
            this.jwtKhachHang = jwtKhachHang;
            this.DonHangRepository = DonHangRepository;
            this.jwtNhanVien = jwtNhanVien;
            this.nhanVienRepository = nhanVienRepository;
        }

        // Client ko gọi api này nên bỏ
        // [HttpGet]
        // public IEnumerable<ChiTietDH> GetAll() {
            
        //     return this.ChiTietDHRepository.ChiTietDH_GetAll();
        // }

        // User Page
        // Xem chi tiết hóa đơn của khách hàng
        [HttpGet("{billId}")]
        public IEnumerable<ChiTietDH> GetByBillId(int billId) {
            // Phần xác thực tài khoản khách hàng để thực hiện thao tác sửa thông tin khách hàng
            var jwt = Request.Cookies["jwt-khachhang"];
            if(jwt == null) {
                return null;
            }
            var token = jwtKhachHang.Verify(jwt);
            var user = token.Issuer;
            var kh = KhachHangRepository.KhachHang_GetByUser(user);

            // Nếu không tìm thấy tài khoản khách hàng hoặc tài khoản bị khóa thì trả về null
            if (kh == null || kh.status == 0)
            {
                return null;
            }

            // Kiểm tra hóa đơn này phải của khách hàng đang đăng nhập ko
            var temp = DonHangRepository.DonHang_CheckUserKHAndId(billId, kh.user);
            if(!temp) {
                return null;
            }
            return this.ChiTietDHRepository.ChiTietDH_GetByBillId(billId);
        }

        // DonHang Page - Admin 
        // Nhân viên không bị khóa tài khoản có quyền xem chi tiết hóa đơn
        [HttpGet("admin/{billId}")]
        public IEnumerable<ChiTietDH> GetByBillIdAdmin(int billId) {
            // Phần xác thực tài khoản khách hàng 
            var jwt = Request.Cookies["jwt-nhanvien"];
            if(jwt == null) {
                return null;
            }
            var token = jwtNhanVien.Verify(jwt);
            var user = token.Issuer;
            var nv = nhanVienRepository.NhanVien_GetByUser(user);

            // Không tìm thấy nhân viên hoặc tài khoản nhân viên bị khóa thì trả về null
            if (nv == null || nv.status == 0) {
                return null;
            }
            
            return this.ChiTietDHRepository.ChiTietDH_GetByBillId(billId);
        }
    }
}