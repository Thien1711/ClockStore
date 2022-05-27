using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreApi.Models;

namespace StoreApi.Interfaces
{
    public interface IQuyenRepository
    {
        Quyen Quyen_Add(Quyen q); 
        Quyen Quyen_GetById(int id); 
        IEnumerable<Quyen> Quyen_GetAll();
        Quyen Quyen_Update(Quyen NV); 
        void Quyen_Delete(Quyen NV); 
        IEnumerable<Quyen> Quyen_FilterAdmin(string search, string sort, int pageIndex, int pageSize, out int count);
        Boolean Quyen_CheckQuyenUser(int Id, string quyen);
    }
}