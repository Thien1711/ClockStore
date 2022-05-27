using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StoreApi.Interfaces;
using StoreApi.Models;

namespace StoreApi.Repositories
{
    public class DonHangRepository : IDonHangRepository
    {
        private readonly ClockStoreDBContext context;
        public DonHangRepository(ClockStoreDBContext context) {
            this.context = context;
        }
        public DonHang DonHang_Add(DonHang hd)
        {
            context.DonHangs.Add(hd);
            context.SaveChanges();
            return hd;
        }

        public DonHang DonHang_GetById(int id)
        {
            // context.DonHangs.
            return context.DonHangs.FirstOrDefault(o => o.Id == id);
        }

        public Boolean DonHang_CheckUserKHAndId(int Id, string user)
        {
            var query = context.DonHangs.AsQueryable();
            query = query.Where(m => (m.Id == Id) && (m.KHuser == user));
            int count = query.Count();
            
            return count > 0;
        }

        public IEnumerable<DonHang> DonHang_GetByUserKH(string user, int pageIndex, int pageSize, out int count)
        {
            var query = context.DonHangs.AsQueryable();
            query = query.Where(m => m.KHuser == user);

            count = query.Count();
            int TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            
            if(pageIndex < 1){
                pageIndex = 1;
            }
            query = query.OrderBy(m => m.status);
            return query.Skip((pageIndex - 1) * pageSize)
                        .Take(pageSize).ToList();
        }

        public IEnumerable<DonHang> DonHang_GetByUserNV(string user)
        {
            var query = context.DonHangs.AsQueryable();
            query = query.Where(m => m.NVuser == user);
            return query.ToList();
        }

        public IEnumerable<DonHang> DonHang_GetAll()
        {
            return context.DonHangs.ToList();
        }

        public DonHang DonHang_Update(DonHang HD)
        {
            context.DonHangs.Update(HD);
            context.SaveChanges();
            return HD;
        }

        public void DonHang_Delete(DonHang HD)
        {
            context.DonHangs.Remove(HD);
            context.SaveChanges();
        }

        public IEnumerable<DonHang> DonHang_FilterAdmin(string search, int status, int pageIndex, int pageSize, out int count) {
            var query = context.DonHangs.AsQueryable();
            
            if(!string.IsNullOrEmpty(search)) {
                search = search.ToLower();
                query = query.Where(m => (m.NVuser.ToLower().Contains(search)) || 
                    (m.KHuser.ToLower().Contains(search)) || (m.address.ToLower().Contains(search)));
            }
            
            if(status > 0) {
                query = query.Where(m => m.status == status);
            }

            count = query.Count();

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

        public IEnumerable<DonHang> DonHang_FilterBeginEndInYear(int begin, int end) {
            var query = context.DonHangs.AsQueryable();
            query = query.Where(m => (m.date_order.Year >= begin) && (m.date_order.Year <= end));
            query = query.OrderBy(m => m.date_order);
            return query.ToList();
        }

        public IEnumerable<DonHang> DonHang_FilterBeginEndInMonth(int year, int begin, int end) {
            var query = context.DonHangs.AsQueryable();
            query = query.Where(m => (m.date_order.Year == year) && (m.date_order.Month >= begin) && (m.date_order.Month <= end));
            query = query.OrderBy(m => m.date_order);
            return query.ToList();
        }
    }
}