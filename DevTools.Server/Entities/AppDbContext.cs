using Microsoft.EntityFrameworkCore;

namespace DevTools.Server.Entities
{
    public class AppDbContext : DbContext
    {
        public DbSet<Clipboard> Clipboards { get; set; }

        public AppDbContext(
            DbContextOptions<AppDbContext> options
        ) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Clipboard>()
                .HasIndex(o => o.Code)
                .IsUnique();
        }
    }
}
