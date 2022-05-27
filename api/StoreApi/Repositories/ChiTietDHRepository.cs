using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreApi.Interfaces;
using StoreApi.Models;

namespace StoreApi.Repositories
{
    public class ChiTietDHRepository : IChiTietDHRepository
    {
        private readonly ClockStoreDBContext context;
        public ChiTietDHRepository(ClockStoreDBContext context) {
            this.context = context;
        }
        public ChiTietDH ChiTietDH_Add(ChiTietDH hd)
        {
            context.ChiTietDHs.Add(hd);
            context.SaveChanges();
            return hd;
        }

        public IEnumerable<ChiTietDH> ChiTietDH_AddRange(IEnumerable<ChiTietDH> list)
        {
            context.ChiTietDHs.AddRange(list);
            context.SaveChanges();
            return list;
        }

        // public void ChiTietDH_AddRangeWithListSP(IEnumerable<SanPham> list, int billId)
        // {
        //     foreach (var item in list)
        //     {
        //         ChiTietDH newChiTietDH = new ChiTietDH();
        //         newChiTietDH.billId = billId;
        //         newChiTietDH.productId = item.Id;
        //         newChiTietDH.name = item.name;
        //         newChiTietDH.amount = item.amount;
        //         newChiTietDH.price = item.price;
        //         newChiTietDH.img = item.img;
        //         context.ChiTietDHs.Add(newChiTietDH);
        //     }
        //     context.SaveChanges();
        // }

        // public ChiTietDH ChiTietDH_GetById(int id)
        // {
        //     // context.ChiTietDHs.
        //     return context.ChiTietDHs.FirstOrDefault(o => o.Id == id);
        // }

        public IEnumerable<ChiTietDH> ChiTietDH_GetAll()
        {
            return context.ChiTietDHs.ToList();
        }

        public IEnumerable<ChiTietDH> ChiTietDH_GetByBillId(int billId)
        {
            var query = context.ChiTietDHs.AsQueryable();
            query = query.Where(m => m.billId == billId);
            return query.ToList();
        }

        public ChiTietDH ChiTietDH_Update(ChiTietDH CTHD)
        {
            context.ChiTietDHs.Update(CTHD);
            context.SaveChanges();
            return CTHD;
        }

        public void ChiTietDH_Delete(ChiTietDH CTHD)
        {
            context.ChiTietDHs.Remove(CTHD);
            context.SaveChanges();
        }

        public IEnumerable<ChiTietDH> ChiTietDH_FilterAdmin(string search, string sort, int pageIndex, int pageSize, out int count) {
            var query = context.ChiTietDHs.AsQueryable();
            
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
                    case "price-asc": query = query.OrderBy(m => (long?)m.price);
                                    break;
                    case "price-desc": query = query.OrderByDescending(m => (long?)m.price);
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

        public IEnumerable<ChiTietDH> ChiTietDH_GetByListBill(List<int> list)
        {
            var query = context.ChiTietDHs.AsQueryable();
            query = query.Where(m => list.Contains(m.billId));
            query = query.OrderByDescending(m => m.amount);
            return query.Take(12).ToList();
        }
    }
}