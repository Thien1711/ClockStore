using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using StoreApi.Models;

namespace StoreApi.Repositories
{
    public class ClockStoreDBContext : DbContext
    {
        public ClockStoreDBContext(DbContextOptions<ClockStoreDBContext> options) : base(options) { }

        public DbSet<KieuDay> KieuDays { get; set; }
        public DbSet<KieuMay> KieuMays { get; set; }
        public DbSet<LoaiSanPham> LoaiSanPhams { get; set; }
        public DbSet<ThuongHieu> ThuongHieus { get; set; }
        public DbSet<SanPham> SanPhams { get; set; }
        public DbSet<Quyen> Quyens { get; set; }
        public DbSet<NhanVien> NhanViens { get; set; }
        public DbSet<KhachHang> KhachHangs { get; set; }

        public DbSet<DonHang> DonHangs { get; set; }
        public DbSet<ChiTietDH> ChiTietDHs { get; set; }

        public DbSet<PhieuNhap> PhieuNhaps { get; set; }
        public DbSet<ChiTietPN> ChiTietPNs { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<ChiTietPN>()
               .HasKey(pn => new { pn.couponId, pn.productId });
            modelBuilder.Entity<ChiTietDH>()
               .HasKey(c => new { c.billId, c.productId });

            // modelBuilder.Entity<ChiTietDH>().Ignore(a => a.bill);

            var cascadeFKs = modelBuilder.Model.GetEntityTypes()
                .SelectMany(t => t.GetForeignKeys())
                .Where(fk => !fk.IsOwnership && fk.DeleteBehavior == DeleteBehavior.Cascade);

            foreach (var fk in cascadeFKs)
            {
                // Console.WriteLine(fk.GetConstraintName());
                if (fk.GetConstraintName().Contains("FK_ChiTietDHs_SanPhams_productId") ||
                    fk.GetConstraintName().Contains("FK_ChiTietPNs_SanPhams_productId"))
                {
                    fk.DeleteBehavior = DeleteBehavior.Restrict;
                }
                // fk.GetConstraintName();

            }


            base.OnModelCreating(modelBuilder);

        }
    }
}