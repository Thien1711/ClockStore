using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreApi.Interfaces;
using StoreApi.Models;

namespace StoreApi.Repositories
{
    public class KhachHangRepository : IKhachHangRepository
    {
        private readonly ClockStoreDBContext context;
        public KhachHangRepository(ClockStoreDBContext context) {
            this.context = context;
        }
        public KhachHang KhachHang_Add(KhachHang kh)
        {
            context.KhachHangs.Add(kh);
            context.SaveChanges();
            return kh;
        }

        public KhachHang KhachHang_GetByUser(string user)
        {
            return context.KhachHangs.FirstOrDefault(u => u.user == user);
        }

        public IEnumerable<KhachHang> KhachHang_GetAll()
        {
            return context.KhachHangs.ToList();
        }

        public KhachHang KhachHang_Update(KhachHang kh)
        {
            context.KhachHangs.Update(kh);
            context.SaveChanges();
            return kh;
        }

        public void KhachHang_Delete(KhachHang kh)
        {
            context.KhachHangs.Remove(kh);
            context.SaveChanges();
        }

        public IEnumerable<KhachHang> KhachHang_FilterAdmin(string search, string sort, int pageIndex, int pageSize, out int count) {
            var query = context.KhachHangs.AsQueryable();
            
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