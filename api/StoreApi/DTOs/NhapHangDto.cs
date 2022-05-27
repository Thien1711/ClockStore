using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StoreApi.DTOs
{
    public class NhapHangDto
    {
        public string user { get; set; }

        [Required(ErrorMessage = "Số điện thoại người cung cấp là bắt buộc")]
        [RegularExpression(pattern: @"^(09|03|07|08|05)+([0-9]{8})")]
        [StringLength(10, ErrorMessage = "Số điện thoại người cung cấp có 10 kí tự")] 
        public string phone {get; set;}

        [Required(ErrorMessage = "Tên người cung cấp là bắt buộc")]
        public string nameNCC { get; set; }

        [Required(ErrorMessage = "Thư điện tử người cung cấp là bắt buộc")]
        [EmailAddress(ErrorMessage = "Thư điện tử người cung cấp không phù hợp")]
        public string mail{get; set;}

        [Required(ErrorMessage = "Địa chỉ người cung cấp là bắt buộc")]
        public string address { get; set; }

        [RegularExpression(pattern: @"^(\d{1,}-\d{1,}-\d{1,}&){1,}$")]
        public string listSP { get; set; }
    }
}