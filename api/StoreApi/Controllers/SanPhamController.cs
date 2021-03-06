using System.IO;
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
using Microsoft.AspNetCore.Hosting;

namespace StoreApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SanPhamController : ControllerBase
    {
        private int pageSize = 9;
        private int range = 9;
        private readonly ISanPhamRepository sanPhamRepository;
        private readonly ILoaiSanPhamRepository loaiSanPhamRepository;
        private readonly IThuongHieuRepository thuongHieuRepository;
        private readonly IKieuMayRepository kieuMayRepository;
        private readonly IKieuDayRepository kieuDayRepository;
        private readonly IWebHostEnvironment hostEnvironment;
        private readonly INhanVienRepository nhanVienRepository;
        private readonly JwtNhanVienService jwtNhanVien;
        private readonly IQuyenRepository quyenRepository;
        public SanPhamController(ISanPhamRepository sanPhamRepository, ILoaiSanPhamRepository loaiSanPhamRepository,
        IThuongHieuRepository thuongHieuRepository, IKieuMayRepository kieuMayRepository, IKieuDayRepository kieuDayRepository,
        IWebHostEnvironment hostEnvironment, INhanVienRepository nhanVienRepository, JwtNhanVienService jwtNhanVien,
        IQuyenRepository quyenRepository)
        {
            this.sanPhamRepository = sanPhamRepository;
            this.loaiSanPhamRepository = loaiSanPhamRepository;
            this.thuongHieuRepository = thuongHieuRepository;
            this.kieuMayRepository = kieuMayRepository;
            this.kieuDayRepository = kieuDayRepository;
            this.hostEnvironment = hostEnvironment;
            this.nhanVienRepository = nhanVienRepository;
            this.jwtNhanVien = jwtNhanVien;
            this.quyenRepository = quyenRepository;
        }

        // [HttpGet]
        // public IEnumerable<SanPham> GetAll() {
        //     return this.sanPhamRepository.SanPham_GetAll();
        // }

        // [HttpGet("{id}")]
        // public ActionResult<SanPham> GetById(int id) {
        //     return this.sanPhamRepository.SanPham_GetById(id);
        // }

        // S???n ph???m Page - Admin
        [HttpPost]
        public ActionResult<SanPham> AddSP([FromForm] SanPhamAddDto spdto)
        {
            // Console.WriteLine(spdto.)
            if (ModelState.IsValid)
            {
                try
                {
                    // Ph???n x??c th???c t??i kho???n nh??n vi??n
                    var jwt = Request.Cookies["jwt-nhanvien"];
                    if (jwt == null)
                    {
                        return NotFound(new { message = "Nh??n vi??n ch??a ????ng nh???p t??i kho???n!" });
                    }
                    var token = jwtNhanVien.Verify(jwt);
                    var user = token.Issuer;
                    var nv = nhanVienRepository.NhanVien_GetByUser(user);

                    if (nv == null)
                    {
                        return NotFound(new { message = "Kh??ng t??m th???y t??i kho???n nh??n vi??n ??ang ????ng nh???p!" });
                    }

                    if (nv.status == 0)
                    {
                        return NotFound(new { message = "T??i kho???n nh??n vi??n ??ang ????ng nh???p ???? b??? kh??a!" });
                    }

                    var quyen = quyenRepository.Quyen_CheckQuyenUser(nv.quyenId, "qlSanPham");

                    // Ki???m tra nh??n vi??n c?? quy???n th??m s???n ph???m kh??ng
                    if (!quyen)
                    {
                        return BadRequest(new { message = "T??i kho???n kh??ng c?? quy???n th??m s???n ph???m!" });
                    }

                    SanPham sp = new SanPham();

                    // Mapping
                    sp.LSPId = spdto.LSPId;
                    sp.brandId = spdto.brandId;
                    sp.wireId = spdto.wireId;
                    sp.machineId = spdto.machineId;
                    sp.name = spdto.name;
                    sp.amount = 0;
                    sp.description = spdto.description;
                    sp.img = SaveImage(spdto.imgFile);
                    sp.status = 0;

                    if (spdto.price >= 0)
                    {
                        sp.price = spdto.price;
                    }
                    else
                    {
                        sp.price = 0;
                    }

                    var SP = this.sanPhamRepository.SanPham_Add(sp);
                    return Created("success", SP);
                }
                catch (Exception e)
                {
                    return BadRequest(e);
                }
            }

            return BadRequest();
        }

        // S???n ph???m Page - Admin
        [HttpPut("{id}")]
        public ActionResult<SanPham> UpdateSP([FromForm] SanPhamDto spdto, int id)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    // Ph???n x??c th???c t??i kho???n nh??n vi??n
                    var jwt = Request.Cookies["jwt-nhanvien"];
                    if (jwt == null)
                    {
                        return NotFound(new { message = "Nh??n vi??n ch??a ????ng nh???p t??i kho???n!" });
                    }
                    var token = jwtNhanVien.Verify(jwt);
                    var user = token.Issuer;
                    var nv = nhanVienRepository.NhanVien_GetByUser(user);

                    if (nv == null)
                    {
                        return NotFound(new { message = "Kh??ng t??m th???y t??i kho???n nh??n vi??n ??ang ????ng nh???p!" });
                    }

                    if (nv.status == 0)
                    {
                        return NotFound(new { message = "T??i kho???n nh??n vi??n ??ang ????ng nh???p ???? b??? kh??a!" });
                    }

                    var quyen = quyenRepository.Quyen_CheckQuyenUser(nv.quyenId, "qlSanPham");

                    // Ki???m tra nh??n vi??n c?? quy???n s???a s???n ph???m kh??ng
                    if (!quyen)
                    {
                        return BadRequest(new { message = "T??i kho???n kh??ng c?? quy???n s???a s???n ph???m!" });
                    }

                    var sp = sanPhamRepository.SanPham_GetById(id);

                    if (sp == null || spdto.Id != id)
                    {
                        return NotFound();
                    }

                    // Mapping
                    sp.LSPId = spdto.LSPId;
                    sp.brandId = spdto.brandId;
                    sp.wireId = spdto.wireId;
                    sp.machineId = spdto.machineId;
                    sp.name = spdto.name;
                    // sp.amount = spdto.amount;
                    sp.price = spdto.price;
                    sp.description = spdto.description;
                    // sp.img = spdto.img;
                    sp.status = spdto.status;

                    if (spdto.imgFile != null)
                    {
                        sp.img = SaveImage(spdto.imgFile);
                    }

                    var SP = this.sanPhamRepository.SanPham_Update(sp);
                    return Created("success", SP);
                }
                catch (Exception e)
                {
                    return BadRequest(e);
                }
            }
            return BadRequest();
        }

        // S???n ph???m Page - Admin
        [HttpDelete("{id}")]
        public ActionResult DeleteSP(int id)
        {
            // Ph???n x??c th???c t??i kho???n nh??n vi??n
            var jwt = Request.Cookies["jwt-nhanvien"];
            if (jwt == null)
            {
                return NotFound(new { message = "Nh??n vi??n ch??a ????ng nh???p t??i kho???n!" });
            }
            var token = jwtNhanVien.Verify(jwt);
            var user = token.Issuer;
            var nv = nhanVienRepository.NhanVien_GetByUser(user);

            if (nv == null)
            {
                return NotFound(new { message = "Kh??ng t??m th???y t??i kho???n nh??n vi??n ??ang ????ng nh???p!" });
            }

            if (nv.status == 0)
            {
                return NotFound(new { message = "T??i kho???n nh??n vi??n ??ang ????ng nh???p ???? b??? kh??a!" });
            }

            var quyen = quyenRepository.Quyen_CheckQuyenUser(nv.quyenId, "qlSanPham");

            // Ki???m tra nh??n vi??n c?? quy???n x??a s???n ph???m kh??ng
            if (!quyen)
            {
                return BadRequest(new { message = "T??i kho???n kh??ng c?? quy???n x??a s???n ph???m!" });
            }

            var SP = sanPhamRepository.SanPham_GetById(id);
            if (SP == null)
            {
                return NotFound();
            }
            sanPhamRepository.SanPham_Delete(SP);
            return Ok(new { messgae = "Ok" });
        }

        // S???n ph???m Page - Admin
        [HttpPost("filter-admin")]
        public ViewProductAdminDto FilterAdmin(FilterDataAdminDto data)
        {
            // Ph???n x??c th???c t??i kho???n nh??n vi??n
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

            var quyen = quyenRepository.Quyen_CheckQuyenUser(nv.quyenId, "SanPham");

            // Ki???m tra nh??n vi??n c?? quy???n xem lo???i s???n ph???m kh??ng
            if (!quyen)
            {
                return null;
            }
            
            int count;
            var SanPhams = sanPhamRepository.SanPham_FilterAdmin(data.search, data.sort, data.pageIndex, pageSize, out count);
            var ListSP = new PaginatedList<SanPham>(SanPhams, count, data.pageIndex, pageSize);
            ViewProductAdminDto view = new ViewProductAdminDto()
            {
                ListSP = ListSP,
                search = data.search,
                sort = data.sort,
                pageIndex = data.pageIndex,
                pageSize = this.pageSize,
                count = count,
                range = this.range,
                totalPage = ListSP.TotalPages
            };
            return view;
        }

        // Trang shop b??n h??ng
        [HttpPost("filter-shop")]
        public ViewProductsShopDto FilterShop(FilterProductsShopDto data)
        {

            int count;
            var SanPhams = sanPhamRepository.SanPham_FilterProductShop(data.lspId, data.branchId, data.machineId, data.wireId, data.priceFrom, data.priceTo, data.search, data.sort, data.pageIndex, pageSize, out count);
            var LSP = loaiSanPhamRepository.LoaiSanPham_GetById(data.lspId);
            var TH = thuongHieuRepository.ThuongHieu_GetById(data.branchId);
            var KM = kieuMayRepository.KieuMay_GetById(data.machineId);
            var KD = kieuDayRepository.KieuDay_GetById(data.wireId);
            var ListSP = new PaginatedList<SanPham>(SanPhams, count, data.pageIndex, pageSize);
            ViewProductsShopDto view = new ViewProductsShopDto()
            {
                ListSP = ListSP,
                LSP = LSP,
                TH = TH,
                KM = KM,
                KD = KD,
                priceFrom = data.priceFrom,
                priceTo = data.priceTo,
                search = data.search,
                sort = data.sort,
                pageIndex = data.pageIndex,
                pageSize = this.pageSize,
                count = count,
                range = this.range,
                totalPage = ListSP.TotalPages
            };
            return view;
        }


        // Trang ch??? page
        [HttpGet("home-page")]
        public List<ListSPHomePage> FilterHomePage()
        {
            int pageSize = 8;
            var LSP = loaiSanPhamRepository.LoaiSanPham_GetAll();
            var viewHomePage = new List<ListSPHomePage>();
            foreach (var item in LSP)
            {
                var newListHomePage = new ListSPHomePage();
                newListHomePage.LSP = item;
                newListHomePage.listSP = sanPhamRepository.SanPham_GetByLSPId(item.Id, pageSize);
                viewHomePage.Add(newListHomePage);
            }
            return viewHomePage;
        }

        // Trang chi ti???t s???n ph???m
        [HttpGet("product/{id}")]
        public ActionResult<ViewProductPageDto> GetProductDetail(int id)
        {
            int pageSize = 4;

            var sanpham = this.sanPhamRepository.SanPham_GetById(id);

            if(sanpham != null && sanpham.status != 0) {
                var LSP = loaiSanPhamRepository.LoaiSanPham_GetById(sanpham.LSPId);
                var TH = thuongHieuRepository.ThuongHieu_GetById(sanpham.brandId);
                var KM = kieuMayRepository.KieuMay_GetById(sanpham.machineId);
                var KD = kieuDayRepository.KieuDay_GetById(sanpham.wireId);

                var spLienQuan = sanPhamRepository.SanPham_GetByLSPId(sanpham.LSPId, pageSize);

                var view = new ViewProductPageDto();
                view.product = sanpham;
                view.ListRelationship = spLienQuan;

                return view;
            }

            return null;
        }

        // L??u ???nh khi th??m s???a s???n ph???m
        [NonAction]
        public string SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(hostEnvironment.ContentRootPath, "wwwroot/image/", imageName);
            using (var stream = new FileStream(imagePath, FileMode.Create))
            {
                imageFile.CopyTo(stream);
            }
            return "/image/" + imageName;
        }
    }
}