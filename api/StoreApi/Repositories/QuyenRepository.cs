using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreApi.Interfaces;
using StoreApi.Models;

namespace StoreApi.Repositories
{
    public class QuyenRepository : IQuyenRepository
    {
        private readonly ClockStoreDBContext context;
        public QuyenRepository(ClockStoreDBContext context) {
            this.context = context;
        }
        public Quyen Quyen_Add(Quyen sp)
        {
            context.Quyens.Add(sp);
            context.SaveChanges();
            return sp;
        }

        public Quyen Quyen_GetById(int id)
        {
            // context.Quyens.
            return context.Quyens.FirstOrDefault(o => o.Id == id);
        }

        public IEnumerable<Quyen> Quyen_GetAll()
        {
            return context.Quyens.ToList();
        }

        public Quyen Quyen_Update(Quyen SP)
        {
            context.Quyens.Update(SP);
            context.SaveChanges();
            return SP;
        }

        public void Quyen_Delete(Quyen SP)
        {
            context.Quyens.Remove(SP);
            context.SaveChanges();
        }

        public Boolean Quyen_CheckQuyenUser(int Id, string quyen) {
            quyen = quyen.ToLower();
            var res = context.Quyens.FirstOrDefault(m => ((m.Id == Id) && (m.details.Contains(quyen))));
            
            return (res != null);
        }

        public IEnumerable<Quyen> Quyen_FilterAdmin(string search, string sort, int pageIndex, int pageSize, out int count) {
            var query = context.Quyens.AsQueryable();
            
            if(!string.IsNullOrEmpty(search)) {
                search = search.ToLower();
                query = query.Where(m => (m.name.ToLower().Contains(search)) || (m.details.Contains(search)));
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