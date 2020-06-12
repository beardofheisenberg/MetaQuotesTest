using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MetaQuotes.Controllers
{
    [ApiController]
    public class GeoInfoController : ControllerBase
    {
        [HttpGet("/ip/location")]
        public async Task<string> GetLocationByIp([FromQuery] string ip)
        {
            return await Task.FromResult($"I've received {ip}");
        }

        [HttpGet("/city/locations")]
        public async Task<string> GetLocationsByCity([FromQuery] string city)
        {
            return await Task.FromResult($"I've received {city}");
        }
    }
}
