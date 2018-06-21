using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using RentApp.Models.Entities;
using RentApp.Persistance;
using RentApp.Persistance.UnitOfWork;
using System.Web;
using System.IO;
using Newtonsoft.Json;

namespace RentApp.Controllers
{
    public class ServicesController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;
        private object locking = new object();

        public ServicesController(IUnitOfWork unitOfWork)
        {
            lock (locking)
            {
                this.unitOfWork = unitOfWork;
            }
        }

        // GET: api/Services
        public IEnumerable<Service> GetServices()
        {
            lock (locking)
            {
                return unitOfWork.Services.GetAllServices();
            }
        }

        // GET: api/Services/5
        [ResponseType(typeof(Service))]
        public IHttpActionResult GetService(int id)
        {
            lock (locking)
            {
                Service service = unitOfWork.Services.Get(id);
                if (service == null)
                {
                    return NotFound();
                }

                return Ok(service);
            }
        }

        // PUT: api/Services/5
        [ResponseType(typeof(void))]
        [Authorize]
        public IHttpActionResult PutService(int id, Service service)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != service.Id)
            {
                return BadRequest();
            }

            try
            {
                lock (locking)
                {
                    unitOfWork.Services.Update(service);
                    unitOfWork.Complete();

                    if (service.Deleted)
                    {
                        List<Vehicle> vehiclesForService = unitOfWork.Vehicles.GetVehiclesForService(service.Id).Where(v => v.ServiceId == service.Id).ToList();
                        foreach (var vehicle in vehiclesForService)
                        {
                            vehicle.Deleted = true;
                            unitOfWork.Vehicles.Update(vehicle);
                            unitOfWork.Complete();
                        }

                        List<Comment> commentsForService = unitOfWork.Comments.GetCommentsForService(service.Id).Where(v => v.ServiceID == service.Id).ToList();
                        foreach (var com in commentsForService)
                        {
                            com.Deleted = true;
                            unitOfWork.Comments.Update(com);
                            unitOfWork.Complete();
                        }
                        List<BranchOffice> branchesForService = unitOfWork.BranchOffices.GetBranchOfficesForService(service.Id).Where(v => v.ServiceID == service.Id).ToList();
                        foreach (var br in branchesForService)
                        {
                            br.Deleted = true;
                            unitOfWork.BranchOffices.Update(br);
                            unitOfWork.Complete();
                        }
                    }
                }
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ServiceExists(id))
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
        [ResponseType(typeof(Service))]
        [Authorize]
        public IHttpActionResult PostService()
        {
            HttpRequestMessage request = this.Request;
            if (!request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            string root = System.Web.HttpContext.Current.Server.MapPath("~/Content/images/services");

            // Get the uploaded image from the Files collection
            var httpPostedFile = HttpContext.Current.Request.Files["image"];
            var service = JsonConvert.DeserializeObject<Service>(HttpContext.Current.Request.Form[0]);

            Validate(service);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (httpPostedFile != null)
            {
                // Validate the uploaded image(optional)
                var extionsion = new FileInfo(httpPostedFile.FileName).Extension;
                var fileName = Guid.NewGuid() + extionsion;
                // Get the complete file path
                var fileSavePath = Path.Combine(root, fileName);

                while (File.Exists(fileSavePath))
                {
                    fileName = Guid.NewGuid() + extionsion;
                    fileSavePath = Path.Combine(root, fileName);
                }
                // Save the uploaded file to "UploadedFiles" folder
                httpPostedFile.SaveAs(fileSavePath);
                service.Logo = "http://localhost:51111/Content/images/services/" + fileName;
                service.Approved = false;
            }
            lock (locking)
            {
                unitOfWork.Services.Add(service);
                unitOfWork.Complete();
            }
            return CreatedAtRoute("DefaultApi", new { id = service.Id }, service);
        }

        // DELETE: api/Services/5
        [ResponseType(typeof(Service))]
        public IHttpActionResult DeleteService(int id)
        {
            lock (locking)
            {
                Service service = unitOfWork.Services.Get(id);
                if (service == null)
                {
                    return NotFound();
                }

                unitOfWork.Services.Remove(service);
                unitOfWork.Complete();

                return Ok(service);
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ServiceExists(int id)
        {
            lock (locking)
            {
                return unitOfWork.Services.Get(id) != null;
            }
        }
    }
}