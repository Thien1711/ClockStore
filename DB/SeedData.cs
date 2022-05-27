using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreApi.Models;

namespace StoreApi.Repositories
{
    public class SeedData
    {
        public static void Initialize(ClockStoreDBContext context)
        {
            context.Database.EnsureCreated();
            if(!context.KhachHangs.Any()){
                context.KhachHangs.AddRange(new List<KhachHang>{
                    new KhachHang{
                        user = "thien",
                        password = "$2a$11$XEBzrWRO7huzaPNtZzbo2u19kRZzXKeQ4VwH1hMLta2Tfoh1oUONy", //1234
                        name = "Nguyễn Ngọc Thiện",
                        phone = "0364117408",
                        mail = "tructruong.070202@gmail.com",
                        address = "Bình Định",
                        gender = "Nam",
                        dateborn = new System.DateTime(2000, 5, 8),
                        status = 1
                    },
                    new KhachHang{
                        user = "thinh",
                        password = "$2a$11$XEBzrWRO7huzaPNtZzbo2u19kRZzXKeQ4VwH1hMLta2Tfoh1oUONy", //1234
                        name = "Nguyễn Phước Thịnh",
                        phone = "0379783638",
                        mail = "phuocthinh22012000@gmail.com",
                        address = "Hồ Chí Minh",
                        gender = "Nam",
                        dateborn = new System.DateTime(2000, 1, 22),
                        status = 1
                    },
                    new KhachHang{
                        user = "thien405",
                        password = "$2a$11$XEBzrWRO7huzaPNtZzbo2u19kRZzXKeQ4VwH1hMLta2Tfoh1oUONy", //1234
                        name = "Cung Xương Hồng Thiên",
                        phone = "0379783638",
                        mail = "Thien123456789@gmail.com",
                        address = "Hồ Chí Minh",
                        gender = "Nam",
                        dateborn = new System.DateTime(2000, 1, 22),
                        status = 1
                    },
                    new KhachHang{
                        user = "hung",
                        password = "$2a$11$XEBzrWRO7huzaPNtZzbo2u19kRZzXKeQ4VwH1hMLta2Tfoh1oUONy", //1234
                        name = "Võ Minh Hưng",
                        phone = "0379783638",
                        mail = "hung@gmail.com",
                        address = "Hồ Chí Minh",
                        gender = "Nam",
                        dateborn = new System.DateTime(2000, 1, 22),
                        status = 1
                    }
                });
                context.SaveChanges();
            }
            
            if (!context.Quyens.Any())
            {
                context.Quyens.AddRange(new List<Quyen>{
                    new Quyen{
                        // Id = 1,
                        name = "Admin",
                        details = "qlNhapHang-qlNhanVien-qlSanPham-qlHoaDon-qlKhachHang-qlPhieuNhap-qlNCC-qlTaiKhoan-qlQuyen-qlThongKe-qlLoaiSanPham-qlThuongHieu"
                    },
                    new Quyen{
                        // Id = 2,
                        name = "Quản lý",
                        details = "qlNhanVien-xemSanPham-xemHoaDon-qlKhachHang-xemPhieuNhap-xemNCC-qlTaiKhoan-qlThongKe-qlLoaiSanPham-qlThuongHieu"
                    },
                    new Quyen{
                        // Id = 3,
                        name = "Nhân viên bán hàng",
                        details = "xemSanPham-qlHoaDon-xemKhachHang-qlThongKe-xemThuongHieu"
                    },
                    new Quyen{
                        // Id = 4,
                        name = "Nhân viên nhập hàng",
                        details = "qlNhapHang-qlSanPham-qlPhieuNhap-qlNCC-qlThongKe-qlLoaiSanPham-qlThuongHieu"
                    }
                });
                context.SaveChanges();
            }
            
            if (!context.NhanViens.Any())
            {
                context.NhanViens.AddRange(new List<NhanVien>{
                    new NhanVien{
                        user = "admin",
                        // password = "admin",
                        password = "$2a$11$83ifyxd7YmEfs99K.S2TdebBUs2ly3WFL.0u2QmXnS22A0d4JgnoC", //admin
                        name = "Nguyễn Ngọc Thiện",
                        phone = "0364117408",
                        address = "Bình Định",
                        gender = "Nam",
                        dateborn = DateTime.Parse("2000-5-8"),
                        quyenId = 1,
                        status = 1
                    },
                    new NhanVien{
                        user = "ql01",
                        // password = "admin",
                        password = "$2a$11$zfZowh2tRyQqr4Xi1Jwviex3WJLLrlpv4g8o8X9lRPKrUhmgQnWSy", //ql01
                        name = "Nguyễn Phước Thịnh",
                        phone = "0364117408",
                        address = "Hồ Chí Minh",
                        gender = "Nam",
                        dateborn = DateTime.Parse("2000-5-8"),
                        quyenId = 2,
                        status = 1
                    },
                    new NhanVien{
                        user = "bh01",
                        // password = "admin",
                        password = "$2a$11$eQgL4nlVRu2/O78Gun.Dh.aufNn2yKLfpwH5gpwa/pUMiUTKyQ.pi", // bh01
                        name = "Cung Xương Hồng Thiên",
                        phone = "0364117408",
                        address = "Hồ Chí Minh",
                        gender = "Nam",
                        dateborn = DateTime.Parse("2000-5-8"),
                        quyenId = 3,
                        status = 1
                    },
                    new NhanVien{
                        user = "nh01",
                        // password = "admin",
                        password = "$2a$11$lf4g3ae0K7DVW3vePtGYj.6OR4isfAAjzWx5/fh/7yyAa503toavm",  //nh01
                        name = "Võ Minh Hưng",
                        phone = "0364117408",
                        address = "Hồ Chí Minh",
                        gender = "Nam",
                        dateborn = DateTime.Parse("2000-5-8"),
                        quyenId = 4,
                        status = 1
                    }
                });
                context.SaveChanges();
            }

            if (!context.KieuDays.Any())
            {
                
                context.KieuDays.AddRange(new List<KieuDay>{
                    new KieuDay{
                        // Id = 1,
                        name = "Không có dây"
                    },
                    new KieuDay{
                        // Id = 2,
                        name = "Dây kim loại"
                    },
                    new KieuDay{
                        // Id = 3,
                        name = "Dây da"
                    }
                });
                context.SaveChanges();
            }

            if (!context.KieuMays.Any())
            {
                
                context.KieuMays.AddRange(new List<KieuMay>{
                    new KieuMay{
                        // Id = 1,
                        name = "Máy điện tử - Pin"
                    },
                    new KieuMay{
                        // Id = 2,
                        name = "Máy cơ"
                    }
                });
                context.SaveChanges();
            }

            if (!context.LoaiSanPhams.Any())
            {
                
                context.LoaiSanPhams.AddRange(new List<LoaiSanPham>{
                    new LoaiSanPham{
                        // Id = 1,
                        name = "ĐỒNG HỒ NAM",
                        description = "Đồng hồ dành cho nam"
                    },
                    new LoaiSanPham{
                        // Id = 2,
                        name = "ĐỒNG HỒ NỮ",
                        description = "Đồng hồ dành cho nữ"
                    },
                    new LoaiSanPham{
                        // Id =3,
                        name = "ĐỒNG HỒ ĐÔI",
                        description = "Đồng hồ dành cho cặp đôi"
                    },
                    new LoaiSanPham{
                        // Id = 4,
                        name = "ĐỒNG HỒ ĐỂ BÀN",
                        description = "Đồng hồ dành để bàn cho việc học và làm việc"
                    },
                    new LoaiSanPham{
                        // Id = 5,
                        name = "ĐỒNG HỒ TREO TƯỜNG",
                        description = "Đồng hồ dành cho việc trang trí nhà cửa"
                    },
                });
                context.SaveChanges();
            }

            if(!context.ThuongHieus.Any()){
                
                context.ThuongHieus.AddRange(new List<ThuongHieu>{
                    new ThuongHieu{
                        // Id = 1,
                        name = "ĐỒNG HỒ LOBINI"
                    },
                    new ThuongHieu{
                        // Id = 2,
                        name = "ĐỒNG HỒ KASSAW"
                    },
		            new ThuongHieu{
                        // Id = 3,
                        name = "ĐỒNG HỒ TEINTOP"
                    },	
		            new ThuongHieu{
                        // Id = 4,
                        name = "ĐỒNG HỒ HAZEAL"
                    },
		            new ThuongHieu{
                        // Id = 5,
                        name = "ĐỒNG HỒ NAMKIN"
                    },
		            new ThuongHieu{
                        // Id = 6,
                        name = "ĐỒNG HỒ PONIGER"
                    },
		            new ThuongHieu{
                        // Id = 7,
                        name = "ĐỒNG HỒ LORBERN"
                    },
		            new ThuongHieu{
                        // Id = 8,
                        name = "ĐỒNG HỒ MINI FOCUS"
                    },
                });
                context.SaveChanges();
            }

            if(!context.NCCs.Any()){
                
                context.NCCs.AddRange(new List<NCC>{
                    new NCC{
                        // Id = 1,
                        name = "Cty Hà Nội",
                        address = "Đống Đa, Hà Nội",
                        phone = "0364117408",
                        fax = "4598-8789-8789-7897"
                    },
                    new NCC{
                        // Id = 2,
                        name = "Cty Hồ Chí Minh",
                        address = "HCM",
                        phone = "0364117408",
                        fax = "4598-8789-8789-7897"
                    },
		            new NCC{
                        // Id = 3,
                        name = "Cty Đà Nẵng",
                        address = "Đà Nẵng",
                        phone = "0364117408",
                        fax = "4598-8789-8789-7897"
                    },	
		            new NCC{
                        // Id = 4,
                        name = "Cty Hội An",
                        address = "Hội An",
                        phone = "0364117408",
                        fax = "4598-8789-8789-7897"
                    },
		            new NCC{
                        // Id = 5,
                        name = "Cty Long An",
                        address = "Long An",
                        phone = "0364117408",
                        fax = "4598-8789-8789-7897"
                    },
		            new NCC{
                        // Id = 6,
                        name = "Cty Tiền Giang",
                        address = "Tiền Giang",
                        phone = "0364117408",
                        fax = "4598-8789-8789-7897"
                    },
		            new NCC{
                        // Id = 7,
                        name = "Cty Bến Tre",
                        address = "Bến Tre",
                        phone = "0364117408",
                        fax = "4598-8789-8789-7897"
                    },
		            new NCC{
                        // Id = 8,
                        name = "Cty Đà Lạt",
                        address = "Đà Lạt",
                        phone = "0364117408",
                        fax = "4598-8789-8789-7897"
                    },
                });
                context.SaveChanges();
            }

            if (!context.SanPhams.Any())
            {
                context.SanPhams.AddRange(new List<SanPham>{
                    new SanPham{
                        // Id = 1,
                        LSPId = 1,
                        brandId = 1,
                        wireId = 2,
                        machineId = 2,
                        nccId = 7,
                        name = "Đồng hồ nam chính hãng LOBINNI L17511-1",
                        amount = 30,
                        price = 5480000,
                        description = "ĐƠN GIẢN nhưng TINH TẾ: Thiết kế 3 kim 1 lịch cùng cọc số thanh mảnh nổi hẳn giữa màu mặt xanh thẳm cho thấy sự chỉn chu, sắc sảo trong từng đường nét. SẮC VÀNG HỒNG VƯƠNG GIẢ: Sự uy quyền, sang trọng được tạo nên bởi sắc vàng kim rực rỡ nhờ công nghệ mạ PVD tiên tiến nhất hiện nay.",
                        img = "/image/sp1.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 2,
                        LSPId = 1,
                        brandId = 1,
                        wireId = 3,
                        machineId = 1,
                        nccId = 8,
                        name = "Đồng hồ nam chính hãng LOBINNI L12032-1",
                        amount = 35,
                        price = 4550000,
                        description = "Lobinni cam kết chất lượng của sản phẩm luôn là tiêu chí hàng đầu. Mỗi sản phẩm được tạo ra đều xuất phát từ cảm xúc của nghệ nhân sáng tác. Với mỗi chiếc đồng hồ tạo ra chúng đánh dấu khoảng khắc quý giá của của các nghệ nhân và là một phần lịch sử thương hiệu trong chặng đường chinh phục trái tim người yêu đồng hồ.",
                        img = "/image/sp2.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 3,
                        LSPId = 1,
                        brandId = 1,
                        wireId = 3,
                        machineId = 1,
                        nccId = 8,
                        name = "Đồng hồ nam chính hãng LOBINNI L9010-1",
                        amount = 42,
                        price = 5280000,
                        description = "Tuyệt tác đồng hồ LOBINNI L9010 phô diễn những đường nét nghệ thuật đã giúp khơi gợi nên hình ảnh của một quý ông phong trần, lịch lãm. Dưới lớp kính Sapphire cao cấp, toàn bộ tinh hoa, giá trị của đồng hồ Thụy Sỹ toát ra mạnh mẽ.",
                        img = "/image/sp3.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 4,
                        LSPId = 1,
                        brandId = 1,
                        wireId = 3,
                        machineId = 1,
                        nccId = 8,
                        name = "Đồng hồ nam chính hãng LOBINNI L16050-2",
                        amount = 50,
                        price = 4800000,
                        description = "Lobinni luôn quan niệm chiếc đồng hồ là thứ ghi lại những khoảnh khắc quý giá nhất trong cuộc sống. Để có được những chiếc đồng hồ có chất lượng tốt nhất Lobinni luôn tuyển chọn những người thợ thủ công có tay nghề cao, ít nhất 10 năm kinh nghiệm trong ngành thiết kế và sản xuất đồng hồ.",
                        img = "/image/sp4.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 5,
                        LSPId = 1,
                        brandId = 1,
                        wireId = 3,
                        machineId = 1,
                        nccId = 1,
                        name = "Đồng hồ nam chính hãng LOBINNI L18016-1",
                        amount = 52,
                        price = 4850000,
                        description = "VẺ ĐẸP CỔ ĐIỂN: Kiểu số cọc nổi xen lẫn số học trò và vân Guilloche' đã tạo nên sức hút mạnh mẽ cho Lobinni. Nét đẹp mang phong cách cổ điển nhưng rất hợp với phong thái của các quý ông thời đại.",
                        img = "/image/sp5.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 6,
                        LSPId = 1,
                        brandId = 1,
                        wireId = 3,
                        machineId = 1,
                        nccId = 1,
                        name = "Đồng hồ nam chính hãng LOBINNI L9010-3",
                        amount = 36,
                        price = 5280000,
                        description = "Vàng hồng 18K: Là vàng nguyên khối, phủ trọn gần như là toàn bộ mặt số đồng hồ LOBINNI L9010. Trong khi đó, sự sang trọng lại được kết hợp với nền tảng Skeleton độc đáo, giúp các quý ông chìm đắm ở cả mặt trước lẫn mặt sau thiết kế.",
                        img = "/image/sp6.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 7,
                        LSPId = 1,
                        brandId = 1,
                        wireId = 3,
                        machineId = 1,
                        nccId = 2,
                        name = "Đồng hồ nam chính hãng LOBINNI L1810-1",
                        amount = 38,
                        price = 5350000,
                        description = "ĐỘ CHÍNH XÁC CAO - HOẠT ĐỘNG ỔN ĐỊNH - BỀN BỈ, HIỆN ĐẠI, sở hữu 21 chân kính bảo vệ khớp nối, tần số 21.600 giúp đồng hồ vận hành bền bỉ, mượt mà",
                        img = "/image/sp7.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 8,
                        LSPId = 1,
                        brandId = 1,
                        wireId = 3,
                        machineId = 1,
                        nccId = 2,
                        name = "Đồng hồ nam chính hãng LOBINNI L3603-4",
                        amount = 25,
                        price = 2680000,
                        description = "TÍNH NĂNG MOONPHASE: Ô cửa sổ với tính năng Moonphase (xem lịch tuần trăng – lịch âm) trên góc 6h có thể coi là điểm nhấn đắt giá của chiếc đồng hồ này. Mặt trăng tròn cùng các vì sao lấp lánh nổi bật trên nền trời đêm xanh thẳm chính là một thiết kế vô cùng bắt mắt.",
                        img = "/image/sp8.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 9,
                        LSPId = 1,
                        brandId = 1,
                        wireId = 3,
                        machineId = 1,
                        nccId = 2,
                        name = "Đồng hồ nam chính hãng LOBINNI L5018-1",
                        amount = 28,
                        price = 5530000,
                        description = "Thiết kế 3 kim được vót nhọn thanh mảnh vô cùng đơn giản, toàn bộ phần kim và phần số được mạ vàng nổi bật trên nền đen cổ điển huyền bí. Bộ máy bền bỉ in-house chính hãng Lobinni sản xuất – một trong những cỗ máy được đánh giá bền bỉ và chính xác bậc nhất.",
                        img = "/image/sp9.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 10,
                        LSPId = 1,
                        brandId = 1,
                        wireId = 3,
                        machineId = 1,
                        nccId = 2,
                        name = "Đồng hồ nam chính hãng LOBINNI L18012-2",
                        amount = 25,
                        price = 5880000,
                        description = "Là một trong hai màu sắc cơ bản đầy ấn tượng, màu đen đem đến một sự lôi cuốn đặc biệt đến từ phái mạnh. Nó làm tăng lên sự lịch lãm đầy sang trọng và sự bí ẩn cho các quý ông. Vừa là sự lựa chọn an toàn, vừa chuẩn mực đàn ông, những phụ kiện màu đen luôn là sự lựa chọn số một của mọi quý ông.",
                        img = "/image/sp10.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 11,
                        LSPId = 1,
                        brandId = 1,
                        wireId = 2,
                        machineId = 2,
                        nccId = 2,
                        name = "Đồng hồ nam chính hãng LOBINNI Ref.1023-7 (Phiên bản đặc biệt Limited)",
                        amount = 18,
                        price = 4450000,
                        description = "Tính năng SUN & MOON độc lạ với biểu tượng Nhật - Nguyệt tương phùng như ôm trọn cả vòng tuần hoàn ngày đêm trên cổ tay. Tính năng SUN & MOON độc lạ với biểu tượng Nhật - Nguyệt tương phùng như ôm trọn cả vòng tuần hoàn ngày đêm trên cổ tay. Trên nền mặt trắng với viền xung quanh vàng hồng sang trọng nổi bật, tinh xảo, đậm chất nghệ thuật tựa như những tia sáng mặt trời tỏa rạng, đẹp mê hồn.",
                        img = "/image/sp11.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 12,
                        LSPId = 1,
                        brandId = 1,
                        wireId = 2,
                        machineId = 2,
                        nccId = 2,
                        name = "Đồng hồ nam chính hãng LOBINNI Ref.1023-8 (Phiên bản đặc biệt Limited)",
                        amount = 18,
                        price = 4450000,
                        description = "Tính năng SUN & MOON độc lạ với biểu tượng Nhật - Nguyệt tương phùng như ôm trọn cả vòng tuần hoàn ngày đêm trên cổ tay. Tính năng SUN & MOON độc lạ với biểu tượng Nhật - Nguyệt tương phùng như ôm trọn cả vòng tuần hoàn ngày đêm trên cổ tay. Trên nền mặt trắng với viền xung quanh vàng hồng sang trọng nổi bật, tinh xảo, đậm chất nghệ thuật tựa như những tia sáng mặt trời tỏa rạng, đẹp mê hồn.",
                        img = "/image/sp12.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 13,
                        LSPId = 1,
                        brandId = 1,
                        wireId = 2,
                        machineId = 2,
                        nccId = 2,
                        name = "Đồng hồ nam chính hãng LOBINNI Ref.1023-9 (Phiên bản đặc biệt Limited)",
                        amount = 18,
                        price = 4450000,
                        description = "Tính năng SUN & MOON độc lạ với biểu tượng Nhật - Nguyệt tương phùng như ôm trọn cả vòng tuần hoàn ngày đêm trên cổ tay. Tính năng SUN & MOON độc lạ với biểu tượng Nhật - Nguyệt tương phùng như ôm trọn cả vòng tuần hoàn ngày đêm trên cổ tay. Trên nền mặt trắng với viền xung quanh vàng hồng sang trọng nổi bật, tinh xảo, đậm chất nghệ thuật tựa như những tia sáng mặt trời tỏa rạng, đẹp mê hồn.",
                        img = "/image/sp13.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 14,
                        LSPId = 1,
                        brandId = 1,
                        wireId = 2,
                        machineId = 2,
                        nccId = 2,
                        name = "Đồng hồ nam chính hãng LOBINNI L9010-6",
                        amount = 23,
                        price = 5380000,
                        description = "Máy Miyota 8215: Cỗ máy Miyota hoạt động vô cùng mạnh mẽ. Citizen nhà sản xuất bộ máy Miyota luôn mang đến cho đồng hồ LOBINNI máy cơ nói riêng, đồng hồ cơ trên toàn thế giới nói chung những giá trị tuyệt diệu về độ bền, độ chính xác, chức năng cũng như giá cả! Đáp ứng mọi tiêu chuẩn khắt khe của người dùng.",
                        img = "/image/sp14.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 15,
                        LSPId = 1,
                        brandId = 1,
                        wireId = 3,
                        machineId = 2,
                        nccId = 3,
                        name = "Đồng hồ nam chính hãng LOBINNI L12030-1",
                        amount = 33,
                        price = 4650000,
                        description = "Lobinni luôn quan niệm chiếc đồng hồ là thứ ghi lại những khoảnh khắc quý giá nhất trong cuộc sống. Để có được những chiếc đồng hồ có chất lượng tốt nhất Lobinni luôn tuyển chọn những người thợ thủ công có tay nghề cao, ít nhất 10 năm kinh nghiệm trong ngành thiết kế và sản xuất đồng hồ.",
                        img = "/image/sp15.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 16,
                        LSPId = 1,
                        brandId = 3,
                        wireId = 3,
                        machineId = 2,
                        nccId = 3,
                        name = "Đồng hồ nam chính hãng Teintop T7015-1",
                        amount = 48,
                        price = 1250000,
                        description = "KÍNH SAPPHIRE với độ chống xước hoàn hảo, độ cứng chỉ xếp sau kim cương. Đặc biệt, một số dòng sản phẩm sử dụng loại kính Sapphire cong cớn tạo chiều sâu cho mặt số. Với một mức giá tầm trung, đây có thể xem là ĐIỂM SÁNG đáng ghi nhận của cỗ máy thời gian này!",
                        img = "/image/sp16.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 17,
                        LSPId = 1,
                        brandId = 3,
                        wireId = 3,
                        machineId = 2,
                        nccId = 3,
                        name = "Đồng hồ nam chính hãng Teintop T7015-2",
                        amount = 50,
                        price = 1250000,
                        description = "BỘ MÁY ĐA DẠNG: Từ những cỗ máy QUARTZ chính xác đến từng giây đếm nhịp tới những cỗ máy CƠ ráp máy Miyota Nhật Bản bền bỉ. Điều đặc biệt, trong tầm giá trên 1 TRIỆU, bạn sẽ khó tìm được một cỗ máy đẳng cấp và chất lượng như TeinTop T7015-4.",
                        img = "/image/sp17.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 18,
                        LSPId = 1,
                        brandId = 3,
                        wireId = 3,
                        machineId = 2,
                        nccId = 3,
                        name = "Đồng hồ nam chính hãng Teintop T7015-3",
                        amount = 50,
                        price = 1250000,
                        description = "KÍNH SAPPHIRE với độ chống xước hoàn hảo, độ cứng chỉ xếp sau kim cương. Đặc biệt, một số dòng sản phẩm sử dụng loại kính Sapphire cong cớn tạo chiều sâu cho mặt số. Với một mức giá tầm trung, đây có thể xem là ĐIỂM SÁNG đáng ghi nhận của cỗ máy thời gian này!",
                        img = "/image/sp18.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 19,
                        LSPId = 1,
                        brandId = 3,
                        wireId = 3,
                        machineId = 1,
                        nccId = 3,
                        name = "Đồng hồ nam chính hãng Teintop T7016-10",
                        amount = 50,
                        price = 1550000,
                        description = "BỘ MÁY ĐA DẠNG: Từ những cỗ máy QUARTZ chính xác đến từng giây đếm nhịp tới những cỗ máy CƠ ráp máy Miyota Nhật Bản bền bỉ. Điều đặc biệt, trong tầm giá trên 1 TRIỆU, bạn sẽ khó tìm được một cỗ máy đẳng cấp và chất lượng như TeinTop",
                        img = "/image/sp19.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 20,
                        LSPId = 1,
                        brandId = 3,
                        wireId = 3,
                        machineId = 1,
                        nccId = 3,
                        name = "Đồng hồ nam chính hãng Teintop T7016-10",
                        amount = 46,
                        price = 1250000,
                        description = "BỘ MÁY ĐA DẠNG: Từ những cỗ máy QUARTZ chính xác đến từng giây đếm nhịp tới những cỗ máy CƠ ráp máy Miyota Nhật Bản bền bỉ. Điều đặc biệt, trong tầm giá trên 1 TRIỆU, bạn sẽ khó tìm được một cỗ máy đẳng cấp và chất lượng như TeinTop.",
                        img = "/image/sp20.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 21,
                        LSPId = 1,
                        brandId = 3,
                        wireId = 3,
                        machineId = 1,
                        nccId = 3,
                        name = "Đồng hồ nam chính hãng Teintop T7015-5",
                        amount = 42,
                        price = 1250000,
                        description = "Phải nói rằng: Trong tầm giá chỉ hơn 1 triệu đồng, hiếm có thương hiệu nào “CHỊU CHƠI” như TEINTOP khi đầu tư 100% kính SAPPHIRE - loại kính cao cấp nhất hiện nay cho các sản phẩm của mình.",
                        img = "/image/sp21.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 22,
                        LSPId = 1,
                        brandId = 3,
                        wireId = 3,
                        machineId = 1,
                        nccId = 3,
                        name = "Đồng hồ nam chính hãng Teintop T7015-6",
                        amount = 35,
                        price = 1250000,
                        description = "KÍNH SAPPHIRE với độ chống xước hoàn hảo, độ cứng chỉ xếp sau kim cương. Đặc biệt, một số dòng sản phẩm sử dụng loại kính Sapphire cong cớn tạo chiều sâu cho mặt số. Với một mức giá tầm trung, đây có thể xem là ĐIỂM SÁNG đáng ghi nhận của cỗ máy thời gian này!",
                        img = "/image/sp22.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 23,
                        LSPId = 1,
                        brandId = 3,
                        wireId = 3,
                        machineId = 1,
                        nccId = 4,
                        name = "Đồng hồ nam chính hãng Teintop T7016-2",
                        amount = 37,
                        price = 1550000,
                        description = "BỘ MÁY ĐA DẠNG: Từ những cỗ máy QUARTZ chính xác đến từng giây đếm nhịp tới những cỗ máy CƠ ráp máy Miyota Nhật Bản bền bỉ. Điều đặc biệt, trong tầm giá trên 1 TRIỆU, bạn sẽ khó tìm được một cỗ máy đẳng cấp và chất lượng như TeinTop.",
                        img = "/image/sp23.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 24,
                        LSPId = 1,
                        brandId = 3,
                        wireId = 3,
                        machineId = 1,
                        nccId = 4,
                        name = "Đồng hồ nam chính hãng Teintop T7016-1",
                        amount = 38,
                        price = 1550000,
                        description = "BỘ MÁY ĐA DẠNG: Từ những cỗ máy QUARTZ chính xác đến từng giây đếm nhịp tới những cỗ máy CƠ ráp máy Miyota Nhật Bản bền bỉ. Điều đặc biệt, trong tầm giá trên 1 TRIỆU, bạn sẽ khó tìm được một cỗ máy đẳng cấp và chất lượng như TeinTop.",
                        img = "/image/sp24.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 25,
                        LSPId = 1,
                        brandId = 3,
                        wireId = 3,
                        machineId = 1,
                        nccId = 4,
                        name = "Đồng hồ nam chính hãng Teintop T7016-3",
                        amount = 47,
                        price = 1550000,
                        description = "BỘ MÁY ĐA DẠNG: Từ những cỗ máy QUARTZ chính xác đến từng giây đếm nhịp tới những cỗ máy CƠ ráp máy Miyota Nhật Bản bền bỉ. Điều đặc biệt, trong tầm giá trên 1 TRIỆU, bạn sẽ khó tìm được một cỗ máy đẳng cấp và chất lượng như TeinTop.",
                        img = "/image/sp25.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 26,
                        LSPId = 1,
                        brandId = 3,
                        wireId = 3,
                        machineId = 1,
                        nccId = 4,
                        name = "Đồng hồ nam chính hãng Teintop T7016-4",
                        amount = 50,
                        price = 1550000,
                        description = "BỘ MÁY ĐA DẠNG: Từ những cỗ máy QUARTZ chính xác đến từng giây đếm nhịp tới những cỗ máy CƠ ráp máy Miyota Nhật Bản bền bỉ. Điều đặc biệt, trong tầm giá trên 1 TRIỆU, bạn sẽ khó tìm được một cỗ máy đẳng cấp và chất lượng như TeinTop.",
                        img = "/image/sp26.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 27,
                        LSPId = 1,
                        brandId = 3,
                        wireId = 2,
                        machineId = 1,
                        nccId = 6,
                        name = "Đồng hồ nam chính hãng Teintop T7016-5",
                        amount = 32,
                        price = 1550000,
                        description = "KÍNH SAPPHIRE với độ chống xước hoàn hảo, độ cứng chỉ xếp sau kim cương. Đặc biệt, một số dòng sản phẩm sử dụng loại kính Sapphire cong cớn tạo chiều sâu cho mặt số. Với một mức giá tầm trung, đây có thể xem là ĐIỂM SÁNG đáng ghi nhận của cỗ máy thời gian này!",
                        img = "/image/sp27.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 28,
                        LSPId = 1,
                        brandId = 3,
                        wireId = 2,
                        machineId = 1,
                        nccId = 6,
                        name = "Đồng hồ nam chính hãng Teintop T7016-6",
                        amount = 33,
                        price = 1550000,
                        description = "KÍNH SAPPHIRE với độ chống xước hoàn hảo, độ cứng chỉ xếp sau kim cương. Đặc biệt, một số dòng sản phẩm sử dụng loại kính Sapphire cong cớn tạo chiều sâu cho mặt số. Với một mức giá tầm trung, đây có thể xem là ĐIỂM SÁNG đáng ghi nhận của cỗ máy thời gian này!",
                        img = "/image/sp28.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 29,
                        LSPId = 1,
                        brandId = 3,
                        wireId = 2,
                        machineId = 1,
                        nccId = 6,
                        name = "Đồng hồ nam chính hãng Teintop T7016-7",
                        amount = 40,
                        price = 1550000,
                        description = "KÍNH SAPPHIRE với độ chống xước hoàn hảo, độ cứng chỉ xếp sau kim cương. Đặc biệt, một số dòng sản phẩm sử dụng loại kính Sapphire cong cớn tạo chiều sâu cho mặt số. Với một mức giá tầm trung, đây có thể xem là ĐIỂM SÁNG đáng ghi nhận của cỗ máy thời gian này!",
                        img = "/image/sp29.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 30,
                        LSPId = 1,
                        brandId = 3,
                        wireId = 2,
                        machineId = 1,
                        nccId = 6,
                        name = "Đồng hồ nam chính hãng Teintop T7016-8",
                        amount = 40,
                        price = 1550000,
                        description = "KÍNH SAPPHIRE với độ chống xước hoàn hảo, độ cứng chỉ xếp sau kim cương. Đặc biệt, một số dòng sản phẩm sử dụng loại kính Sapphire cong cớn tạo chiều sâu cho mặt số. Với một mức giá tầm trung, đây có thể xem là ĐIỂM SÁNG đáng ghi nhận của cỗ máy thời gian này!",
                        img = "/image/sp30.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 31,
                        LSPId = 1,
                        brandId = 3,
                        wireId = 2,
                        machineId = 1,
                        nccId = 6,
                        name = "Đồng hồ nam chính hãng Teintop T7016-9",
                        amount = 40,
                        price = 1550000,
                        description = "KÍNH SAPPHIRE với độ chống xước hoàn hảo, độ cứng chỉ xếp sau kim cương. Đặc biệt, một số dòng sản phẩm sử dụng loại kính Sapphire cong cớn tạo chiều sâu cho mặt số. Với một mức giá tầm trung, đây có thể xem là ĐIỂM SÁNG đáng ghi nhận của cỗ máy thời gian này!",
                        img = "/image/sp31.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 32,
                        LSPId = 1,
                        brandId = 3,
                        wireId = 2,
                        machineId = 1,
                        nccId = 7,
                        name = "Đồng hồ nam chính hãng Teintop T7017-1",
                        amount = 30,
                        price = 1860000,
                        description = "Sở dĩ tôi đánh giá rất cao cỗ máy này bởi: Trong tầm giá trên hơn1 triệu, bạn sẽ khó có thể tìm được một chiếc đồng hồ hội tụ nhiều ĐIỂM SÁNG như TEINTOP T7017-1: độ chống nước tới 30M, sử dụng kỹ nghệ đánh vân Guilloché tinh xảo và đặc biệt là ráp kính SAPPHIRE với độ chống xước gần như tuyệt đối.",
                        img = "/image/sp32.jpg",
                        status = 1
                    },

                    //
                    new SanPham{
                        // Id = 33,
                        LSPId = 1,
                        brandId = 2,
                        wireId = 2,
                        machineId = 2,
                        nccId = 8,
                        name = "Đồng hồ nam chính hãng KASSAW K867-1",
                        amount = 50,
                        price = 3950000,
                        description = "Một chiếc đồng hồ màu xanh luôn có sức hút đặc biệt đến lạ kỳ và việc sở hữu một chiếc đồng hồ mặt xanh tinh tế như thế, càng chứng tỏ bạn là người nhạy cảm, giàu cảm xúc.",
                        img = "/image/sp33.jpg"
                        },
                    new SanPham{
                        // Id = 34,
                        LSPId = 1,
                        brandId = 2,
                        wireId = 2,
                        machineId = 2,
                        nccId = 8,
                        name = "Đồng hồ nam chính hãng KASSAW K867-2",
                        amount = 47,
                        price = 3950000,
                        description = "Hơn thế nữa, còn khẳng định trong cuộc sống, bạn là người hướng nội, hay che giấu cảm xúc, có thể ngồi hàng giờ để nghe những tâm sự, bộc bạch.",
                        img = "/image/sp34.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 35,
                        LSPId = 2,
                        brandId = 2,
                        wireId = 2,
                        machineId = 2,
                        nccId = 8,
                        name = "Đồng hồ nữ chính hãng KASSAW K820-1",
                        amount = 48,
                        price = 4350000,
                        description = "KÍNH SAPPHIRE với độ chống xước hoàn hảo, độ cứng chỉ xếp sau kim cương. Đặc biệt, một số dòng sản phẩm sử dụng loại kính Sapphire cong cớn tạo chiều sâu cho mặt số. Với một mức giá tầm trung, đây có thể xem là ĐIỂM SÁNG đáng ghi nhận của cỗ máy thời gian này!",
                        img = "/image/sp35.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 36,
                        LSPId = 2,
                        brandId = 2,
                        wireId = 2,
                        machineId = 2,
                        nccId = 8,
                        name = "Đồng hồ nữ chính hãng KASSAW K820-2",
                        amount = 48,
                        price = 4350000,
                        description = "KÍNH SAPPHIRE với độ chống xước hoàn hảo, độ cứng chỉ xếp sau kim cương. Đặc biệt, một số dòng sản phẩm sử dụng loại kính Sapphire cong cớn tạo chiều sâu cho mặt số. Với một mức giá tầm trung, đây có thể xem là ĐIỂM SÁNG đáng ghi nhận của cỗ máy thời gian này!",
                        img = "/image/sp36.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 37,
                        LSPId = 2,
                        brandId = 2,
                        wireId = 2,
                        machineId = 2,
                        nccId = 7,
                        name = "Đồng hồ nữ chính hãng KASSAW K820-3",
                        amount = 45,
                        price = 4350000,
                        description = "KÍNH SAPPHIRE với độ chống xước hoàn hảo, độ cứng chỉ xếp sau kim cương. Đặc biệt, một số dòng sản phẩm sử dụng loại kính Sapphire cong cớn tạo chiều sâu cho mặt số. Với một mức giá tầm trung, đây có thể xem là ĐIỂM SÁNG đáng ghi nhận của cỗ máy thời gian này!",
                        img = "/image/sp37.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 38,
                        LSPId = 2,
                        brandId = 2,
                        wireId = 3,
                        machineId = 2,
                        nccId = 7,
                        name = "Đồng hồ nữ chính hãng KASSAW K820-4",
                        amount = 32,
                        price = 4350000,
                        description = "KÍNH SAPPHIRE với độ chống xước hoàn hảo, độ cứng chỉ xếp sau kim cương. Đặc biệt, một số dòng sản phẩm sử dụng loại kính Sapphire cong cớn tạo chiều sâu cho mặt số. Với một mức giá tầm trung, đây có thể xem là ĐIỂM SÁNG đáng ghi nhận của cỗ máy thời gian này!",
                        img = "/image/sp38.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 39,
                        LSPId = 2,
                        brandId = 3,
                        wireId = 2,
                        machineId = 2,
                        nccId = 7,
                        name = "Đồng hồ nữ chính hãng Teintop T8685-2",
                        amount = 31,
                        price = 2750000,
                        description = "Nhiệm vụ của Teintop không chỉ giới hạn trong việc quan tâm đến thế giới đồng hồ dành cho những người sành sỏi đồng hồ chất lượng và nổi bật mà còn là để giúp cho những người có đam mê với đồng hồ lựa chọn và đánh giá những sản phẩm chất lượng cao, những người mong muốn sở hữu những mẫu đồng hồ cổ điển sang trọng với giá cả hợp lý.",
                        img = "/image/sp39.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 40,
                        LSPId = 2,
                        brandId = 3,
                        wireId = 2,
                        machineId = 2,
                        nccId = 7,
                        name = "Đồng hồ nữ chính hãng Teintop T8685-1",
                        amount = 18,
                        price = 2750000,
                        description = "Nhiệm vụ của Teintop không chỉ giới hạn trong việc quan tâm đến thế giới đồng hồ dành cho những người sành sỏi đồng hồ chất lượng và nổi bật mà còn là để giúp cho những người có đam mê với đồng hồ lựa chọn và đánh giá những sản phẩm chất lượng cao, những người mong muốn sở hữu những mẫu đồng hồ cổ điển sang trọng với giá cả hợp lý.",
                        img = "/image/sp40.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 41,
                        LSPId = 2,
                        brandId = 3,
                        wireId = 2,
                        machineId = 2,
                        nccId = 7,
                        name = "Đồng hồ nữ chính hãng Teintop T8629-7",
                        amount = 22,
                        price = 2600000,
                        description = "Nhiệm vụ của Teintop không chỉ giới hạn trong việc quan tâm đến thế giới đồng hồ dành cho những người sành sỏi đồng hồ chất lượng và nổi bật mà còn là để giúp cho những người có đam mê với đồng hồ lựa chọn và đánh giá những sản phẩm chất lượng cao, những người mong muốn sở hữu những mẫu đồng hồ cổ điển sang trọng với giá cả hợp lý.",
                        img = "/image/sp41.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 42,
                        LSPId = 2,
                        brandId = 2,
                        wireId = 2,
                        machineId = 1,
                        nccId = 7,
                        name = "Đồng hồ nữ chính hãng KASSAW K991-1",
                        amount = 25,
                        price = 4550000,
                        description = "Thành Hưng Watch - Tự hào là đơn vị phân phối độc quyền thương hiệu đồng hồ KASSAW tại Việt Nam.",
                        img = "/image/sp42.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 43,
                        LSPId = 2,
                        brandId = 2,
                        wireId = 3,
                        machineId = 1,
                        nccId = 7,
                        name = "Đồng hồ nữ chính hãng KASSAW K992-2",
                        amount = 22,
                        price = 5350000,
                        description = "Thành Hưng Watch - Tự hào là đơn vị phân phối độc quyền thương hiệu đồng hồ KASSAW tại Việt Nam.",
                        img = "/image/sp43.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 44,
                        LSPId = 2,
                        brandId = 2,
                        wireId = 3,
                        machineId = 1,
                        nccId = 7,
                        name = "Đồng hồ nữ chính hãng KASSAW K992-1",
                        amount = 58,
                        price = 5350000,
                        description = "Thành Hưng Watch - Tự hào là nhà phân phối độc quyền thương hiệu đồng hồ KASSAW tại Việt Nam.",
                        img = "/image/sp44.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 45,
                        LSPId = 2,
                        brandId = 2,
                        wireId = 2,
                        machineId = 1,
                        nccId = 7,
                        name = "Đồng hồ nữ chính hãng KASSAW K912-1",
                        amount = 17,
                        price = 3550000,
                        description = "Thành Hưng Watch - Tự hào là nhà phân phối độc quyền thương hiệu đồng hồ KASSAW tại Việt Nam.",
                        img = "/image/sp45.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 46,
                        LSPId = 2,
                        brandId = 2,
                        wireId = 2,
                        machineId = 1,
                        nccId = 7,
                        name = "Đồng hồ nữ chính hãng KASSAW K912-2",
                        amount = 23,
                        price = 3750000,
                        description = "Thành Hưng Watch - Tự hào là nhà phân phối độc quyền thương hiệu đồng hồ KASSAW tại Việt Nam.",
                        img = "/image/sp46.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 47,
                        LSPId = 2,
                        brandId = 2,
                        wireId = 3,
                        machineId = 2,
                        nccId = 7,
                        name = "Đồng hồ nữ chính hãng KASSAW K912-3",
                        amount = 23,
                        price = 3550000,
                        description = "Thành Hưng Watch - Tự hào là nhà phân phối độc quyền thương hiệu đồng hồ KASSAW tại Việt Nam.",
                        img = "/image/sp47.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 48,
                        LSPId = 2,
                        brandId = 2,
                        wireId = 2,
                        machineId = 2,
                        nccId = 7,
                        name = "Đồng hồ nữ chính hãng KASSAW K912-4",
                        amount = 9,
                        price = 3750000,
                        description = "Thành Hưng Watch - Tự hào là nhà phân phối độc quyền thương hiệu đồng hồ KASSAW tại Việt Nam.",
                        img = "/image/sp48.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 49,
                        LSPId = 2,
                        brandId = 3,
                        wireId = 2,
                        machineId = 2,
                        nccId = 7,
                        name = "Đồng hồ nữ chính hãng Teintop T8686-1",
                        amount = 25,
                        price = 2750000,
                        description = "Đặc trưng đáng quan tâm nhất của thương hiệu Đồng hồ Teintop là sự kết hợp hài hòa giữa những giá trị cốt lõi của truyền thống và các mẫu mã tiên tiến. Điều này đã làm nên giá trị của Đồng hồ Teintop so với các dòng đồng hồ khác trên thị trường.",
                        img = "/image/sp49.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 50,
                        LSPId = 2,
                        brandId = 3,
                        wireId = 2,
                        machineId = 2,
                        nccId = 7,
                        name = "Đồng hồ nữ chính hãng Teintop T8686-2",
                        amount = 38,
                        price = 2700000,
                        description = "Đặc trưng đáng quan tâm nhất của thương hiệu Đồng hồ Teintop là sự kết hợp hài hòa giữa những giá trị cốt lõi của truyền thống và các mẫu mã tiên tiến. Điều này đã làm nên giá trị của Đồng hồ Teintop so với các dòng đồng hồ khác trên thị trường.",
                        img = "/image/sp50.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 51,
                        LSPId = 2,
                        brandId = 3,
                        wireId = 2,
                        machineId = 1,
                        nccId = 7,
                        name = "Đồng hồ nữ chính hãng Teintop T8686-3",
                        amount = 18,
                        price = 2600000,
                        description = "Là sản phẩm của đất nước USA, nơi cội nguồn của nền công nghiệp thế giới nên tất cả các dòng sản phẩm Đồng hồ Teintop đều được trải qua quy trình kiểm định nghiêm ngặt nên chất lượng được đảm bảo tốt nhất. Đồng hồ Teintop chính hãng với chất lượng tốt và giá rẻ khi bước chân vào thị trường Việt Nam đã trở thành một hiện tượng mà rất nhiều người dùng biết đến. Nó đáp ứng được nhu cầu ngon - bổ - rẻ của người dùng tại Việt Nam vì thế Đồng hồ Teintop trở thành thương hiệu tầm trung bán chạy nhất tại Việt Nam.",
                        img = "/image/sp51.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 52,
                        LSPId = 2,
                        brandId = 7,
                        wireId = 3,
                        machineId = 1,
                        nccId = 7,
                        name = "Đồng hồ nữ chính hãng LORBERN No.6806L-1",
                        amount = 37,
                        price = 2650000,
                        description = "Là sản phẩm của đất nước USA, nơi cội nguồn của nền công nghiệp thế giới nên tất cả các dòng sản phẩm Đồng hồ Teintop đều được trải qua quy trình kiểm định nghiêm ngặt nên chất lượng được đảm bảo tốt nhất. Đồng hồ Teintop chính hãng với chất lượng tốt và giá rẻ khi bước chân vào thị trường Việt Nam đã trở thành một hiện tượng mà rất nhiều người dùng biết đến. Nó đáp ứng được nhu cầu ngon - bổ - rẻ của người dùng tại Việt Nam vì thế Đồng hồ Teintop trở thành thương hiệu tầm trung bán chạy nhất tại Việt Nam.",
                        img = "/image/sp52.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 53,
                        LSPId = 2,
                        brandId = 7,
                        wireId = 3,
                        machineId = 2,
                        nccId = 7,
                        name = "Đồng hồ nữ chính hãng LORBERN No.6806L-2",
                        amount = 25,
                        price = 2650000,
                        description = "Là sản phẩm của đất nước USA, nơi cội nguồn của nền công nghiệp thế giới nên tất cả các dòng sản phẩm Đồng hồ Teintop đều được trải qua quy trình kiểm định nghiêm ngặt nên chất lượng được đảm bảo tốt nhất. Đồng hồ Teintop chính hãng với chất lượng tốt và giá rẻ khi bước chân vào thị trường Việt Nam đã trở thành một hiện tượng mà rất nhiều người dùng biết đến. Nó đáp ứng được nhu cầu ngon - bổ - rẻ của người dùng tại Việt Nam vì thế Đồng hồ Teintop trở thành thương hiệu tầm trung bán chạy nhất tại Việt Nam.",
                        img = "/image/sp53.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 54,
                        LSPId = 2,
                        brandId = 1,
                        wireId = 3,
                        machineId = 2,
                        nccId = 6,
                        name = "Đồng hồ nữ chính hãng LOBINNI L026-2",
                        amount = 41,
                        price = 3550000,
                        description = "Lobinni luôn quan niệm chiếc đồng hồ là thứ ghi lại những khoảnh khắc quý giá nhất trong cuộc sống. Để có được những chiếc đồng hồ có chất lượng tốt nhất Lobinni luôn tuyển chọn những người thợ thủ công có tay nghề cao, ít nhất 10 năm kinh nghiệm trong ngành thiết kế và sản xuất đồng hồ.",
                        img = "/image/sp54.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 55,
                        LSPId = 2,
                        brandId = 7,
                        wireId = 3,
                        machineId = 2,
                        nccId = 6,
                        name = "Đồng hồ nữ chính hãng LORBERN IBV6806-1",
                        amount = 29,
                        price = 2950000,
                        description = "Là sản phẩm của đất nước USA, nơi cội nguồn của nền công nghiệp thế giới nên tất cả các dòng sản phẩm Đồng hồ Teintop đều được trải qua quy trình kiểm định nghiêm ngặt nên chất lượng được đảm bảo tốt nhất. Đồng hồ Teintop chính hãng với chất lượng tốt và giá rẻ khi bước chân vào thị trường Việt Nam đã trở thành một hiện tượng mà rất nhiều người dùng biết đến. Nó đáp ứng được nhu cầu ngon - bổ - rẻ của người dùng tại Việt Nam vì thế Đồng hồ Teintop trở thành thương hiệu tầm trung bán chạy nhất tại Việt Nam.",
                        img = "/image/sp55.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 56,
                        LSPId = 2,
                        brandId = 7,
                        wireId = 3,
                        machineId = 1,
                        nccId = 6,
                        name = "Đồng hồ nữ chính hãng LORBERN IBV6806-2",
                        amount = 30,
                        price = 2950000,
                        description = "Là sản phẩm của đất nước USA, nơi cội nguồn của nền công nghiệp thế giới nên tất cả các dòng sản phẩm Đồng hồ Teintop đều được trải qua quy trình kiểm định nghiêm ngặt nên chất lượng được đảm bảo tốt nhất. Đồng hồ Teintop chính hãng với chất lượng tốt và giá rẻ khi bước chân vào thị trường Việt Nam đã trở thành một hiện tượng mà rất nhiều người dùng biết đến. Nó đáp ứng được nhu cầu ngon - bổ - rẻ của người dùng tại Việt Nam vì thế Đồng hồ Teintop trở thành thương hiệu tầm trung bán chạy nhất tại Việt Nam.",
                        img = "/image/sp56.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 57,
                        LSPId = 2,
                        brandId = 1,
                        wireId = 3,
                        machineId = 1,
                        nccId = 6,
                        name = "Đồng hồ nữ chính hãng LOBINNI L2016-1",
                        amount = 43,
                        price = 4650000,
                        description = "Lobinni luôn quan niệm chiếc đồng hồ là thứ ghi lại những khoảnh khắc quý giá nhất trong cuộc sống. Để có được những chiếc đồng hồ có chất lượng tốt nhất Lobinni luôn tuyển chọn những người thợ thủ công có tay nghề cao, ít nhất 10 năm kinh nghiệm trong ngành thiết kế và sản xuất đồng hồ.",
                        img = "/image/sp57.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 58,
                        LSPId = 2,
                        brandId = 1,
                        wireId = 3,
                        machineId = 1,
                        nccId = 6,
                        name = "Đồng hồ nữ chính hãng LOBINNI L5016-5",
                        amount = 38,
                        price = 6750000,
                        description = "Lobinni cam kết chất lượng của sản phẩm luôn là tiêu chí hàng đầu. Mỗi sản phẩm được tạo ra đều xuất phát từ cảm xúc của nghệ nhân sáng tác. Với mỗi chiếc đồng hồ tạo ra chúng đánh dấu khoảng khắc quý giá của của các nghệ nhân và là một phần lịch sử thương hiệu trong chặng đường chinh phục trái tim người yêu đồng hồ.",
                        img = "/image/sp58.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 59,
                        LSPId = 2,
                        brandId = 1,
                        wireId = 2,
                        machineId = 2,
                        nccId = 6,
                        name = "Đồng hồ nữ chính hãng LOBINNI L2006-1",
                        amount = 57,
                        price = 3950000,
                        description = "Lobinni cam kết chất lượng của sản phẩm luôn là tiêu chí hàng đầu. Mỗi sản phẩm được tạo ra đều xuất phát từ cảm xúc của nghệ nhân sáng tác. Với mỗi chiếc đồng hồ tạo ra chúng đánh dấu khoảng khắc quý giá của của các nghệ nhân và là một phần lịch sử thương hiệu trong chặng đường chinh phục trái tim người yêu đồng hồ.",
                        img = "/image/sp59.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 60,
                        LSPId = 2,
                        brandId = 2,
                        wireId = 2,
                        machineId = 2,
                        nccId = 6,
                        name = "Đồng hồ nữ chính hãng KASSAW K889-1",
                        amount = 23,
                        price = 3550000,
                        description = "Thành Hưng Watch - Tự hào là nhà phân phối độc quyền thương hiệu đồng hồ KASSAW tại Việt Nam.",
                        img = "/image/sp60.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 61,
                        LSPId = 2,
                        brandId = 2,
                        wireId = 2,
                        machineId = 1,
                        nccId = 6,
                        name = "Đồng hồ nữ chính hãng KASSAW K889-2",
                        amount = 24,
                        price = 3550000,
                        description = "Thành Hưng Watch - Tự hào là nhà phân phối độc quyền thương hiệu đồng hồ KASSAW tại Việt Nam.",
                        img = "/image/sp61.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 62,
                        LSPId = 2,
                        brandId = 1,
                        wireId = 2,
                        machineId = 1,
                        nccId = 6,
                        name = "Đồng hồ nữ chính hãng LOBINNI L2010-1",
                        amount = 32,
                        price = 4250000,
                        description = "Trải qua nhiều thập kỷ, Lobinni đã không ngừng phát triển và đã có những bước tiến vô cùng vuợt bậc. Trong đó có việc chế tạo thành công những chiếc đồng hồ Tourbillon đẳng cấp và sang trọng. Không ngừng học hỏi và ứng dụng nhiều công nghệ mới vào việc chế tác đồng hồ, do đó Đồng hồ Lobinni luôn được đánh giá cao và được nhiều người tiêu dùng ưa thích, lựa chọn.",
                        img = "/image/sp62.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 63,
                        LSPId = 2,
                        brandId = 8,
                        wireId = 2,
                        machineId = 1,
                        nccId = 6,
                        name = "Đồng hồ nữ chính hãng Mini Focus MF0265-2",
                        amount = 43,
                        price = 1100000,
                        description = "Là sản phẩm của đất nước USA, nơi cội nguồn của nền công nghiệp thế giới nên tất cả các dòng sản phẩm Đồng hồ Teintop đều được trải qua quy trình kiểm định nghiêm ngặt nên chất lượng được đảm bảo tốt nhất. Đồng hồ Teintop chính hãng với chất lượng tốt và giá rẻ khi bước chân vào thị trường Việt Nam đã trở thành một hiện tượng mà rất nhiều người dùng biết đến. Nó đáp ứng được nhu cầu ngon - bổ - rẻ của người dùng tại Việt Nam vì thế Đồng hồ Teintop trở thành thương hiệu tầm trung bán chạy nhất tại Việt Nam.",
                        img = "/image/sp63.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 64,
                        LSPId = 2,
                        brandId = 8,
                        wireId = 2,
                        machineId = 2,
                        nccId = 6,
                        name = "Đồng hồ nữ chính hãng Mini Focus MF0329-2",
                        amount = 46,
                        price = 1000000,
                        description = "Là sản phẩm của đất nước USA, nơi cội nguồn của nền công nghiệp thế giới nên tất cả các dòng sản phẩm Đồng hồ Teintop đều được trải qua quy trình kiểm định nghiêm ngặt nên chất lượng được đảm bảo tốt nhất. Đồng hồ Teintop chính hãng với chất lượng tốt và giá rẻ khi bước chân vào thị trường Việt Nam đã trở thành một hiện tượng mà rất nhiều người dùng biết đến. Nó đáp ứng được nhu cầu ngon - bổ - rẻ của người dùng tại Việt Nam vì thế Đồng hồ Teintop trở thành thương hiệu tầm trung bán chạy nhất tại Việt Nam.",
                        img = "/image/sp64.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 65,
                        LSPId = 2,
                        brandId = 8,
                        wireId = 2,
                        machineId = 2,
                        nccId = 6,
                        name = "Đồng hồ nữ chính hãng Mini Focus MF0047-1",
                        amount = 32,
                        price = 950000,
                        description = "Là sản phẩm của đất nước USA, nơi cội nguồn của nền công nghiệp thế giới nên tất cả các dòng sản phẩm Đồng hồ Teintop đều được trải qua quy trình kiểm định nghiêm ngặt nên chất lượng được đảm bảo tốt nhất. Đồng hồ Teintop chính hãng với chất lượng tốt và giá rẻ khi bước chân vào thị trường Việt Nam đã trở thành một hiện tượng mà rất nhiều người dùng biết đến. Nó đáp ứng được nhu cầu ngon - bổ - rẻ của người dùng tại Việt Nam vì thế Đồng hồ Teintop trở thành thương hiệu tầm trung bán chạy nhất tại Việt Nam.",
                        img = "/image/sp65.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 66,
                        LSPId = 2,
                        brandId = 8,
                        wireId = 2,
                        machineId = 2,
                        nccId = 6,
                        name = "Đồng hồ nữ chính hãng Mini Focus MF0037-1",
                        amount = 37,
                        price = 850000,
                        description = "Là sản phẩm của đất nước USA, nơi cội nguồn của nền công nghiệp thế giới nên tất cả các dòng sản phẩm Đồng hồ Teintop đều được trải qua quy trình kiểm định nghiêm ngặt nên chất lượng được đảm bảo tốt nhất. Đồng hồ Teintop chính hãng với chất lượng tốt và giá rẻ khi bước chân vào thị trường Việt Nam đã trở thành một hiện tượng mà rất nhiều người dùng biết đến. Nó đáp ứng được nhu cầu ngon - bổ - rẻ của người dùng tại Việt Nam vì thế Đồng hồ Teintop trở thành thương hiệu tầm trung bán chạy nhất tại Việt Nam.",
                        img = "/image/sp66.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 67,
                        LSPId = 2,
                        brandId = 8,
                        wireId = 3,
                        machineId = 1,
                        nccId = 6,
                        name = "Đồng hồ nữ chính hãng Mini Focus MF0038-4",
                        amount = 24,
                        price = 750000,
                        description = "Là sản phẩm của đất nước USA, nơi cội nguồn của nền công nghiệp thế giới nên tất cả các dòng sản phẩm Đồng hồ Teintop đều được trải qua quy trình kiểm định nghiêm ngặt nên chất lượng được đảm bảo tốt nhất. Đồng hồ Teintop chính hãng với chất lượng tốt và giá rẻ khi bước chân vào thị trường Việt Nam đã trở thành một hiện tượng mà rất nhiều người dùng biết đến. Nó đáp ứng được nhu cầu ngon - bổ - rẻ của người dùng tại Việt Nam vì thế Đồng hồ Teintop trở thành thương hiệu tầm trung bán chạy nhất tại Việt Nam.",
                        img = "/image/sp67.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 68,
                        LSPId = 2,
                        brandId = 8,
                        wireId = 2,
                        machineId = 1,
                        nccId = 6,
                        name = "Đồng hồ nữ chính hãng Mini Focus MF0043-1",
                        amount = 27,
                        price = 900000,
                        description = "Là sản phẩm của đất nước USA, nơi cội nguồn của nền công nghiệp thế giới nên tất cả các dòng sản phẩm Đồng hồ Teintop đều được trải qua quy trình kiểm định nghiêm ngặt nên chất lượng được đảm bảo tốt nhất. Đồng hồ Teintop chính hãng với chất lượng tốt và giá rẻ khi bước chân vào thị trường Việt Nam đã trở thành một hiện tượng mà rất nhiều người dùng biết đến. Nó đáp ứng được nhu cầu ngon - bổ - rẻ của người dùng tại Việt Nam vì thế Đồng hồ Teintop trở thành thương hiệu tầm trung bán chạy nhất tại Việt Nam.",
                        img = "/image/sp68.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 69,
                        LSPId = 2,
                        brandId = 8,
                        wireId = 2,
                        machineId = 2,
                        nccId = 6,
                        name = "Đồng hồ nữ chính hãng Mini Focus MF0039-2",
                        amount = 28,
                        price = 800000,
                        description = "Là sản phẩm của đất nước USA, nơi cội nguồn của nền công nghiệp thế giới nên tất cả các dòng sản phẩm Đồng hồ Teintop đều được trải qua quy trình kiểm định nghiêm ngặt nên chất lượng được đảm bảo tốt nhất. Đồng hồ Teintop chính hãng với chất lượng tốt và giá rẻ khi bước chân vào thị trường Việt Nam đã trở thành một hiện tượng mà rất nhiều người dùng biết đến. Nó đáp ứng được nhu cầu ngon - bổ - rẻ của người dùng tại Việt Nam vì thế Đồng hồ Teintop trở thành thương hiệu tầm trung bán chạy nhất tại Việt Nam.",
                        img = "/image/sp69.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 70,
                        LSPId = 2,
                        brandId = 8,
                        wireId = 2,
                        machineId = 2,
                        nccId = 6,
                        name = "Đồng hồ nữ chính hãng Mini Focus MF0160-3",
                        amount = 21,
                        price = 850000,
                        description = "Là sản phẩm của đất nước USA, nơi cội nguồn của nền công nghiệp thế giới nên tất cả các dòng sản phẩm Đồng hồ Teintop đều được trải qua quy trình kiểm định nghiêm ngặt nên chất lượng được đảm bảo tốt nhất. Đồng hồ Teintop chính hãng với chất lượng tốt và giá rẻ khi bước chân vào thị trường Việt Nam đã trở thành một hiện tượng mà rất nhiều người dùng biết đến. Nó đáp ứng được nhu cầu ngon - bổ - rẻ của người dùng tại Việt Nam vì thế Đồng hồ Teintop trở thành thương hiệu tầm trung bán chạy nhất tại Việt Nam.",
                        img = "/image/sp70.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 71,
                        LSPId = 3,
                        brandId = 3,
                        wireId = 3,
                        machineId = 2,
                        nccId = 6,
                        name = "Đồng hồ đôi chính hãng Teintop T7004-13",
                        amount = 21,
                        price = 2990000,
                        description = "Là sản phẩm của đất nước USA, nơi cội nguồn của nền công nghiệp thế giới nên tất cả các dòng sản phẩm Đồng hồ Teintop đều được trải qua quy trình kiểm định nghiêm ngặt nên chất lượng được đảm bảo tốt nhất. Đồng hồ Teintop chính hãng với chất lượng tốt và giá rẻ khi bước chân vào thị trường Việt Nam đã trở thành một hiện tượng mà rất nhiều người dùng biết đến. Nó đáp ứng được nhu cầu ngon - bổ - rẻ của người dùng tại Việt Nam vì thế Đồng hồ Teintop trở thành thương hiệu tầm trung bán chạy nhất tại Việt Nam.",
                        img = "/image/sp71.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 72,
                        LSPId = 3,
                        brandId = 3,
                        wireId = 3,
                        machineId = 2,
                        nccId = 6,
                        name = "Đồng hồ đôi chính hãng Teintop T7004-14",
                        amount = 35,
                        price = 2990000,
                        description = "Là sản phẩm của đất nước USA, nơi cội nguồn của nền công nghiệp thế giới nên tất cả các dòng sản phẩm Đồng hồ Teintop đều được trải qua quy trình kiểm định nghiêm ngặt nên chất lượng được đảm bảo tốt nhất. Đồng hồ Teintop chính hãng với chất lượng tốt và giá rẻ khi bước chân vào thị trường Việt Nam đã trở thành một hiện tượng mà rất nhiều người dùng biết đến. Nó đáp ứng được nhu cầu ngon - bổ - rẻ của người dùng tại Việt Nam vì thế Đồng hồ Teintop trở thành thương hiệu tầm trung bán chạy nhất tại Việt Nam.",
                        img = "/image/sp72.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 73,
                        LSPId = 3,
                        brandId = 3,
                        wireId = 3,
                        machineId = 1,
                        nccId = 6,
                        name = "Đồng hồ đôi chính hãng Teintop T7004-15",
                        amount = 31,
                        price = 2990000,
                        description = "Là sản phẩm của đất nước USA, nơi cội nguồn của nền công nghiệp thế giới nên tất cả các dòng sản phẩm Đồng hồ Teintop đều được trải qua quy trình kiểm định nghiêm ngặt nên chất lượng được đảm bảo tốt nhất. Đồng hồ Teintop chính hãng với chất lượng tốt và giá rẻ khi bước chân vào thị trường Việt Nam đã trở thành một hiện tượng mà rất nhiều người dùng biết đến. Nó đáp ứng được nhu cầu ngon - bổ - rẻ của người dùng tại Việt Nam vì thế Đồng hồ Teintop trở thành thương hiệu tầm trung bán chạy nhất tại Việt Nam.",
                        img = "/image/sp73.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 74,
                        LSPId = 3,
                        brandId = 1,
                        wireId = 3,
                        machineId = 1,
                        nccId = 6,
                        name = "Đồng hồ đôi chính hãng LOBINNI L3033-17",
                        amount = 46,
                        price = 5500000,
                        description = "Lobinni luôn quan niệm chiếc đồng hồ là thứ ghi lại những khoảnh khắc quý giá nhất trong cuộc sống. Để có được những chiếc đồng hồ có chất lượng tốt nhất Lobinni luôn tuyển chọn những người thợ thủ công có tay nghề cao, ít nhất 10 năm kinh nghiệm trong ngành thiết kế và sản xuất đồng hồ.",
                        img = "/image/sp74.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 75,
                        LSPId = 3,
                        brandId = 1,
                        wireId = 3,
                        machineId = 1,
                        nccId = 6,
                        name = "Đồng hồ đôi chính hãng LOBINNI L3033-18",
                        amount = 42,
                        price = 5500000,
                        description = "Lobinni luôn quan niệm chiếc đồng hồ là thứ ghi lại những khoảnh khắc quý giá nhất trong cuộc sống. Để có được những chiếc đồng hồ có chất lượng tốt nhất Lobinni luôn tuyển chọn những người thợ thủ công có tay nghề cao, ít nhất 10 năm kinh nghiệm trong ngành thiết kế và sản xuất đồng hồ.",
                        img = "/image/sp75.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 76,
                        LSPId = 3,
                        brandId = 1,
                        wireId = 3,
                        machineId = 2,
                        nccId = 5,
                        name = "Đồng hồ đôi chính hãng LOBINNI L3033-19",
                        amount = 27,
                        price = 5500000,
                        description = "Lobinni luôn quan niệm chiếc đồng hồ là thứ ghi lại những khoảnh khắc quý giá nhất trong cuộc sống. Để có được những chiếc đồng hồ có chất lượng tốt nhất Lobinni luôn tuyển chọn những người thợ thủ công có tay nghề cao, ít nhất 10 năm kinh nghiệm trong ngành thiết kế và sản xuất đồng hồ.",
                        img = "/image/sp76.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 77,
                        LSPId = 3,
                        brandId = 1,
                        wireId = 3,
                        machineId = 2,
                        nccId = 5,
                        name = "Đồng hồ đôi chính hãng LOBINNI L3033-20",
                        amount = 52,
                        price = 5500000,
                        description = "Lobinni luôn quan niệm chiếc đồng hồ là thứ ghi lại những khoảnh khắc quý giá nhất trong cuộc sống. Để có được những chiếc đồng hồ có chất lượng tốt nhất Lobinni luôn tuyển chọn những người thợ thủ công có tay nghề cao, ít nhất 10 năm kinh nghiệm trong ngành thiết kế và sản xuất đồng hồ.",
                        img = "/image/sp77.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 78,
                        LSPId = 3,
                        brandId = 2,
                        wireId = 3,
                        machineId = 2,
                        nccId = 5,
                        name = "Đồng hồ đôi chính hãng KASSAW K863-7",
                        amount = 18,
                        price = 12500000,
                        description = "Thành Hưng Watch - Tự hào là đơn vị phân phối độc quyền thương hiệu đồng hồ KASSAW tại Việt Nam",
                        img = "/image/sp78.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 79,
                        LSPId = 3,
                        brandId = 2,
                        wireId = 3,
                        machineId = 2,
                        nccId = 5,
                        name = "Đồng hồ đôi chính hãng KASSAW K863-8",
                        amount = 26,
                        price = 12500000,
                        description = "Thành Hưng Watch - Tự hào là đơn vị phân phối độc quyền thương hiệu đồng hồ KASSAW tại Việt Nam",
                        img = "/image/sp79.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 80,
                        LSPId = 3,
                        brandId = 2,
                        wireId = 3,
                        machineId = 1,
                        nccId = 5,
                        name = "Đồng hồ đôi chính hãng KASSAW K863-9",
                        amount = 21,
                        price = 12500000,
                        description = "Thành Hưng Watch - Tự hào là đơn vị phân phối độc quyền thương hiệu đồng hồ KASSAW tại Việt Nam",
                        img = "/image/sp80.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 81,
                        LSPId = 3,
                        brandId = 1,
                        wireId = 2,
                        machineId = 1,
                        nccId = 5,
                        name = "Đồng hồ đôi chính hãng LOBINNI L3004-10",
                        amount = 27,
                        price = 6000000,
                        description = "Lobinni cam kết chất lượng của sản phẩm luôn là tiêu chí hàng đầu. Mỗi sản phẩm được tạo ra đều xuất phát từ cảm xúc của nghệ nhân sáng tác. Với mỗi chiếc đồng hồ tạo ra chúng đánh dấu khoảng khắc quý giá của của các nghệ nhân và là một phần lịch sử thương hiệu trong chặng đường chinh phục trái tim người yêu đồng hồ.",
                        img = "/image/sp81.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 82,
                        LSPId = 3,
                        brandId = 1,
                        wireId = 2,
                        machineId = 1,
                        nccId = 5,
                        name = "Đồng hồ đôi chính hãng LOBINNI L3004-11",
                        amount = 34,
                        price = 6000000,
                        description = "Lobinni cam kết chất lượng của sản phẩm luôn là tiêu chí hàng đầu. Mỗi sản phẩm được tạo ra đều xuất phát từ cảm xúc của nghệ nhân sáng tác. Với mỗi chiếc đồng hồ tạo ra chúng đánh dấu khoảng khắc quý giá của của các nghệ nhân và là một phần lịch sử thương hiệu trong chặng đường chinh phục trái tim người yêu đồng hồ.",
                        img = "/image/sp82.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 83,
                        LSPId = 3,
                        brandId = 1,
                        wireId = 2,
                        machineId = 2,
                        nccId = 5,
                        name = "Đồng hồ đôi chính hãng LOBINNI L3004-12",
                        amount = 32,
                        price = 6000000,
                        description = "Lobinni cam kết chất lượng của sản phẩm luôn là tiêu chí hàng đầu. Mỗi sản phẩm được tạo ra đều xuất phát từ cảm xúc của nghệ nhân sáng tác. Với mỗi chiếc đồng hồ tạo ra chúng đánh dấu khoảng khắc quý giá của của các nghệ nhân và là một phần lịch sử thương hiệu trong chặng đường chinh phục trái tim người yêu đồng hồ.",
                        img = "/image/sp83.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 84,
                        LSPId = 3,
                        brandId = 1,
                        wireId = 3,
                        machineId = 2,
                        nccId = 5,
                        name = "Đồng hồ đôi chính hãng LOBINNI L3013-1",
                        amount = 28,
                        price = 5000000,
                        description = "Lobinni cam kết chất lượng của sản phẩm luôn là tiêu chí hàng đầu. Mỗi sản phẩm được tạo ra đều xuất phát từ cảm xúc của nghệ nhân sáng tác. Với mỗi chiếc đồng hồ tạo ra chúng đánh dấu khoảng khắc quý giá của của các nghệ nhân và là một phần lịch sử thương hiệu trong chặng đường chinh phục trái tim người yêu đồng hồ.",
                        img = "/image/sp84.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 85,
                        LSPId = 3,
                        brandId = 1,
                        wireId = 3,
                        machineId = 2,
                        nccId = 5,
                        name = "Đồng hồ đôi chính hãng LOBINNI L3013-2",
                        amount = 30,
                        price = 5000000,
                        description = "Lobinni cam kết chất lượng của sản phẩm luôn là tiêu chí hàng đầu. Mỗi sản phẩm được tạo ra đều xuất phát từ cảm xúc của nghệ nhân sáng tác. Với mỗi chiếc đồng hồ tạo ra chúng đánh dấu khoảng khắc quý giá của của các nghệ nhân và là một phần lịch sử thương hiệu trong chặng đường chinh phục trái tim người yêu đồng hồ.",
                        img = "/image/sp85.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 86,
                        LSPId = 3,
                        brandId = 1,
                        wireId = 3,
                        machineId = 2,
                        nccId = 5,
                        name = "Đồng hồ đôi chính hãng LOBINNI L3013-3",
                        amount = 32,
                        price = 5000000,
                        description = "Lobinni cam kết chất lượng của sản phẩm luôn là tiêu chí hàng đầu. Mỗi sản phẩm được tạo ra đều xuất phát từ cảm xúc của nghệ nhân sáng tác. Với mỗi chiếc đồng hồ tạo ra chúng đánh dấu khoảng khắc quý giá của của các nghệ nhân và là một phần lịch sử thương hiệu trong chặng đường chinh phục trái tim người yêu đồng hồ.",
                        img = "/image/sp86.jpg",
                        status = 1
                    },		
                    new SanPham{
                        // Id = 87,
                        LSPId = 3,
                        brandId = 1,
                        wireId = 3,
                        machineId = 2,
                        nccId = 5,
                        name = "Đồng hồ đôi chính hãng LOBINNI L3013-4",
                        amount = 33,
                        price = 5000000,
                        description = "Lobinni cam kết chất lượng của sản phẩm luôn là tiêu chí hàng đầu. Mỗi sản phẩm được tạo ra đều xuất phát từ cảm xúc của nghệ nhân sáng tác. Với mỗi chiếc đồng hồ tạo ra chúng đánh dấu khoảng khắc quý giá của của các nghệ nhân và là một phần lịch sử thương hiệu trong chặng đường chinh phục trái tim người yêu đồng hồ.",
                        img = "/image/sp87.jpg",
                        status = 1
                    },   
                    new SanPham{
                        // Id = 88,
                        LSPId = 3,
                        brandId = 1,
                        wireId = 3,
                        machineId = 1,
                        nccId = 5,
                        name = "Đồng hồ đôi chính hãng LOBINNI L3013-5",
                        amount = 18,
                        price = 5000000,
                        description = "Lobinni cam kết chất lượng của sản phẩm luôn là tiêu chí hàng đầu. Mỗi sản phẩm được tạo ra đều xuất phát từ cảm xúc của nghệ nhân sáng tác. Với mỗi chiếc đồng hồ tạo ra chúng đánh dấu khoảng khắc quý giá của của các nghệ nhân và là một phần lịch sử thương hiệu trong chặng đường chinh phục trái tim người yêu đồng hồ.",
                        img = "/image/sp88.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 89,
                        LSPId = 3,
                        brandId = 1,
                        wireId = 3,
                        machineId = 1,
                        nccId = 5,
                        name = "Đồng hồ đôi chính hãng LOBINNI L3013-6",
                        amount = 23,
                        price = 5000000,
                        description = "Lobinni cam kết chất lượng của sản phẩm luôn là tiêu chí hàng đầu. Mỗi sản phẩm được tạo ra đều xuất phát từ cảm xúc của nghệ nhân sáng tác. Với mỗi chiếc đồng hồ tạo ra chúng đánh dấu khoảng khắc quý giá của của các nghệ nhân và là một phần lịch sử thương hiệu trong chặng đường chinh phục trái tim người yêu đồng hồ.",
                        img = "/image/sp89.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 90,
                        LSPId = 3,
                        brandId = 1,
                        wireId = 3,
                        machineId = 1,
                        nccId = 5,
                        name = "Đồng hồ đôi chính hãng LOBINNI L3013-7",
                        amount = 27,
                        price = 4800000,
                        description = "Lobinni cam kết chất lượng của sản phẩm luôn là tiêu chí hàng đầu. Mỗi sản phẩm được tạo ra đều xuất phát từ cảm xúc của nghệ nhân sáng tác. Với mỗi chiếc đồng hồ tạo ra chúng đánh dấu khoảng khắc quý giá của của các nghệ nhân và là một phần lịch sử thương hiệu trong chặng đường chinh phục trái tim người yêu đồng hồ.",
                        img = "/image/sp90.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 91,
                        LSPId = 3,
                        brandId = 1,
                        wireId = 3,
                        machineId = 1,
                        nccId = 5,
                        name = "Đồng hồ đôi chính hãng LOBINNI L3013-8",
                        amount = 18,
                        price = 4800000,
                        description = "Lobinni cam kết chất lượng của sản phẩm luôn là tiêu chí hàng đầu. Mỗi sản phẩm được tạo ra đều xuất phát từ cảm xúc của nghệ nhân sáng tác. Với mỗi chiếc đồng hồ tạo ra chúng đánh dấu khoảng khắc quý giá của của các nghệ nhân và là một phần lịch sử thương hiệu trong chặng đường chinh phục trái tim người yêu đồng hồ.",
                        img = "/image/sp91.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 92,
                        LSPId = 3,
                        brandId = 2,
                        wireId = 3,
                        machineId = 1,
                        nccId = 5,
                        name = "Đồng hồ đôi chính hãng KASSAW K858-5",
                        amount = 20,
                        price = 4850000,
                        description = "Thành Hưng Watch - Tự hào là đơn vị phân phối độc quyền thương hiệu đồng hồ KASSAW tại Việt Nam.",
                        img = "/image/sp92.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 93,
                        LSPId = 3,
                        brandId = 1,
                        wireId = 2,
                        machineId = 1,
                        nccId = 5,
                        name = "Đồng hồ đôi chính hãng LOBINNI L3012-28",
                        amount = 25,
                        price = 5650000,
                        description = "Lobinni cam kết chất lượng của sản phẩm luôn là tiêu chí hàng đầu. Mỗi sản phẩm được tạo ra đều xuất phát từ cảm xúc của nghệ nhân sáng tác. Với mỗi chiếc đồng hồ tạo ra chúng đánh dấu khoảng khắc quý giá của của các nghệ nhân và là một phần lịch sử thương hiệu trong chặng đường chinh phục trái tim người yêu đồng hồ.",
                        img = "/image/sp93.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 94,
                        LSPId = 3,
                        brandId = 1,
                        wireId = 2,
                        machineId = 1,
                        nccId = 5,
                        name = "Đồng hồ đôi chính hãng LOBINNI L3012-29",
                        amount = 28,
                        price = 5650000,
                        description = "Lobinni cam kết chất lượng của sản phẩm luôn là tiêu chí hàng đầu. Mỗi sản phẩm được tạo ra đều xuất phát từ cảm xúc của nghệ nhân sáng tác. Với mỗi chiếc đồng hồ tạo ra chúng đánh dấu khoảng khắc quý giá của của các nghệ nhân và là một phần lịch sử thương hiệu trong chặng đường chinh phục trái tim người yêu đồng hồ.",
                        img = "/image/sp94.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 95,
                        LSPId = 3,
                        brandId = 1,
                        wireId = 2,
                        machineId = 1,
                        nccId = 5,
                        name = "Đồng hồ đôi chính hãng LOBINNI L3012-30",
                        amount = 32,
                        price = 5650000,
                        description = "Lobinni cam kết chất lượng của sản phẩm luôn là tiêu chí hàng đầu. Mỗi sản phẩm được tạo ra đều xuất phát từ cảm xúc của nghệ nhân sáng tác. Với mỗi chiếc đồng hồ tạo ra chúng đánh dấu khoảng khắc quý giá của của các nghệ nhân và là một phần lịch sử thương hiệu trong chặng đường chinh phục trái tim người yêu đồng hồ.",
                        img = "/image/sp95.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 96,
                        LSPId = 3,
                        brandId = 1,
                        wireId = 2,
                        machineId = 2,
                        nccId = 5,
                        name = "Đồng hồ đôi chính hãng LOBINNI L3003-1",
                        amount = 25,
                        price = 4150000,
                        description = "Lobinni luôn quan niệm chiếc đồng hồ là thứ ghi lại những khoảnh khắc quý giá nhất trong cuộc sống. Để có được những chiếc đồng hồ có chất lượng tốt nhất Lobinni luôn tuyển chọn những người thợ thủ công có tay nghề cao, ít nhất 10 năm kinh nghiệm trong ngành thiết kế và sản xuất đồng hồ.",
                        img = "/image/sp96.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 97,
                        LSPId = 3,
                        brandId = 1,
                        wireId = 2,
                        machineId = 2,
                        nccId = 5,
                        name = "Đồng hồ đôi chính hãng LOBINNI L3003-2",
                        amount = 28,
                        price = 4150000,
                        description = "Lobinni luôn quan niệm chiếc đồng hồ là thứ ghi lại những khoảnh khắc quý giá nhất trong cuộc sống. Để có được những chiếc đồng hồ có chất lượng tốt nhất Lobinni luôn tuyển chọn những người thợ thủ công có tay nghề cao, ít nhất 10 năm kinh nghiệm trong ngành thiết kế và sản xuất đồng hồ.",
                        img = "/image/sp97.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 98,
                        LSPId = 3,
                        brandId = 1,
                        wireId = 2,
                        machineId = 2,
                        nccId = 5,
                        name = "Đồng hồ đôi chính hãng LOBINNI L3003-3",
                        amount = 33,
                        price = 4150000,
                        description = "Lobinni luôn quan niệm chiếc đồng hồ là thứ ghi lại những khoảnh khắc quý giá nhất trong cuộc sống. Để có được những chiếc đồng hồ có chất lượng tốt nhất Lobinni luôn tuyển chọn những người thợ thủ công có tay nghề cao, ít nhất 10 năm kinh nghiệm trong ngành thiết kế và sản xuất đồng hồ.",
                        img = "/image/sp98.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 99,
                        LSPId = 3,
                        brandId = 1,
                        wireId = 2,
                        machineId = 2,
                        nccId = 5,
                        name = "Đồng hồ đôi chính hãng LOBINNI L3003-4",
                        amount = 17,
                        price = 4150000,
                        description = "Lobinni luôn quan niệm chiếc đồng hồ là thứ ghi lại những khoảnh khắc quý giá nhất trong cuộc sống. Để có được những chiếc đồng hồ có chất lượng tốt nhất Lobinni luôn tuyển chọn những người thợ thủ công có tay nghề cao, ít nhất 10 năm kinh nghiệm trong ngành thiết kế và sản xuất đồng hồ.",
                        img = "/image/sp99.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 100,
                        LSPId = 3,
                        brandId = 1,
                        wireId = 2,
                        machineId = 2,
                        nccId = 5,
                        name = "Đồng hồ đôi chính hãng LOBINNI L3003-5",
                        amount = 25,
                        price = 4900000,
                        description = "Lobinni luôn quan niệm chiếc đồng hồ là thứ ghi lại những khoảnh khắc quý giá nhất trong cuộc sống. Để có được những chiếc đồng hồ có chất lượng tốt nhất Lobinni luôn tuyển chọn những người thợ thủ công có tay nghề cao, ít nhất 10 năm kinh nghiệm trong ngành thiết kế và sản xuất đồng hồ.",
                        img = "/image/sp100.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 101,
                        LSPId = 4,
                        brandId = 5,
                        wireId = 1,
                        machineId = 1,
                        nccId = 4,
                        name = "Đồng hồ để bàn chính hãng NAMKIN B1526",
                        amount = 25,
                        price = 4350000,
                        description = "Là sản phẩm của đất nước USA, nơi cội nguồn của nền công nghiệp thế giới nên tất cả các dòng sản phẩm Đồng hồ Teintop đều được trải qua quy trình kiểm định nghiêm ngặt nên chất lượng được đảm bảo tốt nhất. Đồng hồ Teintop chính hãng với chất lượng tốt và giá rẻ khi bước chân vào thị trường Việt Nam đã trở thành một hiện tượng mà rất nhiều người dùng biết đến. Nó đáp ứng được nhu cầu ngon - bổ - rẻ của người dùng tại Việt Nam vì thế Đồng hồ NAMKIN trở thành thương hiệu tầm trung bán chạy nhất tại Việt Nam.",
                        img = "/image/sp101.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 102,
                        LSPId = 4,
                        brandId = 5,
                        wireId = 1,
                        machineId = 1,
                        nccId = 4,
                        name = "Đồng hồ để bàn chính hãng NAMKIN B1524",
                        amount = 30,
                        price = 4990000,
                        description = "Là sản phẩm của đất nước USA, nơi cội nguồn của nền công nghiệp thế giới nên tất cả các dòng sản phẩm Đồng hồ Teintop đều được trải qua quy trình kiểm định nghiêm ngặt nên chất lượng được đảm bảo tốt nhất. Đồng hồ Teintop chính hãng với chất lượng tốt và giá rẻ khi bước chân vào thị trường Việt Nam đã trở thành một hiện tượng mà rất nhiều người dùng biết đến. Nó đáp ứng được nhu cầu ngon - bổ - rẻ của người dùng tại Việt Nam vì thế Đồng hồ NAMKIN trở thành thương hiệu tầm trung bán chạy nhất tại Việt Nam.",
                        img = "/image/sp102.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 103,
                        LSPId = 4,
                        brandId = 5,
                        wireId = 1,
                        machineId = 1,
                        nccId = 4,
                        name = "Đồng hồ để bàn chính hãng NAMKIN B945-1",
                        amount = 32,
                        price = 2850000,
                        description = "Là sản phẩm của đất nước USA, nơi cội nguồn của nền công nghiệp thế giới nên tất cả các dòng sản phẩm Đồng hồ Teintop đều được trải qua quy trình kiểm định nghiêm ngặt nên chất lượng được đảm bảo tốt nhất. Đồng hồ Teintop chính hãng với chất lượng tốt và giá rẻ khi bước chân vào thị trường Việt Nam đã trở thành một hiện tượng mà rất nhiều người dùng biết đến. Nó đáp ứng được nhu cầu ngon - bổ - rẻ của người dùng tại Việt Nam vì thế Đồng hồ NAMKIN trở thành thương hiệu tầm trung bán chạy nhất tại Việt Nam.",
                        img = "/image/sp103.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 104,
                        LSPId = 4,
                        brandId = 5,
                        wireId = 1,
                        machineId = 1,
                        nccId = 4,
                        name = "Đồng hồ để bàn chính hãng NAMKIN B945-2",
                        amount = 33,
                        price = 2850000,
                        description = "Là sản phẩm của đất nước USA, nơi cội nguồn của nền công nghiệp thế giới nên tất cả các dòng sản phẩm Đồng hồ Teintop đều được trải qua quy trình kiểm định nghiêm ngặt nên chất lượng được đảm bảo tốt nhất. Đồng hồ Teintop chính hãng với chất lượng tốt và giá rẻ khi bước chân vào thị trường Việt Nam đã trở thành một hiện tượng mà rất nhiều người dùng biết đến. Nó đáp ứng được nhu cầu ngon - bổ - rẻ của người dùng tại Việt Nam vì thế Đồng hồ NAMKIN trở thành thương hiệu tầm trung bán chạy nhất tại Việt Nam.",
                        img = "/image/sp104.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 105,
                        LSPId = 4,
                        brandId = 5,
                        wireId = 1,
                        machineId = 1,
                        nccId = 4,
                        name = "Đồng hồ để bàn chính hãng NAMKIN A1482GE",
                        amount = 32,
                        price = 3450000,
                        description = "Là sản phẩm của đất nước USA, nơi cội nguồn của nền công nghiệp thế giới nên tất cả các dòng sản phẩm Đồng hồ Teintop đều được trải qua quy trình kiểm định nghiêm ngặt nên chất lượng được đảm bảo tốt nhất. Đồng hồ Teintop chính hãng với chất lượng tốt và giá rẻ khi bước chân vào thị trường Việt Nam đã trở thành một hiện tượng mà rất nhiều người dùng biết đến. Nó đáp ứng được nhu cầu ngon - bổ - rẻ của người dùng tại Việt Nam vì thế Đồng hồ NAMKIN trở thành thương hiệu tầm trung bán chạy nhất tại Việt Nam.",
                        img = "/image/sp105.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 106,
                        LSPId = 4,
                        brandId = 5,
                        wireId = 1,
                        machineId = 1,
                        nccId = 4,
                        name = "Đồng hồ để bàn chính hãng NAMKIN T1628",
                        amount = 32,
                        price = 3180000,
                        description = "Là sản phẩm của đất nước USA, nơi cội nguồn của nền công nghiệp thế giới nên tất cả các dòng sản phẩm Đồng hồ Teintop đều được trải qua quy trình kiểm định nghiêm ngặt nên chất lượng được đảm bảo tốt nhất. Đồng hồ Teintop chính hãng với chất lượng tốt và giá rẻ khi bước chân vào thị trường Việt Nam đã trở thành một hiện tượng mà rất nhiều người dùng biết đến. Nó đáp ứng được nhu cầu ngon - bổ - rẻ của người dùng tại Việt Nam vì thế Đồng hồ NAMKIN trở thành thương hiệu tầm trung bán chạy nhất tại Việt Nam.",
                        img = "/image/sp106.jpg",
                        status = 1
                    },	
                    new SanPham{
                        // Id = 107,
                        LSPId = 4,
                        brandId = 5,
                        wireId = 1,
                        machineId = 1,
                        nccId = 4,
                        name = "Đồng hồ để bàn chính hãng NAMKIN B1516",
                        amount = 15,
                        price = 3250000,
                        description = "Là sản phẩm của đất nước USA, nơi cội nguồn của nền công nghiệp thế giới nên tất cả các dòng sản phẩm Đồng hồ Teintop đều được trải qua quy trình kiểm định nghiêm ngặt nên chất lượng được đảm bảo tốt nhất. Đồng hồ Teintop chính hãng với chất lượng tốt và giá rẻ khi bước chân vào thị trường Việt Nam đã trở thành một hiện tượng mà rất nhiều người dùng biết đến. Nó đáp ứng được nhu cầu ngon - bổ - rẻ của người dùng tại Việt Nam vì thế Đồng hồ NAMKIN trở thành thương hiệu tầm trung bán chạy nhất tại Việt Nam.",
                        img = "/image/sp107.jpg",
                        status = 1
                    },	
                    new SanPham{
                        // Id = 108,
                        LSPId = 4,
                        brandId = 5,
                        wireId = 1,
                        machineId = 1,
                        nccId = 4,
                        name = "Đồng hồ để bàn chính hãng NAMKIN B1515",
                        amount = 18,
                        price = 2450000,
                        description = "Là sản phẩm của đất nước USA, nơi cội nguồn của nền công nghiệp thế giới nên tất cả các dòng sản phẩm Đồng hồ Teintop đều được trải qua quy trình kiểm định nghiêm ngặt nên chất lượng được đảm bảo tốt nhất. Đồng hồ Teintop chính hãng với chất lượng tốt và giá rẻ khi bước chân vào thị trường Việt Nam đã trở thành một hiện tượng mà rất nhiều người dùng biết đến. Nó đáp ứng được nhu cầu ngon - bổ - rẻ của người dùng tại Việt Nam vì thế Đồng hồ NAMKIN trở thành thương hiệu tầm trung bán chạy nhất tại Việt Nam.",
                        img = "/image/sp108.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 109,
                        LSPId = 4,
                        brandId = 6,
                        wireId = 1,
                        machineId = 1,
                        nccId = 4,
                        name = "Đồng hồ để bàn chính hãng PONIGER B1525",
                        amount = 23,
                        price = 4650000,
                        description = "NÉT CỔ ĐIỂN HIẾM CÓ: Đúng như tên gọi “Caballero”, Poniger P7.23-1 sở hữu nét đẹp cổ điển hiếm có, phảng phất phong vị xưa cũ. Chất cổ điển, lịch lãm toát lên từ màu sắc, kiểu dáng cũng như những chi tiết nhấn nhá tinh tế.",
                        img = "/image/sp109.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 110,
                        LSPId = 4,
                        brandId = 6,
                        wireId = 1,
                        machineId = 1,
                        nccId = 4,
                        name = "Đồng hồ để bàn chính hãng PONIGER B1523",
                        amount = 27,
                        price = 3000000,
                        description = "NÉT CỔ ĐIỂN HIẾM CÓ: Đúng như tên gọi “Caballero”, Poniger P7.23-1 sở hữu nét đẹp cổ điển hiếm có, phảng phất phong vị xưa cũ. Chất cổ điển, lịch lãm toát lên từ màu sắc, kiểu dáng cũng như những chi tiết nhấn nhá tinh tế.",
                        img = "/image/sp110.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 111,
                        LSPId = 4,
                        brandId = 6,
                        wireId = 1,
                        machineId = 1,
                        nccId = 4,
                        name = "Đồng hồ để bàn chính hãng PONIGER B1504",
                        amount = 30,
                        price = 4650000,
                        description = "NÉT CỔ ĐIỂN HIẾM CÓ: Đúng như tên gọi “Caballero”, Poniger P7.23-1 sở hữu nét đẹp cổ điển hiếm có, phảng phất phong vị xưa cũ. Chất cổ điển, lịch lãm toát lên từ màu sắc, kiểu dáng cũng như những chi tiết nhấn nhá tinh tế.",
                        img = "/image/sp111.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 112,
                        LSPId = 4,
                        brandId = 6,
                        wireId = 1,
                        machineId = 1,
                        nccId = 4,
                        name = "Đồng hồ để bàn chính hãng PONIGER B1502",
                        amount = 32,
                        price = 2950000,
                        description = "NÉT CỔ ĐIỂN HIẾM CÓ: Đúng như tên gọi “Caballero”, Poniger P7.23-1 sở hữu nét đẹp cổ điển hiếm có, phảng phất phong vị xưa cũ. Chất cổ điển, lịch lãm toát lên từ màu sắc, kiểu dáng cũng như những chi tiết nhấn nhá tinh tế.",
                        img = "/image/sp112.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 113,
                        LSPId = 4,
                        brandId = 6,
                        wireId = 1,
                        machineId = 1,
                        nccId = 4,
                        name = "Đồng hồ để bàn chính hãng PONIGER D1596-1",
                        amount = 30,
                        price = 3450000,
                        description = "TỔNG THỂ HÀI HÒA: Sự kết hợp tinh tế giữa xanh và trắng, kết hợp vòng benzen đính đá tinh tinh xảo. Viền trắng thép 316L tạo nên mặt đồng hồ đẹp như tạc.",
                        img = "/image/sp113.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 114,
                        LSPId = 4,
                        brandId = 6,
                        wireId = 1,
                        machineId = 1,
                        nccId = 4,
                        name = "Đồng hồ để bàn chính hãng PONIGER D1596-2",
                        amount = 35,
                        price = 3450000,
                        description = "TỔNG THỂ HÀI HÒA: Sự kết hợp tinh tế giữa xanh và trắng, kết hợp vòng benzen đính đá tinh tinh xảo. Viền trắng thép 316L tạo nên mặt đồng hồ đẹp như tạc.",
                        img = "/image/sp114.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 115,
                        LSPId = 4,
                        brandId = 6,
                        wireId = 1,
                        machineId = 1,
                        nccId = 4,
                        name = "Đồng hồ để bàn chính hãng PONIGER K019",
                        amount = 33,
                        price = 2990000,
                        description = "TỔNG THỂ HÀI HÒA: Sự kết hợp tinh tế giữa xanh và trắng, kết hợp vòng benzen đính đá tinh tinh xảo. Viền trắng thép 316L tạo nên mặt đồng hồ đẹp như tạc.",
                        img = "/image/sp115.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 116,
                        LSPId = 4,
                        brandId = 6,
                        wireId = 1,
                        machineId = 1,
                        nccId = 4,
                        name = "Đồng hồ để bàn chính hãng PONIGER A1600GE",
                        amount = 22,
                        price = 3150000,
                        description = "TỔNG THỂ HÀI HÒA: Sự kết hợp tinh tế giữa xanh và trắng, kết hợp vòng benzen đính đá tinh tinh xảo. Viền trắng thép 316L tạo nên mặt đồng hồ đẹp như tạc.",
                        img = "/image/sp116.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 117,
                        LSPId = 4,
                        brandId = 6,
                        wireId = 1,
                        machineId = 1,
                        nccId = 4,
                        name = "Đồng hồ để bàn chính hãng PONIGER H1610",
                        amount = 47,
                        price = 3850000,
                        description = "TỔNG THỂ HÀI HÒA: Sự kết hợp tinh tế giữa xanh và trắng, kết hợp vòng benzen đính đá tinh tinh xảo. Viền trắng thép 316L tạo nên mặt đồng hồ đẹp như tạc.",
                        img = "/image/sp117.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 118,
                        LSPId = 4,
                        brandId = 6,
                        wireId = 1,
                        machineId = 1,
                        nccId = 4,
                        name = "Đồng hồ để bàn chính hãng PONIGER H1621",
                        amount = 30,
                        price = 950000,
                        description = "TỔNG THỂ HÀI HÒA: Sự kết hợp tinh tế giữa xanh và trắng, kết hợp vòng benzen đính đá tinh tinh xảo. Viền trắng thép 316L tạo nên mặt đồng hồ đẹp như tạc.",
                        img = "/image/sp118.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 119,
                        LSPId = 4,
                        brandId = 6,
                        wireId = 1,
                        machineId = 1,
                        nccId = 4,
                        name = "Đồng hồ để bàn chính hãng PONIGER H1565",
                        amount = 47,
                        price = 2680000,
                        description = "TỔNG THỂ HÀI HÒA: Sự kết hợp tinh tế giữa xanh và trắng, kết hợp vòng benzen đính đá tinh tinh xảo. Viền trắng thép 316L tạo nên mặt đồng hồ đẹp như tạc.",
                        img = "/image/sp119.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 120,
                        LSPId = 4,
                        brandId = 4,
                        wireId = 1,
                        machineId = 1,
                        nccId = 4,
                        name = "Đồng hồ để bàn chính hãng HAZEAL K017",
                        amount = 42,
                        price = 1350000,
                        description = "Kim giây đồng hồ được thiết kế như một cối xay gió đầy tinh xảo đó, ta có thể thấy được sức mạnh, nhiệt huyết luôn cuộn chảy không ngừng nghỉ trong những cỗ máy cơ Caballero. Sức mạnh từ tinh thần chiến đấu quả cảm, hết mình hệt như những hiệp sỹ Tây Ban Nha cổ xưa!",
                        img = "/image/sp120.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 121,
                        LSPId = 4,
                        brandId = 4,
                        wireId = 1,
                        machineId = 1,
                        nccId = 4,
                        name = "Đồng hồ để bàn chính hãng HAZEAL K011",
                        amount = 42,
                        price = 2650000,
                        description = "Kim giây đồng hồ được thiết kế như một cối xay gió đầy tinh xảo đó, ta có thể thấy được sức mạnh, nhiệt huyết luôn cuộn chảy không ngừng nghỉ trong những cỗ máy cơ Caballero. Sức mạnh từ tinh thần chiến đấu quả cảm, hết mình hệt như những hiệp sỹ Tây Ban Nha cổ xưa!",
                        img = "/image/sp121.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 122,
                        LSPId = 4,
                        brandId = 4,
                        wireId = 1,
                        machineId = 1,
                        nccId = 4,
                        name = "Đồng hồ để bàn chính hãng HAZEAL K1620",
                        amount = 25,
                        price = 2860000,
                        description = "Kim giây đồng hồ được thiết kế như một cối xay gió đầy tinh xảo đó, ta có thể thấy được sức mạnh, nhiệt huyết luôn cuộn chảy không ngừng nghỉ trong những cỗ máy cơ Caballero. Sức mạnh từ tinh thần chiến đấu quả cảm, hết mình hệt như những hiệp sỹ Tây Ban Nha cổ xưa!",
                        img = "/image/sp122.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 123,
                        LSPId = 4,
                        brandId = 4,
                        wireId = 1,
                        machineId = 1,
                        nccId = 4,
                        name = "Đồng hồ để bàn chính hãng HAZEAL 1591GE",
                        amount = 28,
                        price = 3350000,
                        description = "Kim giây đồng hồ được thiết kế như một cối xay gió đầy tinh xảo đó, ta có thể thấy được sức mạnh, nhiệt huyết luôn cuộn chảy không ngừng nghỉ trong những cỗ máy cơ Caballero. Sức mạnh từ tinh thần chiến đấu quả cảm, hết mình hệt như những hiệp sỹ Tây Ban Nha cổ xưa!",
                        img = "/image/sp123.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 124,
                        LSPId = 4,
                        brandId = 4,
                        wireId = 1,
                        machineId = 1,
                        nccId = 4,
                        name = "Đồng hồ để bàn chính hãng HAZEAL K001M",
                        amount = 28,
                        price = 2350000,
                        description = "Kim giây đồng hồ được thiết kế như một cối xay gió đầy tinh xảo đó, ta có thể thấy được sức mạnh, nhiệt huyết luôn cuộn chảy không ngừng nghỉ trong những cỗ máy cơ Caballero. Sức mạnh từ tinh thần chiến đấu quả cảm, hết mình hệt như những hiệp sỹ Tây Ban Nha cổ xưa!",
                        img = "/image/sp124.jpg",
                        status = 1
                    },	
                    new SanPham{
                        // Id = 125,
                        LSPId = 4,
                        brandId = 4,
                        wireId = 1,
                        machineId = 1,
                        nccId = 4,
                        name = "Đồng hồ để bàn chính hãng HAZEAL T1586-81",
                        amount = 22,
                        price = 2900000,
                        description = "Kim giây đồng hồ được thiết kế như một cối xay gió đầy tinh xảo đó, ta có thể thấy được sức mạnh, nhiệt huyết luôn cuộn chảy không ngừng nghỉ trong những cỗ máy cơ Caballero. Sức mạnh từ tinh thần chiến đấu quả cảm, hết mình hệt như những hiệp sỹ Tây Ban Nha cổ xưa!",
                        img = "/image/sp125.jpg",
                        status = 1
                    },	
                    new SanPham{
                        // Id = 126,
                        LSPId = 4,
                        brandId = 4,
                        wireId = 1,
                        machineId = 1,
                        nccId = 4,
                        name = "Đồng hồ để bàn chính hãng HAZEAL T1573",
                        amount = 27,
                        price = 3680000,
                        description = "Kim giây đồng hồ được thiết kế như một cối xay gió đầy tinh xảo đó, ta có thể thấy được sức mạnh, nhiệt huyết luôn cuộn chảy không ngừng nghỉ trong những cỗ máy cơ Caballero. Sức mạnh từ tinh thần chiến đấu quả cảm, hết mình hệt như những hiệp sỹ Tây Ban Nha cổ xưa!",
                        img = "/image/sp126.jpg",
                        status = 1
                    },	
                    new SanPham{
                        // Id = 127,
                        LSPId = 4,
                        brandId = 4,
                        wireId = 1,
                        machineId = 1,
                        nccId = 4,
                        name = "Đồng hồ để bàn chính hãng HAZEAL 1633-81",
                        amount = 26,
                        price = 2990000,
                        description = "Kim giây đồng hồ được thiết kế như một cối xay gió đầy tinh xảo đó, ta có thể thấy được sức mạnh, nhiệt huyết luôn cuộn chảy không ngừng nghỉ trong những cỗ máy cơ Caballero. Sức mạnh từ tinh thần chiến đấu quả cảm, hết mình hệt như những hiệp sỹ Tây Ban Nha cổ xưa!",
                        img = "/image/sp127.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 128,
                        LSPId = 4,
                        brandId = 4,
                        wireId = 1,
                        machineId = 1,
                        nccId = 4,
                        name = "Đồng hồ để bàn chính hãng HAZEAL 1590Y",
                        amount = 42,
                        price = 3390000,
                        description = "Kim giây đồng hồ được thiết kế như một cối xay gió đầy tinh xảo đó, ta có thể thấy được sức mạnh, nhiệt huyết luôn cuộn chảy không ngừng nghỉ trong những cỗ máy cơ Caballero. Sức mạnh từ tinh thần chiến đấu quả cảm, hết mình hệt như những hiệp sỹ Tây Ban Nha cổ xưa!",
                        img = "/image/sp128.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 129,
                        LSPId = 4,
                        brandId = 4,
                        wireId = 1,
                        machineId = 1,
                        nccId = 4,
                        name = "Đồng hồ để bàn chính hãng HAZEAL T1568",
                        amount = 35,
                        price = 2360000,
                        description = "Kim giây đồng hồ được thiết kế như một cối xay gió đầy tinh xảo đó, ta có thể thấy được sức mạnh, nhiệt huyết luôn cuộn chảy không ngừng nghỉ trong những cỗ máy cơ Caballero. Sức mạnh từ tinh thần chiến đấu quả cảm, hết mình hệt như những hiệp sỹ Tây Ban Nha cổ xưa!",
                        img = "/image/sp129.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 130,
                        LSPId = 4,
                        brandId = 4,
                        wireId = 1,
                        machineId = 1,
                        nccId = 4,
                        name = "Đồng hồ để bàn chính hãng HAZEAL T1563",
                        amount = 35,
                        price = 2360000,
                        description = "Kim giây đồng hồ được thiết kế như một cối xay gió đầy tinh xảo đó, ta có thể thấy được sức mạnh, nhiệt huyết luôn cuộn chảy không ngừng nghỉ trong những cỗ máy cơ Caballero. Sức mạnh từ tinh thần chiến đấu quả cảm, hết mình hệt như những hiệp sỹ Tây Ban Nha cổ xưa!",
                        img = "/image/sp130.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 131,
                        LSPId = 4,
                        brandId = 4,
                        wireId = 1,
                        machineId = 1,
                        nccId = 4,
                        name = "Đồng hồ để bàn chính hãng HAZEAL T1570",
                        amount = 33,
                        price = 3750000,
                        description = "Kim giây đồng hồ được thiết kế như một cối xay gió đầy tinh xảo đó, ta có thể thấy được sức mạnh, nhiệt huyết luôn cuộn chảy không ngừng nghỉ trong những cỗ máy cơ Caballero. Sức mạnh từ tinh thần chiến đấu quả cảm, hết mình hệt như những hiệp sỹ Tây Ban Nha cổ xưa!",
                        img = "/image/sp131.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 132,
                        LSPId = 4,
                        brandId = 4,
                        wireId = 1,
                        machineId = 1,
                        nccId = 3,
                        name = "Đồng hồ để bàn chính hãng HAZEAL A6952",
                        amount = 19,
                        price = 3650000,
                        description = "Kim giây đồng hồ được thiết kế như một cối xay gió đầy tinh xảo đó, ta có thể thấy được sức mạnh, nhiệt huyết luôn cuộn chảy không ngừng nghỉ trong những cỗ máy cơ Caballero. Sức mạnh từ tinh thần chiến đấu quả cảm, hết mình hệt như những hiệp sỹ Tây Ban Nha cổ xưa!",
                        img = "/image/sp132.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 133,
                        LSPId = 5,
                        brandId = 6,
                        wireId = 1,
                        machineId = 1,
                        nccId = 3,
                        name = "Đồng hồ trang trí chim công DH31",
                        amount = 25,
                        price = 1450000,
                        description = "NÉT CỔ ĐIỂN HIẾM CÓ: Đúng như tên gọi “Caballero”, Poniger P7.23-1 sở hữu nét đẹp cổ điển hiếm có, phảng phất phong vị xưa cũ. Chất cổ điển, lịch lãm toát lên từ màu sắc, kiểu dáng cũng như những chi tiết nhấn nhá tinh tế.",
                        img = "/image/sp133.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 134,
                        LSPId = 5,
                        brandId = 6,
                        wireId = 1,
                        machineId = 1,
                        nccId = 3,
                        name = "Đồng hồ trang trí nghệ thuật họa tiết Lá DH54",
                        amount = 28,
                        price = 1450000,
                        description = "NÉT CỔ ĐIỂN HIẾM CÓ: Đúng như tên gọi “Caballero”, Poniger P7.23-1 sở hữu nét đẹp cổ điển hiếm có, phảng phất phong vị xưa cũ. Chất cổ điển, lịch lãm toát lên từ màu sắc, kiểu dáng cũng như những chi tiết nhấn nhá tinh tế.",
                        img = "/image/sp134.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 135,
                        LSPId = 5,
                        brandId = 6,
                        wireId = 1,
                        machineId = 1,
                        nccId = 3,
                        name = "Đồng hồ trang trí nghệ thuật họa tiết Lá DH37",
                        amount = 35,
                        price = 1050000,
                        description = "NÉT CỔ ĐIỂN HIẾM CÓ: Đúng như tên gọi “Caballero”, Poniger P7.23-1 sở hữu nét đẹp cổ điển hiếm có, phảng phất phong vị xưa cũ. Chất cổ điển, lịch lãm toát lên từ màu sắc, kiểu dáng cũng như những chi tiết nhấn nhá tinh tế.",
                        img = "/image/sp135.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 136,
                        LSPId = 5,
                        brandId = 6,
                        wireId = 1,
                        machineId = 1,
                        nccId = 3,
                        name = "Đồng hồ trang trí nghệ thuật họa tiết Lá DH53",
                        amount = 25,
                        price = 1400000,
                        description = "NÉT CỔ ĐIỂN HIẾM CÓ: Đúng như tên gọi “Caballero”, Poniger P7.23-1 sở hữu nét đẹp cổ điển hiếm có, phảng phất phong vị xưa cũ. Chất cổ điển, lịch lãm toát lên từ màu sắc, kiểu dáng cũng như những chi tiết nhấn nhá tinh tế.",
                        img = "/image/sp136.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 137,
                        LSPId = 5,
                        brandId = 6,
                        wireId = 1,
                        machineId = 1,
                        nccId = 3,
                        name = "Đồng hồ trang trí chim công DH01",
                        amount = 42,
                        price = 1100000,
                        description = "NÉT CỔ ĐIỂN HIẾM CÓ: Đúng như tên gọi “Caballero”, Poniger P7.23-1 sở hữu nét đẹp cổ điển hiếm có, phảng phất phong vị xưa cũ. Chất cổ điển, lịch lãm toát lên từ màu sắc, kiểu dáng cũng như những chi tiết nhấn nhá tinh tế.",
                        img = "/image/sp137.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 138,
                        LSPId = 5,
                        brandId = 6,
                        wireId = 1,
                        machineId = 1,
                        nccId = 3,
                        name = "Đồng hồ trang trí nghệ thuật DecorDH67",
                        amount = 45,
                        price = 950000,
                        description = "NÉT CỔ ĐIỂN HIẾM CÓ: Đúng như tên gọi “Caballero”, Poniger P7.23-1 sở hữu nét đẹp cổ điển hiếm có, phảng phất phong vị xưa cũ. Chất cổ điển, lịch lãm toát lên từ màu sắc, kiểu dáng cũng như những chi tiết nhấn nhá tinh tế.",
                        img = "/image/sp138.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 139,
                        LSPId = 5,
                        brandId = 6,
                        wireId = 1,
                        machineId = 1,
                        nccId = 3,
                        name = "Đồng hồ trang trí nghệ thuật họa tiết Lá DH43",
                        amount = 40,
                        price = 1350000,
                        description = "NÉT CỔ ĐIỂN HIẾM CÓ: Đúng như tên gọi “Caballero”, Poniger P7.23-1 sở hữu nét đẹp cổ điển hiếm có, phảng phất phong vị xưa cũ. Chất cổ điển, lịch lãm toát lên từ màu sắc, kiểu dáng cũng như những chi tiết nhấn nhá tinh tế.",
                        img = "/image/sp139.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 140,
                        LSPId = 5,
                        brandId = 6,
                        wireId = 1,
                        machineId = 1,
                        nccId = 3,
                        name = "Đồng hồ trang trí nghệ thuật họa tiết Lá DH21",
                        amount = 40,
                        price = 1450000,
                        description = "NÉT CỔ ĐIỂN HIẾM CÓ: Đúng như tên gọi “Caballero”, Poniger P7.23-1 sở hữu nét đẹp cổ điển hiếm có, phảng phất phong vị xưa cũ. Chất cổ điển, lịch lãm toát lên từ màu sắc, kiểu dáng cũng như những chi tiết nhấn nhá tinh tế.",
                        img = "/image/sp140.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 141,
                        LSPId = 5,
                        brandId = 5,
                        wireId = 1,
                        machineId = 1,
                        nccId = 3,
                        name = "Đồng hồ trang trí phu thê viên mãn DH59",
                        amount = 40,
                        price = 2150000,
                        description = "TỔNG THỂ HÀI HÒA: Sự kết hợp tinh tế giữa xanh và trắng, kết hợp vòng benzen đính đá tinh tinh xảo. Viền trắng thép 316L tạo nên mặt đồng hồ đẹp như tạc. THIẾT KẾ KINH ĐIỂN: Đặc biệt bức tranh dãy núi Alpes hùng vĩ, cùng bầu trời cao vút. Tạo nên sức mạnh hùng vĩ từ trời Âu.",
                        img = "/image/sp141.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 142,
                        LSPId = 5,
                        brandId = 5,
                        wireId = 1,
                        machineId = 1,
                        nccId = 3,
                        name = "Đồng hồ trang trí phu thê viên mãn DH60",
                        amount = 43,
                        price = 2150000,
                        description = "TỔNG THỂ HÀI HÒA: Sự kết hợp tinh tế giữa xanh và trắng, kết hợp vòng benzen đính đá tinh tinh xảo. Viền trắng thép 316L tạo nên mặt đồng hồ đẹp như tạc. THIẾT KẾ KINH ĐIỂN: Đặc biệt bức tranh dãy núi Alpes hùng vĩ, cùng bầu trời cao vút. Tạo nên sức mạnh hùng vĩ từ trời Âu.",
                        img = "/image/sp142.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 143,
                        LSPId = 5,
                        brandId = 5,
                        wireId = 1,
                        machineId = 1,
                        nccId = 3,
                        name = "Đồng hồ trang trí phu thê viên mãn DH61",
                        amount = 37,
                        price = 2150000,
                        description = "TỔNG THỂ HÀI HÒA: Sự kết hợp tinh tế giữa xanh và trắng, kết hợp vòng benzen đính đá tinh tinh xảo. Viền trắng thép 316L tạo nên mặt đồng hồ đẹp như tạc. THIẾT KẾ KINH ĐIỂN: Đặc biệt bức tranh dãy núi Alpes hùng vĩ, cùng bầu trời cao vút. Tạo nên sức mạnh hùng vĩ từ trời Âu.",
                        img = "/image/sp143.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 144,
                        LSPId = 5,
                        brandId = 5,
                        wireId = 1,
                        machineId = 1,
                        nccId = 3,
                        name = "Đồng hồ trang trí phu thê viên mãn DH62",
                        amount = 40,
                        price = 2150000,
                        description = "TỔNG THỂ HÀI HÒA: Sự kết hợp tinh tế giữa xanh và trắng, kết hợp vòng benzen đính đá tinh tinh xảo. Viền trắng thép 316L tạo nên mặt đồng hồ đẹp như tạc. THIẾT KẾ KINH ĐIỂN: Đặc biệt bức tranh dãy núi Alpes hùng vĩ, cùng bầu trời cao vút. Tạo nên sức mạnh hùng vĩ từ trời Âu.",
                        img = "/image/sp144.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 145,
                        LSPId = 5,
                        brandId = 5,
                        wireId = 1,
                        machineId = 1,
                        nccId = 3,
                        name = "Đồng hồ trang trí phu thê viên mãn DH63",
                        amount = 50,
                        price = 2150000,
                        description = "TỔNG THỂ HÀI HÒA: Sự kết hợp tinh tế giữa xanh và trắng, kết hợp vòng benzen đính đá tinh tinh xảo. Viền trắng thép 316L tạo nên mặt đồng hồ đẹp như tạc. THIẾT KẾ KINH ĐIỂN: Đặc biệt bức tranh dãy núi Alpes hùng vĩ, cùng bầu trời cao vút. Tạo nên sức mạnh hùng vĩ từ trời Âu.",
                        img = "/image/sp145.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 146,
                        LSPId = 5,
                        brandId = 5,
                        wireId = 1,
                        machineId = 1,
                        nccId = 3,
                        name = "Đồng hồ trang trí phu thê viên mãn DH64",
                        amount = 38,
                        price = 2150000,
                        description = "TỔNG THỂ HÀI HÒA: Sự kết hợp tinh tế giữa xanh và trắng, kết hợp vòng benzen đính đá tinh tinh xảo. Viền trắng thép 316L tạo nên mặt đồng hồ đẹp như tạc. THIẾT KẾ KINH ĐIỂN: Đặc biệt bức tranh dãy núi Alpes hùng vĩ, cùng bầu trời cao vút. Tạo nên sức mạnh hùng vĩ từ trời Âu.",
                        img = "/image/sp146.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 147,
                        LSPId = 5,
                        brandId = 5,
                        wireId = 1,
                        machineId = 1,
                        nccId = 3,
                        name = "Đồng hồ trang trí phu thê viên mãn DH70",
                        amount = 26,
                        price = 2350000,
                        description = "TỔNG THỂ HÀI HÒA: Sự kết hợp tinh tế giữa xanh và trắng, kết hợp vòng benzen đính đá tinh tinh xảo. Viền trắng thép 316L tạo nên mặt đồng hồ đẹp như tạc. THIẾT KẾ KINH ĐIỂN: Đặc biệt bức tranh dãy núi Alpes hùng vĩ, cùng bầu trời cao vút. Tạo nên sức mạnh hùng vĩ từ trời Âu.",
                        img = "/image/sp147.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 148,
                        LSPId = 5,
                        brandId = 5,
                        wireId = 1,
                        machineId = 1,
                        nccId = 3,
                        name = "Đồng hồ trang trí nghệ thuật Deco DH17",
                        amount = 26,
                        price = 1050000,
                        description = "TỔNG THỂ HÀI HÒA: Sự kết hợp tinh tế giữa xanh và trắng, kết hợp vòng benzen đính đá tinh tinh xảo. Viền trắng thép 316L tạo nên mặt đồng hồ đẹp như tạc. THIẾT KẾ KINH ĐIỂN: Đặc biệt bức tranh dãy núi Alpes hùng vĩ, cùng bầu trời cao vút. Tạo nên sức mạnh hùng vĩ từ trời Âu.",
                        img = "/image/sp148.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 149,
                        LSPId = 5,
                        brandId = 5,
                        wireId = 1,
                        machineId = 1,
                        nccId = 3,
                        name = "Đồng hồ trang trí nghệ thuật họa tiết Lá DH23",
                        amount = 35,
                        price = 1550000,
                        description = "TỔNG THỂ HÀI HÒA: Sự kết hợp tinh tế giữa xanh và trắng, kết hợp vòng benzen đính đá tinh tinh xảo. Viền trắng thép 316L tạo nên mặt đồng hồ đẹp như tạc. THIẾT KẾ KINH ĐIỂN: Đặc biệt bức tranh dãy núi Alpes hùng vĩ, cùng bầu trời cao vút. Tạo nên sức mạnh hùng vĩ từ trời Âu.",
                        img = "/image/sp149.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 150,
                        LSPId = 5,
                        brandId = 5,
                        wireId = 1,
                        machineId = 1,
                        nccId = 3,
                        name = "Đồng hồ trang trí nghệ thuật họa tiết Lá DH42",
                        amount = 35,
                        price = 1450000,
                        description = "TỔNG THỂ HÀI HÒA: Sự kết hợp tinh tế giữa xanh và trắng, kết hợp vòng benzen đính đá tinh tinh xảo. Viền trắng thép 316L tạo nên mặt đồng hồ đẹp như tạc. THIẾT KẾ KINH ĐIỂN: Đặc biệt bức tranh dãy núi Alpes hùng vĩ, cùng bầu trời cao vút. Tạo nên sức mạnh hùng vĩ từ trời Âu.",
                        img = "/image/sp150.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 151,
                        LSPId = 5,
                        brandId = 5,
                        wireId = 1,
                        machineId = 1,
                        nccId = 3,
                        name = "Đồng hồ trang trí nghệ thuật họa tiết Lá DH46",
                        amount = 37,
                        price = 1050000,
                        description = "TỔNG THỂ HÀI HÒA: Sự kết hợp tinh tế giữa xanh và trắng, kết hợp vòng benzen đính đá tinh tinh xảo. Viền trắng thép 316L tạo nên mặt đồng hồ đẹp như tạc. THIẾT KẾ KINH ĐIỂN: Đặc biệt bức tranh dãy núi Alpes hùng vĩ, cùng bầu trời cao vút. Tạo nên sức mạnh hùng vĩ từ trời Âu.",
                        img = "/image/sp151.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 152,
                        LSPId = 5,
                        brandId = 5,
                        wireId = 1,
                        machineId = 1,
                        nccId = 3,
                        name = "Đồng hồ trang trí nghệ thuật họa tiết Lá DH27",
                        amount = 31,
                        price = 1200000,
                        description = "TỔNG THỂ HÀI HÒA: Sự kết hợp tinh tế giữa xanh và trắng, kết hợp vòng benzen đính đá tinh tinh xảo. Viền trắng thép 316L tạo nên mặt đồng hồ đẹp như tạc. THIẾT KẾ KINH ĐIỂN: Đặc biệt bức tranh dãy núi Alpes hùng vĩ, cùng bầu trời cao vút. Tạo nên sức mạnh hùng vĩ từ trời Âu.",
                        img = "/image/sp152.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 153,
                        LSPId = 5,
                        brandId = 5,
                        wireId = 1,
                        machineId = 1,
                        nccId = 3,
                        name = "Đồng hồ trang trí nghệ thuật họa tiết Lá DH47",
                        amount = 37,
                        price = 1950000,
                        description = "TỔNG THỂ HÀI HÒA: Sự kết hợp tinh tế giữa xanh và trắng, kết hợp vòng benzen đính đá tinh tinh xảo. Viền trắng thép 316L tạo nên mặt đồng hồ đẹp như tạc. THIẾT KẾ KINH ĐIỂN: Đặc biệt bức tranh dãy núi Alpes hùng vĩ, cùng bầu trời cao vút. Tạo nên sức mạnh hùng vĩ từ trời Âu.",
                        img = "/image/sp153.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 154,
                        LSPId = 5,
                        brandId = 5,
                        wireId = 1,
                        machineId = 1,
                        nccId = 2,
                        name = "Đồng hồ trang trí phu thê viên mãn DH51",
                        amount = 38,
                        price = 1600000,
                        description = "TỔNG THỂ HÀI HÒA: Sự kết hợp tinh tế giữa xanh và trắng, kết hợp vòng benzen đính đá tinh tinh xảo. Viền trắng thép 316L tạo nên mặt đồng hồ đẹp như tạc. THIẾT KẾ KINH ĐIỂN: Đặc biệt bức tranh dãy núi Alpes hùng vĩ, cùng bầu trời cao vút. Tạo nên sức mạnh hùng vĩ từ trời Âu.",
                        img = "/image/sp154.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 155,
                        LSPId = 5,
                        brandId = 5,
                        wireId = 1,
                        machineId = 1,
                        nccId = 2,
                        name = "Đồng hồ trang trí chim công đậu cành mai DH22",
                        amount = 38,
                        price = 1000000,
                        description = "TỔNG THỂ HÀI HÒA: Sự kết hợp tinh tế giữa xanh và trắng, kết hợp vòng benzen đính đá tinh tinh xảo. Viền trắng thép 316L tạo nên mặt đồng hồ đẹp như tạc. THIẾT KẾ KINH ĐIỂN: Đặc biệt bức tranh dãy núi Alpes hùng vĩ, cùng bầu trời cao vút. Tạo nên sức mạnh hùng vĩ từ trời Âu.",
                        img = "/image/sp155.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 156,
                        LSPId = 5,
                        brandId = 5,
                        wireId = 1,
                        machineId = 1,
                        nccId = 2,
                        name = "Đồng hồ trang trí chim đậu cành mai DH24",
                        amount = 30,
                        price = 850000,
                        description = "TỔNG THỂ HÀI HÒA: Sự kết hợp tinh tế giữa xanh và trắng, kết hợp vòng benzen đính đá tinh tinh xảo. Viền trắng thép 316L tạo nên mặt đồng hồ đẹp như tạc. THIẾT KẾ KINH ĐIỂN: Đặc biệt bức tranh dãy núi Alpes hùng vĩ, cùng bầu trời cao vút. Tạo nên sức mạnh hùng vĩ từ trời Âu.",
                        img = "/image/sp156.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 157,
                        LSPId = 5,
                        brandId = 5,
                        wireId = 1,
                        machineId = 1,
                        nccId = 2,
                        name = "Đồng hồ trang trí cây kim tiền DH48",
                        amount = 30,
                        price = 1200000,
                        description = "TỔNG THỂ HÀI HÒA: Sự kết hợp tinh tế giữa xanh và trắng, kết hợp vòng benzen đính đá tinh tinh xảo. Viền trắng thép 316L tạo nên mặt đồng hồ đẹp như tạc. THIẾT KẾ KINH ĐIỂN: Đặc biệt bức tranh dãy núi Alpes hùng vĩ, cùng bầu trời cao vút. Tạo nên sức mạnh hùng vĩ từ trời Âu.",
                        img = "/image/sp157.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 158,
                        LSPId = 5,
                        brandId = 5,
                        wireId = 1,
                        machineId = 1,
                        nccId = 2,
                        name = "Đồng hồ trang trí chim công đậu cành mai DH52",
                        amount = 30,
                        price = 1500000,
                        description = "TỔNG THỂ HÀI HÒA: Sự kết hợp tinh tế giữa xanh và trắng, kết hợp vòng benzen đính đá tinh tinh xảo. Viền trắng thép 316L tạo nên mặt đồng hồ đẹp như tạc. THIẾT KẾ KINH ĐIỂN: Đặc biệt bức tranh dãy núi Alpes hùng vĩ, cùng bầu trời cao vút. Tạo nên sức mạnh hùng vĩ từ trời Âu.",
                        img = "/image/sp158.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 159,
                        LSPId = 5,
                        brandId = 5,
                        wireId = 1,
                        machineId = 1,
                        nccId = 2,
                        name = "Đồng hồ trang trí nghệ thuật Deco DH25",
                        amount = 19,
                        price = 1150000,
                        description = "TỔNG THỂ HÀI HÒA: Sự kết hợp tinh tế giữa xanh và trắng, kết hợp vòng benzen đính đá tinh tinh xảo. Viền trắng thép 316L tạo nên mặt đồng hồ đẹp như tạc. THIẾT KẾ KINH ĐIỂN: Đặc biệt bức tranh dãy núi Alpes hùng vĩ, cùng bầu trời cao vút. Tạo nên sức mạnh hùng vĩ từ trời Âu.",
                        img = "/image/sp159.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 160,
                        LSPId = 5,
                        brandId = 5,
                        wireId = 1,
                        machineId = 1,
                        nccId = 2,
                        name = "Đồng hồ trang trí phu thê viên mãn DH45",
                        amount = 26,
                        price = 1600000,
                        description = "TỔNG THỂ HÀI HÒA: Sự kết hợp tinh tế giữa xanh và trắng, kết hợp vòng benzen đính đá tinh tinh xảo. Viền trắng thép 316L tạo nên mặt đồng hồ đẹp như tạc. THIẾT KẾ KINH ĐIỂN: Đặc biệt bức tranh dãy núi Alpes hùng vĩ, cùng bầu trời cao vút. Tạo nên sức mạnh hùng vĩ từ trời Âu.",
                        img = "/image/sp160.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 161,
                        LSPId = 5,
                        brandId = 5,
                        wireId = 1,
                        machineId = 1,
                        nccId = 2,
                        name = "Đồng hồ trang trí nghệ thuật họa tiết Lá DH26",
                        amount = 26,
                        price = 1250000,
                        description = "TỔNG THỂ HÀI HÒA: Sự kết hợp tinh tế giữa xanh và trắng, kết hợp vòng benzen đính đá tinh tinh xảo. Viền trắng thép 316L tạo nên mặt đồng hồ đẹp như tạc. THIẾT KẾ KINH ĐIỂN: Đặc biệt bức tranh dãy núi Alpes hùng vĩ, cùng bầu trời cao vút. Tạo nên sức mạnh hùng vĩ từ trời Âu.",
                        img = "/image/sp161.jpg",
                        status = 1
                    },
                    new SanPham{
                        // Id = 162,
                        LSPId = 5,
                        brandId = 5,
                        wireId = 1,
                        machineId = 1,
                        nccId = 2,
                        name = "Đồng hồ trang trí bản đồ thế giới DH71",
                        amount = 34,
                        price = 1750000,
                        description = "TỔNG THỂ HÀI HÒA: Sự kết hợp tinh tế giữa xanh và trắng, kết hợp vòng benzen đính đá tinh tinh xảo. Viền trắng thép 316L tạo nên mặt đồng hồ đẹp như tạc. THIẾT KẾ KINH ĐIỂN: Đặc biệt bức tranh dãy núi Alpes hùng vĩ, cùng bầu trời cao vút. Tạo nên sức mạnh hùng vĩ từ trời Âu.",
                        img = "/image/sp162.jpg",
                        status = 1
                    }
                });
                context.SaveChanges();
            }

            if(!context.HoaDons.Any()) 
            {
                context.HoaDons.AddRange(new List<HoaDon>{
                    new HoaDon{
                        // Id = 1,
                        KHuser = "thien",
                        NVuser = "bh01",
                        phone = "0364117408",
                        address = "Bình Định",
                        date_receice = new System.DateTime(2020, 5, 8, 5, 4, 6),
                        date_order = new System.DateTime(2020, 5, 18, 5, 4, 6),
                        total = 9830000,
                        status = 4
                    },
                    new HoaDon{
                        // Id = 2,
                        KHuser = "thinh",
                        NVuser = "bh01",
                        phone = "0364117408",
                        address = "Bình Định",
                        date_receice = new System.DateTime(2020, 5, 8, 5, 4, 6),
                        date_order = new System.DateTime(2020, 5, 18, 5, 4, 6),
                        total = 9830000,
                        status = 3
                    },
                    new HoaDon{
                        // Id = 3,
                        KHuser = "hung",
                        NVuser = "bh01",
                        phone = "0364117408",
                        address = "Hồ Chí Minh",
                        date_receice = new System.DateTime(2020, 5, 8, 5, 4, 6),
                        date_order = new System.DateTime(2020, 5, 18, 5, 4, 6),
                        total = 5280000,
                        status = 2
                    },
                    new HoaDon{
                        // Id = 4,
                        KHuser = "thien405",
                        NVuser = "bh01",
                        phone = "0364117408",
                        address = "Hồ Chí Minh",
                        date_receice = new System.DateTime(2020, 5, 8, 5, 4, 6),
                        date_order = new System.DateTime(2020, 5, 18, 5, 4, 6),
                        total = 5480000,
                        status = 1
                    }
                });
	            context.SaveChanges();
            }
            
            if(!context.ChiTietHDs.Any()){
                context.ChiTietHDs.AddRange(new List<ChiTietHD>{
                    new ChiTietHD{
                        billId = 4,
                        productId = 1,
                        name = "Đồng hồ nam chính hãng LOBINNI L17511-1",
                        amount = 1,
                        price = 5480000,
                        img = "/image/sp1.jpg"
                    },
                    new ChiTietHD{
                        billId = 1,
                        productId = 2,
                        name = "Đồng hồ nam chính hãng LOBINNI L12032-1",
                        amount = 1,
                        price = 4550000,
                        img = "/image/sp2.jpg"
                    },
                    new ChiTietHD{
                        billId = 1,
                        productId = 5,
                        name = "Đồng hồ nam chính hãng LOBINNI L9010-1",
                        amount = 1,
                        price = 5280000,
                        img = "/image/sp3.jpg"
                    },
                    new ChiTietHD{
                        billId = 2,
                        productId = 5,
                        name = "Đồng hồ nam chính hãng LOBINNI L16050-2",
                        amount = 1,
                        price = 4800000,
                        img = "/image/sp4.jpg"
                    },
                    new ChiTietHD{
                        billId = 2,
                        productId = 6,
                        name = "Đồng hồ nam chính hãng LOBINNI L18016-1",
                        amount = 1,
                        price = 4850000,
                        img = "/image/sp5.jpg"
                    },
                    new ChiTietHD{
                        billId = 3,
                        productId = 7,
                        name = "Đồng hồ nam chính hãng LOBINNI L9010-3",
                        amount = 1,
                        price = 5280000,
                        img = "/image/sp6.jpg"
                    }
                });
                context.SaveChanges();
            }
            
            if(!context.PhieuNhaps.Any()){
                context.PhieuNhaps.AddRange(new List<PhieuNhap>{
                    new PhieuNhap{
                        // Id = 1,
	                    nccId =5 ,
                        NVuser = "nh01",
                        phone = "0364117408",
                        address = "Bình Định",
                        date_receice = new System.DateTime(2020, 5, 8, 5, 4, 6),
                        total = 54800000,
                        status = 1
                    },
                    new PhieuNhap{
                        // Id = 2,
	                    nccId = 2,
                        NVuser = "nh01",
                        phone = "0364117408",
                        address = "Hồ Chí Minh",
                        date_receice = new System.DateTime(2020, 5, 8, 5, 4, 6),
                        total = 45500000,
                        status = 1
                    },
                    new PhieuNhap{
                        // Id = 3,
	                    nccId =3 ,
                        NVuser = "nh01",
                        phone = "0364117408",
                        address = "Hồ Chí Minh",
                        date_receice = new System.DateTime(2020, 5, 8, 5, 4, 6),
                        total = 52800000,
                        status = 1
                    },
                    new PhieuNhap{
                        // Id = 4,
	                    nccId =4 ,
                        NVuser = "ql01",
                        phone = "0364117408",
                        address = "Hồ Chí Minh",
                        date_receice = new System.DateTime(2020, 5, 8, 5, 4, 6),
                        total = 4800000,
                        status = 1
                    }
                });
                context.SaveChanges();
            }
            
            if(!context.ChiTietPNs.Any()){
                context.ChiTietPNs.AddRange(new List<ChiTietPN>{
                    new ChiTietPN{
                        couponId = 1,
                        productId = 1,
                        name = "Đồng hồ nam chính hãng LOBINNI L17511-1",
                        amount = 10,
                        price = 5480000,
                        img = "/image/sp1.jpg"
                    },
                    new ChiTietPN{
                        couponId = 2,
                        productId = 1,
                        name = "Đồng hồ nam chính hãng LOBINNI L12032-1",
                        amount = 10,
                        price = 4550000,
                        img = "/image/sp2.jpg"
                    },
                    new ChiTietPN{
                        couponId = 3,
                        productId = 1,
                        name = "Đồng hồ nam chính hãng LOBINNI L9010-1",
                        amount = 10,
                        price = 5280000,
                        img = "/image/sp3.jpg"
                    },
                    new ChiTietPN{
                        couponId = 4,
                        productId = 1,
                        name = "Đồng hồ nam chính hãng LOBINNI L16050-2",
                        amount = 10,
                        price = 4800000,
                        img = "/image/sp4.jpg"
                    }
                });
                context.SaveChanges();
            }
            
        }
    }
}