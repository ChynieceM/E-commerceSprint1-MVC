using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace E_commerceSprint1_MVC.Models


{
    public class ApplicationUser : IdentityUser
    {
        public string Password { get; set; }

        [NotMapped]
        public string? Token { get; set; }

        [NotMapped]
        public IList<string> Roles { get; set; }
    }
}
