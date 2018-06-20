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
    public class VehicleTypeController : ApiController
    {
        private IUnitOfWork db;

        public VehicleTypeController(IUnitOfWork context)
        {
            db = context;
        }

        // GET: api/VehicleTypes
        public IEnumerable<VehicleType> GetVehicleTypes()
        {
            return db.VehicleTypes.GetAllVehicleTypes();
        }

        // GET: api/VehicleTypes/5
        [ResponseType(typeof(VehicleType))]
        public IHttpActionResult GetService(int id)
        {
            VehicleType type = db.VehicleTypes.Get(id);
            if (type == null)
            {
                return NotFound();
            }

            return Ok(type);
        }

        // PUT: api/VehicleTypes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutService(int id, VehicleType vehicleType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != vehicleType.VehicleTypeId)
            {
                return BadRequest();
            }

            try
            {
                db.VehicleTypes.Update(vehicleType);
                db.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VehicleTypesExists(id))
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

        // POST: api/VehicleTypes
        [ResponseType(typeof(VehicleType))]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult PostService(VehicleType vehicleType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.VehicleTypes.Add(vehicleType);
            db.Complete();

            return CreatedAtRoute("DefaultApi", new { id = vehicleType.VehicleTypeId }, vehicleType);
        }

        // DELETE: api/VehicleTypes/5
        [ResponseType(typeof(VehicleType))]
        public IHttpActionResult DeleteService(int id)
        {
            VehicleType type = db.VehicleTypes.Get(id);
            if (type == null)
            {
                return NotFound();
            }

            db.VehicleTypes.Remove(type);
            db.Complete();

            return Ok(type);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool VehicleTypesExists(int id)
        {
            return db.VehicleTypes.Get(id) != null;
        }
    }
}
