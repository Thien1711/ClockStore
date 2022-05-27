using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreApi.Interfaces;
using StoreApi.Models;
namespace StoreApi.Repositories
{
    public class KieuDayRepository : IKieuDayRepository
    {
        private readonly ClockStoreDBContext context;
        public KieuDayRepository(ClockStoreDBContext context) {
            this.context = context;
        }
        public KieuDay KieuDay_Add(KieuDay kd)
        {
            context.KieuDays.Add(kd);
            context.SaveChanges();
            return kd;
        }

        public KieuDay KieuDay_GetById(int id)
        {
            // context.KieuDays.
            return context.KieuDays.FirstOrDefault(o => o.Id == id);
        }

        public IEnumerable<KieuDay> KieuDay_GetAll()
        {
            return context.KieuDays.ToList();
        }

        public KieuDay KieuDay_Update(KieuDay kd)
        {
            context.KieuDays.Update(kd);
            context.SaveChanges();
            return kd;
        }

        public void KieuDay_Delete(KieuDay kd)
        {
            context.KieuDays.Remove(kd);
            context.SaveChanges();
        }

        public IEnumerable<KieuDay> KieuDay_FilterAdmin(string search, string sort, int pageIndex, int pageSize, out int count) {
            var query = context.KieuDays.AsQueryable();
            
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