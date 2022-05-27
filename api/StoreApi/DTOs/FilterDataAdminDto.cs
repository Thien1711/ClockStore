using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoreApi.DTOs
{
    public class FilterDataAdminDto
    {
        public string search { get; set; }
        public int pageIndex { get; set; }
        public string sort { get; set; }
    }
}