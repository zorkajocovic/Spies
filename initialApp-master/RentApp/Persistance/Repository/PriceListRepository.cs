using RentApp.Models.Entities;
using RentApp.Persistance.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace RentApp.Persistance.Repository
{
    public class PriceListRepository : Repository<PriceList, int>, IPriceListRepository
    {
        protected RADBContext Context { get { return context as RADBContext; } }

        public PriceListRepository(DbContext context) : base(context)
        {

        }


    }
}