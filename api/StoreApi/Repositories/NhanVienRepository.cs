using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreApi.Interfaces;
using StoreApi.Models;

namespace StoreApi.Repositories
{
    public class NhanVienRepository : INhanVienRepository
    {
        private readonly ClockStoreDBContext context;
        public NhanVienRepository(ClockStoreDBContext context) {
            this.context = context;
        }
        public NhanVien NhanVien_Add(NhanVien NV)
        {
            context.NhanViens.Add(NV);
            context.SaveChanges();
            return NV;
        }

        public IEnumerable<NhanVien> NhanVien_GetAll()
        {
            return context.NhanViens.ToList();
        }

        public NhanVien NhanVien_GetByUser(string user)
        {
            return context.NhanViens.FirstOrDefault(u => u.user == user);
        }

        public NhanVien NhanVien_Update(NhanVien NV)
        {
            context.NhanViens.Update(NV);
            context.SaveChanges();
            return NV;
        }

        public IEnumerable<NhanVien> NhanVien_FilterAdmin(string search, string sort, int pageIndex, int pageSize, out int count) {
            var query = context.NhanViens.AsQueryable();
            
            if(!string.IsNullOrEmpty(search)) {
                search = search.ToLower();
                query = query.Where(m => (m.name.ToLower().Contains(search)) 
                    || (m.user.ToLower().Contains(search))
                    || (m.phone.Contains(search)));
            }

            count = query.Count();
            if(!string.IsNullOrEmpty(sort)){
                switch(sort){
                    case "name-asc": query = query.OrderBy(m => m.name);
                                    break;
                    case "name-desc": query = query.OrderByDescending(m => m.name);
                                    break;
                    case "user-asc": query = query.OrderBy(m => m.user);
                                    break;
                    case "user-desc": query = query.OrderByDescending(m => m.user);
                                    break;
                    case "gender-asc": query = query.OrderBy(m => m.gender);
                                    break;
                    case "gender-desc": query = query.OrderByDescending(m => m.gender);
                                    break;
                    case "dateborn-asc": query = query.OrderBy(m => m.dateborn);
                                    break;
                    case "dateborn-desc": query = query.OrderByDescending(m => m.dateborn);
                                    break;
                    case "status-asc": query = query.OrderBy(m => m.status);
                                    break;
                    case "status-desc": query = query.OrderByDescending(m => m.status);
                                    break;
                    default: query = query.OrderBy(m => m.name);
                            break;
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