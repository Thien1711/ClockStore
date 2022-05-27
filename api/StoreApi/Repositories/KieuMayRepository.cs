using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreApi.Interfaces;
using StoreApi.Models;

namespace StoreApi.Repositories
{
    public class KieuMayRepository : IKieuMayRepository
    {
        private readonly ClockStoreDBContext context;
        public KieuMayRepository(ClockStoreDBContext context) {
            this.context = context;
        }
        public KieuMay KieuMay_Add(KieuMay sp)
        {
            context.KieuMays.Add(sp);
            context.SaveChanges();
            return sp;
        }

        public KieuMay KieuMay_GetById(int id)
        {
            // context.KieuMays.
            return context.KieuMays.FirstOrDefault(o => o.Id == id);
        }

        public IEnumerable<KieuMay> KieuMay_GetAll()
        {
            return context.KieuMays.ToList();
        }

        public KieuMay KieuMay_Update(KieuMay SP)
        {
            context.KieuMays.Update(SP);
            context.SaveChanges();
            return SP;
        }

        public void KieuMay_Delete(KieuMay SP)
        {
            context.KieuMays.Remove(SP);
            context.SaveChanges();
        }

        public IEnumerable<KieuMay> KieuMay_FilterAdmin(string search, string sort, int pageIndex, int pageSize, out int count) {
            var query = context.KieuMays.AsQueryable();
            
            if(!string.IsNullOrEmpty(search)) {
                search = search.ToLower();
                query = query.Where(m => m.name.ToLower().Contains(search));
            }

            count = query.Count();
            if(!string.IsNullOrEmpty(sort)){
                switch(sort){
                    case "name-asc": query = query.OrderBy(m => m.name);
                                    break;
                    case "name-desc": query = query.OrderByDescending(m => m.name);
                                    break;
                    case "id-asc": query = query.OrderBy(m => m.Id);
                                    break;
                    case "id-desc": query = query.OrderByDescending(m => m.Id);
                                    break;
                    default: break;
                }
            }

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