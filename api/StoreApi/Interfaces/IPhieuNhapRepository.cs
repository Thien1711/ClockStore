using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreApi.Models;

namespace StoreApi.Interfaces
{
    public interface IPhieuNhapRepository
    {
        PhieuNhap PhieuNhap_Add(PhieuNhap pn); 
        PhieuNhap PhieuNhap_GetById(int id); 
        IEnumerable<PhieuNhap> PhieuNhap_GetAll();
        PhieuNhap PhieuNhap_Update(PhieuNhap NV); 
        void PhieuNhap_Delete(PhieuNhap NV); 
        IEnumerable<PhieuNhap> PhieuNhap_FilterAdmin(string search, string sort, int pageIndex, int pageSize, out int count);
    }
}