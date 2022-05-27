using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoreApi.DTOs
{
    public class FilterProductsShopDto
    {
        public int lspId { get; set; }
        public int branchId { get; set; }
        public int machineId { get; set; }
        public int wireId { get; set; }
        public int priceFrom { get; set; }
        public int priceTo { get; set; }
        public string search { get; set; }
        public string sort { get; set; }
        public int pageIndex { get; set; }
    }
}