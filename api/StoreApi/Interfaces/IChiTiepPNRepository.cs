using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreApi.Models;
namespace StoreApi.Interfaces
{
    public interface IChiTietPNRepository
    {
        ChiTietPN ChiTietPN_Add(ChiTietPN pn); 
        // ChiTietPN ChiTietPN_GetById(int id); 
        IEnumerable<ChiTietPN> ChiTietPN_GetAll();
        IEnumerable<ChiTietPN> ChiTietPN_GetByCouponId(int couponId);
        ChiTietPN ChiTietPN_Update(ChiTietPN pn); 
        void ChiTietPN_Delete(ChiTietPN pn); 
        IEnumerable<ChiTietPN> ChiTietPN_FilterAdmin(string search, string sort, int pageIndex, int pageSize, out int count);
        IEnumerable<ChiTietPN> ChiTietPN_AddRange(IEnumerable<ChiTietPN> list);
        // void ChiTietPN_AddRangeWithListSP(IEnumerable<SanPham> list, int couponId);
    }
}