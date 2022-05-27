using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreApi.Interfaces;
using StoreApi.Models;

namespace StoreApi.Repositories
{
    public class ChiTietPNRepository : IChiTietPNRepository
    {
        private readonly ClockStoreDBContext context;
        public ChiTietPNRepository(ClockStoreDBContext context) {
            this.context = context;
        }
        public ChiTietPN ChiTietPN_Add(ChiTietPN pn)
        {
            context.ChiTietPNs.Add(pn);
            context.SaveChanges();
            return pn;
        }

        public IEnumerable<ChiTietPN> ChiTietPN_AddRange(IEnumerable<ChiTietPN> list)
        {
            context.ChiTietPNs.AddRange(list);
            context.SaveChanges();
            return list;
        }

        // public void ChiTietPN_AddRangeWithListSP(IEnumerable<SanPham> list, int couponId)
        // {
        //     foreach (var item in list)
        //     {
        //         ChiTietPN newChiTietPN = new ChiTietPN();
        //         newChiTietPN.couponId = couponId;
        //         newChiTietPN.productId = item.Id;
        //         newChiTietPN.name = item.name;
        //         newChiTietPN.amount = item.amount;
        //         newChiTietPN.price = item.price;
        //         newChiTietPN.img = item.img;
        //         context.ChiTietPNs.Add(newChiTietPN);
        //     }
        //     context.SaveChanges();
        // }

        // public ChiTietPN ChiTietPN_GetById(int id)
        // {
        //     // context.ChiTietPNs.
        //     return context.ChiTietPNs.FirstOrDefault(o => o.Id == id);
        // }

        public IEnumerable<ChiTietPN> ChiTietPN_GetAll()
        {
            return context.ChiTietPNs.ToList();
        }

        public IEnumerable<ChiTietPN> ChiTietPN_GetByCouponId(int couponId)
        {
            var query = context.ChiTietPNs.AsQueryable();
            query = query.Where(m => m.couponId == couponId);
            return query.ToList();
        }

        public ChiTietPN ChiTietPN_Update(ChiTietPN CTPN)
        {
            context.ChiTietPNs.Update(CTPN);
            context.SaveChanges();
            return CTPN;
        }

        public void ChiTietPN_Delete(ChiTietPN CTPN)
        {
            context.ChiTietPNs.Remove(CTPN);
            context.SaveChanges();
        }

        public IEnumerable<ChiTietPN> ChiTietPN_FilterAdmin(string search, string sort, int pageIndex, int pageSize, out int count) {
            var query = context.ChiTietPNs.AsQueryable();
            
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
    }
}