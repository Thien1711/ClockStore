using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StoreApi.Models
{
    public class Quyen
    {
        public int Id { get; set;}

        [Required(ErrorMessage = "Tên quyền bắt buộc")]
        [StringLength(maximumLength:200, MinimumLength = 3, ErrorMessage = "Tên quyền từ 3 đến 200 kí tự")]
        public string name { get; set; }

        [Required(ErrorMessage = "Chi tiết quyền bắt buộc")]
        public string details { get; set; }

        [System.Text.Json.Serialization.JsonIgnore]
        public ICollection<NhanVien> NhanViens { get; set; }

        public Quyen() {
            NhanViens = new HashSet<NhanVien>();
        }
    }
}