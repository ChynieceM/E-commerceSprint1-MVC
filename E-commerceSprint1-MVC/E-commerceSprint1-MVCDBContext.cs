using E_commerceSprint1_MVC.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace E_commerceSprint1_MVC
{
    public class E_commerceSprint1_MVCDBContext: IdentityDbContext<ApplicationUser>
    {
        public DbSet<Category> Categories { get; set; }

        public DbSet<Product> Products { get; set; }

        public E_commerceSprint1_MVCDBContext(DbContextOptions options) : base(options) { }

        public DbSet<ApplicationUser> Users { get; set; } = default;
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>().ToTable("Product");
            base.OnModelCreating(modelBuilder);

           
        }


     
    }
}
