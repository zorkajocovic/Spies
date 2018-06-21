using RentApp.Models.Entities;
using RentApp.Persistance.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace RentApp.Controllers
{
    public class PriceListController : ApiController
    {

        private IUnitOfWork db;

        public PriceListController(IUnitOfWork context)
        {
            db = context;
        }

        // GET: api/Services
        public IEnumerable<PriceList> GetPriceLists()
        {
            return db.PriceLists.GetAll();
        }

        // GET: api/Services/5
        [ResponseType(typeof(PriceList))]
        public IHttpActionResult GetService(int id)
        {
            PriceList priceList = db.PriceLists.Get(id);
            if (priceList == null)
            {
                return NotFound();
            }

            return Ok(priceList);
        }

        // PUT: api/Services/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutService(int id, PriceList priceList)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != priceList.PriceListID)
            {
                return BadRequest();
            }

            try
            {
                db.PriceLists.Update(priceList);
                db.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PriceListExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Services
        [ResponseType(typeof(PriceList))]
        public IHttpActionResult PostService(PriceList priceList)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.PriceLists.Add(priceList);
            db.Complete();

            return CreatedAtRoute("DefaultApi", new { id = priceList.PriceListID }, priceList);
        }

        // DELETE: api/Services/5
        [ResponseType(typeof(PriceList))]
        public IHttpActionResult DeleteService(int id)
        {
            PriceList priceList = db.PriceLists.Get(id);
            if (priceList == null)
            {
                return NotFound();
            }

            db.PriceLists.Remove(priceList);
            db.Complete();

            return Ok(priceList);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PriceListExists(int id)
        {
            return db.PriceLists.Get(id) != null;
        }
    }
}
