using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreApi.Models;

namespace StoreApi.DTOs
{
    public class ViewProductPageDto
    {
        public SanPham product { get; set; }
        public IEnumerable<SanPham> ListRelationship { get; set; }
    }
}