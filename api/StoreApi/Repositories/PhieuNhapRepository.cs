using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreApi.Interfaces;
using StoreApi.Models;

namespace StoreApi.Repositories
{
    public class PhieuNhapRepository : IPhieuNhapRepository
    {
        private readonly ClockStoreDBContext context;
        public PhieuNhapRepository(ClockStoreDBContext context) {
            this.context = context;
        }
        public PhieuNhap PhieuNhap_Add(PhieuNhap sp)
        {
            context.PhieuNhaps.Add(sp);
            context.SaveChanges();
            return sp;
        }

        public PhieuNhap PhieuNhap_GetById(int id)
        {
            // context.PhieuNhaps.
            return context.PhieuNhaps.FirstOrDefault(o => o.Id == id);
        }

        public IEnumerable<PhieuNhap> PhieuNhap_GetAll()
        {
            return context.PhieuNhaps.ToList();
        }

        public PhieuNhap PhieuNhap_Update(PhieuNhap SP)
        {
            context.PhieuNhaps.Update(SP);
            context.SaveChanges();
            return SP;
        }

        public void PhieuNhap_Delete(PhieuNhap SP)
        {
            context.PhieuNhaps.Remove(SP);
            context.SaveChanges();
        }

        public IEnumerable<PhieuNhap> PhieuNhap_FilterAdmin(string search, string sort, int pageIndex, int pageSize, out int count) {
            var query = context.PhieuNhaps.AsQueryable();
            
            if(!string.IsNullOrEmpty(search)) {
                search = search.ToLower();
                query = query.Where(m => m.NVuser.ToLower().Contains(search) || (m.mail.ToLower().Contains(search)) 
                || (m.nameNCC.ToLower().Contains(search)) || (m.phone.Contains(search)));
            }

            // if(status > 0) {
            //     query = query.Where(m => m.status == status);
            // }

            if(!string.IsNullOrEmpty(sort)){
                switch(sort){
                    case "date-asc": query = query.OrderBy(m => m.date_receice);
                                    break;
                    case "date-desc": query = query.OrderByDescending(m => m.date_receice);
                                    break;
                    default: query = query.OrderByDescending(m => m.date_receice);
                            break;
                }
            }

            count = query.Count();
            // if(!string.IsNullOrEmpty(sort)){
            //     switch(sort){
            //         case "address-asc": query = query.OrderBy(m => m.address);
            //                         break;
            //         case "address-desc": query = query.OrderByDescending(m => m.address);
            //                         break;
            //         default: break;
            //     }
            // }

            int TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            // if(pageIndex > TotalPages){
            //     pageIndex = TotalPages;
            // }
            if(pageIndex < 1){
                pageIndex = 1;
            }

            return query.Skip((pageIndex - 1) * pageSize)
                        .Take(pageSize).ToList();
        }
    }
}