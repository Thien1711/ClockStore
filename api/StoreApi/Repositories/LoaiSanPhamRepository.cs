using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreApi.Interfaces;
using StoreApi.Models;

namespace StoreApi.Repositories
{
    
    public class LoaiSanPhamRepository : ILoaiSanPhamRepository
    {
        private readonly ClockStoreDBContext context;
        public LoaiSanPhamRepository(ClockStoreDBContext context) {
            this.context = context;
        }
        public LoaiSanPham LoaiSanPham_Add(LoaiSanPham lsp)
        {
            context.LoaiSanPhams.Add(lsp);
            context.SaveChanges();
            return lsp;
        }

        public LoaiSanPham LoaiSanPham_GetById(int id)
        {
            return context.LoaiSanPhams.FirstOrDefault(o => o.Id == id);
        }

        public IEnumerable<LoaiSanPham> LoaiSanPham_GetAll()
        {
            return context.LoaiSanPhams.ToList();
        }

        public LoaiSanPham LoaiSanPham_Update(LoaiSanPham SP)
        {
            context.LoaiSanPhams.Update(SP);
            context.SaveChanges();
            return SP;
        }

        public void LoaiSanPham_Delete(LoaiSanPham SP)
        {
            context.LoaiSanPhams.Remove(SP);
            context.SaveChanges();
        }

        public IEnumerable<LoaiSanPham> LoaiSanPham_FilterAdmin(string search, string sort, int pageIndex, int pageSize, out int count) {
            var query = context.LoaiSanPhams.AsQueryable();
            
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