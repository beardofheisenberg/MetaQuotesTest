using MetaQuotes.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MetaQuotes.Controllers
{
    [ApiController]
    [Produces("application/json")]
    public class GeoInfoController : ControllerBase
    {
        [HttpGet("/ip/location")]
        public async Task<Location> GetLocationByIp([FromQuery] string ip)
            => new Location
            {
                Country = $"cou_{ip}",
                Region = $"reg_{ip}",
                Postal = $"pos_{ip}",
                City = $"cit_{ip}",
                Organization = $"org_{ip}",
                Latitude = 55.2321321F,
                Longitude = 37.4687322F
            };

        [HttpGet("/city/locations")]
        public async Task<IEnumerable<Location>> GetLocationsByCity([FromQuery] string city)
            => new List<Location> {
                new Location
                {
                    Country = $"cou_{city}",
                    Region = $"reg_{city}",
                    Postal = $"pos_{city}",
                    City = $"{city}",
                    Organization = $"org_{city}",
                    Latitude = 55.2321321F,
                    Longitude = 37.4687322F
                },
                 new Location
                {
                    Country = $"cou_{city}",
                    Region = $"reg_{city}",
                    Postal = $"pos_{city}",
                    City = $"{city}",
                    Organization = $"org_{city}",
                    Latitude = 55.2321321F,
                    Longitude = 37.4687322F
                }
            };
    }
}
