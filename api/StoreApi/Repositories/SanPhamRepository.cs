using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreApi.Interfaces;
using StoreApi.Models;

namespace StoreApi.Repositories
{
    public class SanPhamRepository : ISanPhamRepository
    {
        private readonly ClockStoreDBContext context;
        public SanPhamRepository(ClockStoreDBContext context) {
            this.context = context;
        }
        public SanPham SanPham_Add(SanPham sp)
        {
            context.SanPhams.Add(sp);
            context.SaveChanges();
            return sp;
        }

        public SanPham SanPham_GetById(int id)
        {
            // context.SanPhams.
            return context.SanPhams.FirstOrDefault(o => o.Id == id);
        }

        public IEnumerable<SanPham> SanPham_GetAll()
        {
            return context.SanPhams.ToList();
        }

        public SanPham SanPham_Update(SanPham SP)
        {
            context.SanPhams.Update(SP);
            context.SaveChanges();
            return SP;
        }

        public void SanPham_UpdateRand(List<SanPham> list)
        {
            context.SanPhams.UpdateRange(list);
            context.SaveChanges();
        }

        public void SanPham_Delete(SanPham SP)
        {
            context.SanPhams.Remove(SP);
            context.SaveChanges();
        }

        public IEnumerable<SanPham> SanPham_FilterAdmin(string search, string sort, int pageIndex, int pageSize, out int count) {
            var query = context.SanPhams.AsQueryable();
            
            if(!string.IsNullOrEmpty(search)) {
                search = search.ToLower();
                int id = 0;
                if(Int32.TryParse(search, out id)) {
                    query = query.Where(m => (m.name.ToLower().Contains(search)) || m.Id == id);
                }
                else {
                    query = query.Where(m => m.name.ToLower().Contains(search));
                }
            }

            count = query.Count();
            if(!string.IsNullOrEmpty(sort)){
                switch(sort){
                    case "name-asc": query = query.OrderBy(m => m.name);
                                    break;
                    case "name-desc": query = query.OrderByDescending(m => m.name);
                                    break;
                    case "price-asc": query = query.OrderBy(m => (int?)m.price);
                                    break;
                    case "price-desc": query = query.OrderByDescending(m => (int?)m.price);
                                    break;
                    case "status-asc": query = query.OrderBy(m => m.status);
                                    break;
                    case "status-desc": query = query.OrderByDescending(m => m.status);
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

        public IEnumerable<SanPham> SanPham_FilterProductShop(int lspId, int branchId, int machineId, int wireId, int priceFrom, int priceTo, string search, string sort, int pageIndex, int pageSize, out int count)
        {
            var query = context.SanPhams.AsQueryable();

            if(!string.IsNullOrEmpty(search)) {
                search = search.ToLower();
                query = query.Where(m => m.name.ToLower().Contains(search));
            }

            if(lspId > 0) {
                query = query.Where(m => m.LSPId == lspId);
            }

            if(branchId > 0) {
                query = query.Where(m => m.brandId == branchId);
            }

            if(machineId > 0) {
                query = query.Where(m => m.machineId == machineId);
            }

            if(wireId > 0) {
                query = query.Where(m => m.wireId == wireId);
            }

            if(priceFrom >= 0 && priceTo >= 0) {
                query = query.Where(m => m.price >= priceFrom && m.price <= priceTo);
            }
            else {
                if(priceFrom < 0 && priceTo >= 0) {
                    query = query.Where(m => m.price <= priceTo);
                }
                else {
                    if(priceFrom >= 0 && priceTo < 0) {
                        query = query.Where(m => m.price >= priceFrom);
                    }
                }
            }

            query = query.Where(m => m.status == 1);

            count = query.Count();
            if(!string.IsNullOrEmpty(sort)){
                switch(sort){
                    case "name-asc": query = query.OrderBy(m => m.name);
                                    break;
                    case "name-desc": query = query.OrderByDescending(m => m.name);
                                    break;
                    case "price-asc": query = query.OrderBy(m => (int?)m.price);
                                    break;
                    case "price-desc": query = query.OrderByDescending(m => (int?)m.price);
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

        public IEnumerable<SanPham> SanPham_GetByLSPId(int lspId, int pageSize)
        {
            var query = context.SanPhams.AsQueryable();
            query = query.Where(m => m.LSPId == lspId);
            
            if(pageSize < 0) {
                return query.ToList();
            }
            return query.Take(pageSize).ToList();
        }

        public IEnumerable<SanPham> SanPham_ListCart(string list) {
            // Console.WriteLine(list);
            var query = context.SanPhams.AsQueryable();
            if(!string.IsNullOrEmpty(list)) {
                List<int> listProduct_id = new List<int>();
                List<int> listSoluong = new List<int>();
                list = list.Trim('&');
                string[] arrlist = list.Split('&');
                string[] temp;
                int i = 0;
                for(i = 0; i < arrlist.Length-1; ++i) {
                    if(!string.IsNullOrEmpty(arrlist[i])) {
                        temp = arrlist[i].Split('-');
                        if(!string.IsNullOrEmpty(temp[0])) {
                            listProduct_id.Add(int.Parse(temp[0]));
                            listSoluong.Add(int.Parse(temp[1]));
                        }
                    }
                }

                if(!string.IsNullOrEmpty(arrlist[i])) {
                    temp = arrlist[i].Split('-');
                    if(!string.IsNullOrEmpty(temp[0])) {
                        listProduct_id.Add(int.Parse(temp[0]));
                        listSoluong.Add(int.Parse(temp[1]));
                    }
                }

                query = query.Where(m => listProduct_id.Contains(m.Id));
                int index = 0;
                foreach(var q in listProduct_id) {
                    foreach(var qq in query) {
                        if(q == qq.Id) {
                            qq.amount = listSoluong[index];
                        }
                    }
                    ++index;
                }

                return query.ToList();
            }

            return null;
        }

        public IEnumerable<SanPham> SanPham_LoadByListIdSP(List<int> listId) {
            // Console.WriteLine(list);
            var query = context.SanPhams.AsQueryable();
            if(listId.Count() > 0) {
                query = query.Where(m => listId.Contains(m.Id));
                return query.ToList();
            }

            return null;
        }
        
    }
}