using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StoreApi.Models
{
    public class ThuongHieuDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Tên thương hiệu là bắt Buộc")]
        [StringLength(maximumLength:200, MinimumLength = 3, ErrorMessage = "Tên thương hiệu từ 3 đến 200 kí tự")]
        public string name { get; set; }
    }
}