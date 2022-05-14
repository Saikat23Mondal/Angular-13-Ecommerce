using ecommerceApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ecommerceApi.Data
{
    public class UserDbContext: DbContext
    {
        public DbSet<UserDetails> UserDetails { get; set; }
        public DbSet<Product> Product { get; set; }

        public DbSet<Order> Order { get; set; }

        public UserDbContext(DbContextOptions<UserDbContext>options):base(options)
        {
            
        }
  

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserDetails>().ToTable("user_details");
            modelBuilder.Entity<Product>().ToTable("Product");
            modelBuilder.Entity<Order>().ToTable("OrderTable");

        }
    }
}
