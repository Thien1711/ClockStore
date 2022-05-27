using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
namespace StoreApi.DTOs
{
    public class DonHangDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Trạng thái là bắt buộc")]
        public int status { get; set;}
    }
}