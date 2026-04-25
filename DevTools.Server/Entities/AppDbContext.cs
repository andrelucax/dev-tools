using Microsoft.EntityFrameworkCore;

namespace DevTools.Server.Entities
{
    public abstract class AppDbContext : DbContext
    {
        public virtual bool HasMigrations => true;

        public DbSet<Clipboard> Clipboards { get; set; }

        public AppDbContext(
            DbContextOptions options
        ) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Clipboard>()
                .HasIndex(o => o.Code)
                .IsUnique();
        }
    }

    public class PostgreDbContext : AppDbContext
    {
        public PostgreDbContext(
            DbContextOptions<PostgreDbContext> options
        ) : base(options) { }
    }

    public class MongoDbContext : AppDbContext
    {
        public override bool HasMigrations => false;

        public MongoDbContext(
            DbContextOptions<MongoDbContext> options
        ) : base(options) { }
    }
}
