using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace StoreApi.DTOs
{
    public class SanPhamAddDto
    {
        [Required(ErrorMessage = "Loại sản phẩm là bắt Buộc")]
        public int LSPId { get; set; }

        [Required(ErrorMessage = "Thương hiệu là bắt Buộc")]
        public int brandId{ get; set; }

        [Required(ErrorMessage = "Kiểu dây là bắt Buộc")]
        public int wireId{ get; set; }

        [Required(ErrorMessage = "Kiểu máy là bắt Buộc")]
        public int machineId{ get; set; }

        [Required(ErrorMessage = "Tên Sản Phẩm là bắt Buộc")]
        [StringLength(maximumLength:200, MinimumLength = 3, ErrorMessage = "Tên Sản Phẩm từ 3 đến 200 kí tự")]
        public string name { get; set; }
        public int price{ get; set; }

        [Required(ErrorMessage = "Mô tả Sản Phẩm là bắt Buộc")]
        public string description { get; set; }

        [Required(ErrorMessage = "Hình ảnh là bắt Buộc")]
        public string img { get; set; }

        [Required(ErrorMessage = "File hình là bắt buộc")]
        public IFormFile imgFile { get; set; }
    }
}