using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
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
    public class CartController : ControllerBase
    {
        private readonly ISanPhamRepository sanPhamRepository;
        private readonly IKhachHangRepository KhachHangRepository;
        private readonly JwtKhachHangService jwtKhachHang;
        private readonly IDonHangRepository DonHangRepository;
        private readonly IChiTietDHRepository chiTietDHRepository;
        public CartController(ISanPhamRepository sanPhamRepository, IKhachHangRepository khachHangRepository,
        JwtKhachHangService jwtKhachHangService, IDonHangRepository DonHangRepository, IChiTietDHRepository chiTietDHRepository)
        {
            this.sanPhamRepository = sanPhamRepository;
            this.KhachHangRepository = khachHangRepository;
            this.jwtKhachHang = jwtKhachHangService;
            this.DonHangRepository = DonHangRepository;
            this.chiTietDHRepository = chiTietDHRepository;
        }

        // Load sản phẩm của đơn hàng cho Cart
        [HttpGet("{donhang}")]
        public ActionResult<ViewCartDto> LoadSPForCart(string donhang)
        {
            try
            {
                if (!Regex.IsMatch(donhang, @"^(\d{1,}-\d{1,}&){1,}$"))
                {
                    return null;
                };

                // load sản phẩm
                var sps = sanPhamRepository.SanPham_ListCart(donhang);
                long total = 0;
                int amount = 0;

                // tính tổng giá và tổng số lượng sản phẩm
                foreach (var item in sps)
                {
                    total += item.price * item.amount;
                    amount += item.amount;
                }

                var res = new ViewCartDto();
                res.ListSP = sps;
                res.total = total;
                res.amount = amount;

                return res;
            }
            catch (Exception)
            {
                return null;
            }
        }

        // Thực hiện thanh toán cho Cart
        [HttpPost("checkoutcart")]
        public ActionResult<DonHang> CheckoutCart(CartDto cart)
        {
            try
            {
                // Phần xác thực tài khoản khách hàng để thực hiện thao tác sửa thông tin khách hàng
                var jwt = Request.Cookies["jwt-khachhang"];
                if (jwt == null)
                {
                    return NotFound(new { message = "Khách hàng chưa đăng nhập tài khoản!" });
                }
                var token = jwtKhachHang.Verify(jwt);
                var user = token.Issuer;
                var kh = KhachHangRepository.KhachHang_GetByUser(user);

                if (kh == null)
                {
                    return NotFound(new { message = "Không tìm thấy tài khoản khách hàng!" });
                }

                if (kh.status == 0)
                {
                    return NotFound(new { message = "Tài khoản khách hàng đã bị khóa!" });
                }

                var list = cart.donhang.Trim('&');
                string[] arrlist = list.Split('&');
                string[] temp;
                int i = 0;
                long total = 0;

                List<int> listProduct_id = new List<int>(); // lưu Id sản phẩm
                List<int> listSoluong = new List<int>();    // lưu số lượng sản phẩm của giỏ hàng
                for (i = 0; i < arrlist.Length - 1; ++i)
                {
                    if (!string.IsNullOrEmpty(arrlist[i]))
                    {
                        temp = arrlist[i].Split('-');
                        if (!string.IsNullOrEmpty(temp[0]))
                        {
                            listProduct_id.Add(int.Parse(temp[0]));
                            listSoluong.Add(int.Parse(temp[1]));
                        }
                    }
                }

                if (!string.IsNullOrEmpty(arrlist[i]))
                {
                    temp = arrlist[i].Split('-');
                    if (!string.IsNullOrEmpty(temp[0]))
                    {
                        listProduct_id.Add(int.Parse(temp[0]));
                        listSoluong.Add(int.Parse(temp[1]));
                    }
                }

                // load danh sách sản phẩm xem thử sản phẩm nào đã hết hàng
                var sps = sanPhamRepository.SanPham_LoadByListIdSP(listProduct_id);

                foreach (var q in sps)
                {
                    // Kiểm tra kho còn sản phẩm ko
                    for (i = 0; i < listProduct_id.Count(); ++i)
                    {
                        if(q.Id == listProduct_id[i]) {
                            // Console.WriteLine(listProduct_id[i] + " " + listSoluong[i]);
                            if (q.amount < listSoluong[i])
                            {
                                // Console.WriteLine("Sản phẩm "+ q.name +" trong kho không đủ!");
                                return BadRequest(new {message = "Sản phẩm "+ q.name +" trong kho không đủ!"});
                            }
                            else
                            {
                                total += q.price * listSoluong[i];
                            }
                        }
                        
                    }
                }

                // Tạo hóa đơn và lưu hóa đơn
                DonHang hd = new DonHang();
                hd.KHuser = kh.user;
                hd.phone = kh.phone;
                hd.address = cart.address;
                hd.date_order = System.DateTime.Now;
                hd.total = total;
                hd.status = 1;

                hd = DonHangRepository.DonHang_Add(hd);
                List<ChiTietDH> listCTHD = new List<ChiTietDH>();

                // Tạo chi tiết và lưu chi tiết hóa đơn
                foreach (var item in sps)
                {
                    for(i = 0; i < listProduct_id.Count(); ++i) {
                        if(item.Id == listProduct_id[i]) {
                            ChiTietDH newChiTietDH = new ChiTietDH();
                            newChiTietDH.billId = hd.Id;
                            newChiTietDH.productId = item.Id;
                            newChiTietDH.name = item.name;
                            newChiTietDH.amount = listSoluong[i];
                            newChiTietDH.price = item.price;
                            newChiTietDH.img = item.img;
                            listCTHD.Add(newChiTietDH);
                            
                            // Update lại số lượng của sản phẩm sau khi thêm hóa đơn
                            item.amount = item.amount - listSoluong[i];
                        }
                    }
                }
                chiTietDHRepository.ChiTietDH_AddRange(listCTHD);

                // Update lại sản phẩm và lưu vào database
                sanPhamRepository.SanPham_UpdateRand((List<SanPham>)sps);
                return Ok(new { message = "Thêm đơn hàng thành công!" });
            }
            catch (Exception e)
            {
                return BadRequest(new {message = "Lỗi thêm đơn hàng!", error = e});
            }
        }
    }
}