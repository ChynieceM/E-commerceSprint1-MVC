using E_commerceSprint1_MVC.Models;
using Microsoft.EntityFrameworkCore;

namespace E_commerceSprint1_MVC
{
    public class E_commerceSprint1_MVCDBContext: DbContext
    {
        public DbSet<Category> Categories { get; set; }

        public DbSet<Product> Products { get; set; }

        public E_commerceSprint1_MVCDBContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>().HasOne(c => c.Category).WithMany(c => c.Products).HasForeignKey(c => c.CategoryId);
        }


        public DbSet<E_commerceSprint1_MVC.Models.Product> Product { get; set; } = default!;
    }
}
