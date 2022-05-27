using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StoreApi.Models
{
    public class PhieuNhapDto
    {
        public int Id { get; set; }

        // [Required(ErrorMessage = "Mã nhà cung cấp là bắt buộc")]
        // public int nccId { get; set; }

        // [Required(ErrorMessage = "Mã nhân viên bắt buộc")]

        // public string NVuser { get; set; }

        // [Required(ErrorMessage = "Số điện thoại là bắt buộc")]

        // public string phone{get; set;}

        // [Required(ErrorMessage = "Địa chỉ là bắt buộc")]
        // public string address { get; set; }

        // [Required(ErrorMessage = "Ngày nhập là bắt buộc")]
        // [DataType(DataType.Date)]
        // public DateTime date_receice{get; set;}

        // [Required(ErrorMessage = "Tổng là bắt buộc")]
        // public long total { get; set;}

        [Required(ErrorMessage = "Trạng thái là bắt buộc")]
        public int status { get; set;}

    }
}