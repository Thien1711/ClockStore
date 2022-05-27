using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using StoreApi.Interfaces;
using StoreApi.Models;

namespace StoreApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly ISanPhamRepository sanPhamRepository;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, ISanPhamRepository sanPhamRepository)
        {
            _logger = logger;
            this.sanPhamRepository = sanPhamRepository;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }

        // [HttpGet("{id}")]
        // public IEnumerable<SanPham> Post(int id) {
        //     var ListID = new List<int>();
        //     ListID.Add(1);
        //     ListID.Add(2);
        //     ListID.Add(3);
        //     var sp = sanPhamRepository.GetQuery(ListID);
        //     foreach (var item in sp)
        //     {
        //         item.amount = 2;
        //     }
        //     return sp;
        // } 
    }
}
