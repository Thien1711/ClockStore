using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using StoreApi.Interfaces;
using StoreApi.Repositories;
using StoreApi.Services;

namespace StoreApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            
//             services.AddControllers().AddJsonOptions(x =>
//    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve);


            //Sửa chỗ này nè
            // cho phép 4200 truy cập 5001 
            // https://topdev.vn/blog/cors-la-gi/
            // services.AddCors(options => {
            //     options.AddPolicy("CorsPolicy", policy => {
            //         policy.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins(new []{"http://localhost:4200"});
            //     });
            // });


            services.AddCors();

            services.AddDbContext<ClockStoreDBContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            // services.AddControllers().AddJsonOptions(x =>
            //     x.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve);
            services.AddScoped<JwtNhanVienService>();
            services.AddScoped<JwtKhachHangService>();
            services.AddScoped<IPhieuNhapRepository, PhieuNhapRepository>();
            services.AddScoped<IKhachHangRepository, KhachHangRepository>();
            services.AddScoped<INhanVienRepository, NhanVienRepository>();
            services.AddScoped<ISanPhamRepository, SanPhamRepository>();
            services.AddScoped<IQuyenRepository, QuyenRepository>();
            services.AddScoped<IThuongHieuRepository, ThuongHieuRepository>();
            services.AddScoped<IKieuMayRepository, KieuMayRepository>();
            services.AddScoped<ILoaiSanPhamRepository, LoaiSanPhamRepository>();
            services.AddScoped<IDonHangRepository, DonHangRepository>();
            services.AddScoped<IChiTietDHRepository, ChiTietDHRepository>();
            services.AddScoped<IKieuDayRepository, KieuDayRepository>();
            services.AddScoped<IChiTietPNRepository, ChiTietPNRepository>();


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            //sửa
            // sử dụng Cors để domain 4200 truy cập vào 5001
            // app.UseCors("CorsPolicy");
            app.UseCors(options => options
                .WithOrigins(new[] { "http://localhost:4200" })
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials()
            );

            // dùng để truy cập wwwroot từ domain
            app.UseStaticFiles();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
