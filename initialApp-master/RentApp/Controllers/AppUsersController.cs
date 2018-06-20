using Newtonsoft.Json;
using RentApp.Models.Entities;
using RentApp.Persistance.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;

namespace RentApp.Controllers
{
    public class AppUsersController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public AppUsersController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        // GET: api/Services
        public IEnumerable<AppUser> GetAppUsers()
        {
            return unitOfWork.AppUsers.GetAll();
        }

        // GET: api/Services/5
        [ResponseType(typeof(AppUser))]
        public IHttpActionResult GetAppUser(int id)
        {
            AppUser appUser = unitOfWork.AppUsers.Get(id);
            if (appUser == null)
            {
                return NotFound();
            }

            return Ok(appUser);
        }

        [Route("api/GetActiveUserId")]
        public int GetActiveUserId()
        {
            return unitOfWork.AppUsers.GetActiveUserId(User.Identity.Name);
        }

      
        // PUT: api/Services/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAppUser(int id, AppUser appUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != appUser.Id)
            {
                return BadRequest();
            }

            try
            {
                if(appUser.Image != null)
                {
                    string root = System.Web.HttpContext.Current.Server.MapPath("~/Content/images/users");
                    var extionsion = new FileInfo(appUser.Image).Extension;
                    var fileName = Guid.NewGuid() + extionsion;
                    var fileSavePath = Path.Combine(root, fileName);

                    while (File.Exists(fileSavePath))
                    {
                        fileName = Guid.NewGuid() + extionsion;
                        fileSavePath = Path.Combine(root, fileName);
                    }
                    appUser.Image = "http://localhost:51111/Content/images/users/" + fileName;
                }
              
                unitOfWork.AppUsers.Update(appUser);
                unitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AppUserExists(id))
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
        [ResponseType(typeof(AppUser))]
        public IHttpActionResult PostAppUser(AppUser appUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            unitOfWork.AppUsers.Add(appUser);
            unitOfWork.Complete();

            return CreatedAtRoute("DefaultApi", new { id = appUser.Id }, appUser);
        }

        // DELETE: api/Services/5
        [ResponseType(typeof(AppUser))]
        public IHttpActionResult DeleteAppUser(int id)
        {
            AppUser appUser = unitOfWork.AppUsers.Get(id);
            if (appUser == null)
            {
                return NotFound();
            }

            unitOfWork.AppUsers.Remove(appUser);
            unitOfWork.Complete();

            return Ok(appUser);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AppUserExists(int id)
        {
            return unitOfWork.AppUsers.Get(id) != null;
        }
    }
}
