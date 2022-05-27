using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreApi.Models;

namespace StoreApi.Interfaces
{
    public interface IKhachHangRepository
    {
        KhachHang KhachHang_Add(KhachHang kh); 
        KhachHang KhachHang_GetByUser(string user); 
        IEnumerable<KhachHang> KhachHang_GetAll();
        KhachHang KhachHang_Update(KhachHang NV); 
        void KhachHang_Delete(KhachHang NV); 
        IEnumerable<KhachHang> KhachHang_FilterAdmin(string search, string sort, int pageIndex, int pageSize, out int count);
    }
}