using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreApi.Models;

namespace StoreApi.Interfaces
{
    public interface IKieuMayRepository
    {
        KieuMay KieuMay_Add(KieuMay km); 
        KieuMay KieuMay_GetById(int id); 
        IEnumerable<KieuMay> KieuMay_GetAll();
        KieuMay KieuMay_Update(KieuMay NV); 
        void KieuMay_Delete(KieuMay NV); 
        IEnumerable<KieuMay> KieuMay_FilterAdmin(string search, string sort, int pageIndex, int pageSize, out int count);
    }
}