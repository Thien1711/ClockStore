using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreApi.Models;
namespace StoreApi.Interfaces
{
   public interface ILoaiSanPhamRepository
    {
        LoaiSanPham LoaiSanPham_Add(LoaiSanPham lsp); 
        LoaiSanPham LoaiSanPham_GetById(int id); 
        IEnumerable<LoaiSanPham> LoaiSanPham_GetAll();
        LoaiSanPham LoaiSanPham_Update(LoaiSanPham lsp); 
        void LoaiSanPham_Delete(LoaiSanPham lsp); 
        IEnumerable<LoaiSanPham> LoaiSanPham_FilterAdmin(string search, string sort, int pageIndex, int pageSize, out int count);
    }
}