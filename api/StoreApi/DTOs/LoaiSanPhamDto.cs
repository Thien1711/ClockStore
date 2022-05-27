using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StoreApi.DTOs
{
    public class LoaiSanPhamDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Tên Loại Sản Phẩm là bắt Buộc")]
        [StringLength(maximumLength:200, MinimumLength = 3, ErrorMessage = "Tên Loại Sản Phẩm từ 3 đến 200 kí tự")]
        public string name { get; set; }

        [Required(ErrorMessage = "Mô tả Loại Sản Phẩm là bắt Buộc")]
        public string description { get; set; }
    }
}