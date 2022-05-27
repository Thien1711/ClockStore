using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreApi.Models;
namespace StoreApi.Interfaces
{
    public interface IDonHangRepository
    {
        DonHang DonHang_Add(DonHang hd); 
        DonHang DonHang_GetById(int id); 
        IEnumerable<DonHang> DonHang_GetAll();
        DonHang DonHang_Update(DonHang hd); 
        void DonHang_Delete(DonHang hd); 
        IEnumerable<DonHang> DonHang_FilterAdmin(string search, int status, int pageIndex, int pageSize, out int count);
        IEnumerable<DonHang> DonHang_GetByUserKH(string user, int pageIndex, int pageSize, out int count);
        IEnumerable<DonHang> DonHang_GetByUserNV(string user);
        Boolean DonHang_CheckUserKHAndId(int Id, string user);
        IEnumerable<DonHang> DonHang_FilterBeginEndInYear(int begin, int end);
        IEnumerable<DonHang> DonHang_FilterBeginEndInMonth(int year, int begin, int end);
    }
}