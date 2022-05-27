using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StoreApi.DTOs
{
    public class FilterBeginEndTheoThangDto
    {
        [Required(ErrorMessage = "Năm là bắt buộc")]
        public int year { get; set; }
        [Required(ErrorMessage = "Tháng bắt đầu là bắt buộc")]
        public int begin { get; set; }
        [Required(ErrorMessage = "Tháng kết thúc là bắt buộc")]
        public int end { get; set; }
    }
}