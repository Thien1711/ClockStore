using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreApi.Models;

namespace StoreApi.Interfaces
{
    public interface INhanVienRepository
    {
        NhanVien NhanVien_Add(NhanVien sp); 
        NhanVien NhanVien_GetByUser(string user); 
        IEnumerable<NhanVien> NhanVien_GetAll();
        NhanVien NhanVien_Update(NhanVien NV); 
        IEnumerable<NhanVien> NhanVien_FilterAdmin(string search, string sort, int pageIndex, int pageSize, out int count);
    }
}