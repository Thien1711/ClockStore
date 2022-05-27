using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StoreApi.DTOs
{
    public class CartDto
    {
        [Required(ErrorMessage = "Đơn hàng là bắt buộc")]
        [RegularExpression(pattern: @"^(\d{1,}-\d{1,}&){1,}$", ErrorMessage="Giới tính là Nam hoặc Nữ")]
        public string donhang { get; set; }
        [Required(ErrorMessage = "Địa chỉ là bắt buộc")]
        public string address { get; set; } 
    }
}