﻿using RentApp.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentApp.Persistance.Repository.Interfaces
{
    public interface IRateRepository : IRepository<Rate, int>
    {

        IEnumerable<Rate> GetRate(int idService);
    }
}
