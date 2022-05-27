using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StoreApi.DTOs
{
    public class FilterBeginEndTheoNamDto
    {
        [Required(ErrorMessage = "Năm bắt đầu là bắt buộc")]
        public int begin { get; set; }
        [Required(ErrorMessage = "Năm kết thúc là bắt buộc")]
        public int end { get; set; }
    }
}