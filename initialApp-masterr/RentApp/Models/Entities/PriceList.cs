using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RentApp.Models.Entities
{
    public class PriceList
    {
        public int PriceListID { get; set; }
        public int FromHour { get; set; }
        public int ToHour { get; set; }
    }
}