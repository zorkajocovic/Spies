using RentApp.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentApp.Persistance.Repository
{
    public interface IAppUserRepository : IRepository<AppUser, int>
    {
<<<<<<< HEAD
       // AppUser GetActiveUser(string username);
=======
        //AppUser GetActiveUser(string username);
>>>>>>> b7a6fb507dada7230c97671f8faec6a6f3476076
        int GetActiveUserId(string username);
    }
}
