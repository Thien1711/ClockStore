using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreApi.Models;

namespace StoreApi.Interfaces
{
    public interface ISanPhamRepository
    {
        SanPham SanPham_Add(SanPham sp); 
        SanPham SanPham_GetById(int id); 
        IEnumerable<SanPham> SanPham_GetAll();
        SanPham SanPham_Update(SanPham NV); 
        void SanPham_Delete(SanPham NV); 
        IEnumerable<SanPham> SanPham_FilterAdmin(string search, string sort, int pageIndex, int pageSize, out int count);
        IEnumerable<SanPham> SanPham_FilterProductShop(int lspId, int branchId, int machineId, int wireId, int priceFrom, int priceTo, string search, string sort, int pageIndex, int pageSize, out int count);
        IEnumerable<SanPham> SanPham_GetByLSPId(int lspId, int pageSize);
        IEnumerable<SanPham> SanPham_ListCart(string list);
        IEnumerable<SanPham> SanPham_LoadByListIdSP(List<int> listId);
        void SanPham_UpdateRand(List<SanPham> list);
    }
}   