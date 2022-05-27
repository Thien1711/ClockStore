using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreApi.Models;

namespace StoreApi.Interfaces
{
    public interface IThuongHieuRepository
    {
        ThuongHieu ThuongHieu_Add(ThuongHieu th); 
        ThuongHieu ThuongHieu_GetById(int id); 
        IEnumerable<ThuongHieu> ThuongHieu_GetAll();
        ThuongHieu ThuongHieu_Update(ThuongHieu TH); 
        void ThuongHieu_Delete(ThuongHieu TH); 
        IEnumerable<ThuongHieu> ThuongHieu_FilterAdmin(string search, string sort, int pageIndex, int pageSize, out int count);
    }
}