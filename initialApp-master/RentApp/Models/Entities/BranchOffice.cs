using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace RentApp.Models.Entities
{
    public class BranchOffice
    {
        public int BranchOfficeID { get; set; }
        public string Address { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Image { get; set; }

        [ForeignKey("ServiceId")]
        public int ServiceID { get; set; }

        public bool Deleted { get; set; }

        public Service ServiceId { get; set; }
    }
}