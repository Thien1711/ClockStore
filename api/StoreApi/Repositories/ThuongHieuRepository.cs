using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreApi.Interfaces;
using StoreApi.Models;

namespace StoreApi.Repositories
{
    public class ThuongHieuRepository : IThuongHieuRepository
    {
        private readonly ClockStoreDBContext context;
        public ThuongHieuRepository(ClockStoreDBContext context) {
            this.context = context;
        }
        public ThuongHieu ThuongHieu_Add(ThuongHieu sp)
        {
            context.ThuongHieus.Add(sp);
            context.SaveChanges();
            return sp;
        }

        public ThuongHieu ThuongHieu_GetById(int id)
        {
            // context.ThuongHieus.
            return context.ThuongHieus.FirstOrDefault(o => o.Id == id);
        }

        public IEnumerable<ThuongHieu> ThuongHieu_GetAll()
        {
            return context.ThuongHieus.ToList();
        }

        public ThuongHieu ThuongHieu_Update(ThuongHieu SP)
        {
            context.ThuongHieus.Update(SP);
            context.SaveChanges();
            return SP;
        }

        public void ThuongHieu_Delete(ThuongHieu SP)
        {
            context.ThuongHieus.Remove(SP);
            context.SaveChanges();
        }

        public IEnumerable<ThuongHieu> ThuongHieu_FilterAdmin(string search, string sort, int pageIndex, int pageSize, out int count) {
            var query = context.ThuongHieus.AsQueryable();
            
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