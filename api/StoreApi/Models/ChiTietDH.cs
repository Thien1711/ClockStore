using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace StoreApi.Models
{
    public class ChiTietDH
    {
        [Key]
        [Required(ErrorMessage = "Mã hóa đơn là bắt buộc")]
        public int billId{get; set;}

        [Key]
        [Required(ErrorMessage = "Mã sản phẩm là bắt buộc")]
        public int productId{get; set;}

        [Required(ErrorMessage = "Tên sản phẩm là bắt buộc")]
        public string name {get; set;}

        [Required(ErrorMessage = "Số lượng sản phẩm là bắt buộc")]
        public int amount { get; set;}

        [Required(ErrorMessage = "Đơn giá là bắt buộc")]
        public long price { get; set;}
        
        [Required(ErrorMessage = "Hình ảnh là bắt buộc")]
        public string img { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual DonHang bill { get; set;}
        
        public virtual SanPham product { get; set; }
    }
}