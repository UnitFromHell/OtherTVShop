using Microsoft.EntityFrameworkCore;

namespace TvShop.Models
{
    public class TVShopContext : DbContext
    {
        public TVShopContext(DbContextOptions<TVShopContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
    }
}
