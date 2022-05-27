using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreApi.Models;

namespace StoreApi.DTOs
{
    public class ListSPHomePage
    {
        public LoaiSanPham LSP { get; set; }
        public IEnumerable<SanPham> listSP { get; set; }
    }
}