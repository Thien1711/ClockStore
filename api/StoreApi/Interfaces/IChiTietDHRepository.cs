using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreApi.Models;
namespace StoreApi.Interfaces
{
    public interface IChiTietDHRepository
    {
        ChiTietDH ChiTietDH_Add(ChiTietDH hd); 
        // ChiTietDH ChiTietDH_GetById(int id); 
        IEnumerable<ChiTietDH> ChiTietDH_GetAll();
        IEnumerable<ChiTietDH> ChiTietDH_GetByBillId(int billId);
        ChiTietDH ChiTietDH_Update(ChiTietDH hd); 
        void ChiTietDH_Delete(ChiTietDH hd); 
        IEnumerable<ChiTietDH> ChiTietDH_FilterAdmin(string search, string sort, int pageIndex, int pageSize, out int count);
        IEnumerable<ChiTietDH> ChiTietDH_AddRange(IEnumerable<ChiTietDH> list);
        // void ChiTietDH_AddRangeWithListSP(IEnumerable<SanPham> list, int billId);
        IEnumerable<ChiTietDH> ChiTietDH_GetByListBill(List<int> list);
    }
}