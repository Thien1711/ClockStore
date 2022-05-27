using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreApi.Models;

namespace StoreApi.DTOs
{
    public class ViewCartDto
    {
        public IEnumerable<SanPham> ListSP { get; set; }
        public long total { get; set; }
        public int amount { get; set; }
    }
}