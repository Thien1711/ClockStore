using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StoreApi.Models
{
    public class KieuDay
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Tên Kiểu Dây là bắt Buộc")]
        [StringLength(maximumLength:200, MinimumLength = 3, ErrorMessage = "Tên kiểu dây từ 3 đến 200 kí tự")]
        public string name { get; set; }
        [System.Text.Json.Serialization.JsonIgnore]
        public ICollection<SanPham> SanPhams { get; set; }
        public KieuDay() {
            SanPhams = new HashSet<SanPham>();
        }
    }
}