using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoreApi.DTOs
{
    public class FilterPhieuNhapDto
    {
        public string search { get; set; }
        public int pageIndex { get; set; }
        public int status { get; set; }
    }
}