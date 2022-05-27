using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StoreApi.Models
{
    public class DonHang
    {
        public int Id {get; set;}

        [Required(ErrorMessage = "Mã khách hàng là bắt buộc")]
        [StringLength(maximumLength:25, MinimumLength = 3, ErrorMessage = "Mã khách hàng từ 3 đến 25 kí tự")]
        [RegularExpression(pattern: @"^[a-zA-Z][\w]{1,}", ErrorMessage="Mã khách hàng phải bắt đầu bằng chữ")]
        public string KHuser {get; set;}
        
        public string NVuser { get; set;}

        [Required(ErrorMessage = "Số điện thoại là bắt buộc")]
        [RegularExpression(pattern: @"^(09|03|07|08|05)+([0-9]{8})")]
        [StringLength(10, ErrorMessage = "Số điện thoại có 10 kí tự")] 
        public string phone{get; set;}

        [Required(ErrorMessage = "Địa chỉ là bắt buộc")]
        public string address { get; set; }

        [DataType(DataType.Date)]
        public DateTime? date_receice{get; set;}

        [Required(ErrorMessage = "Ngày đặt là bắt buộc")]
        [DataType(DataType.Date)]
        public DateTime date_order{get; set;}

        [Required(ErrorMessage = "Tổng là bắt buộc")]
        public long total { get; set;}

        [Required(ErrorMessage = "Trạng thái là bắt buộc")]
        public int status { get; set;}
        public virtual KhachHang KH { get; set;}
        public virtual NhanVien NV { get; set; }
        [System.Text.Json.Serialization.JsonIgnore]
        public ICollection<ChiTietDH> chitietDHs {get; set;}

        public DonHang (){
            total = 0;
            status = 1;
            this.chitietDHs = new HashSet<ChiTietDH>();
        }
    }
}