using DevTools.Server.Configuration;
using DevTools.Server.Entities;
using Microsoft.EntityFrameworkCore;

namespace DevTools.Server.Services
{
    public static class DbContextStartup
    {

        public static IServiceCollection AddAppDbContext(this IServiceCollection services, IConfiguration configuration)
        {

            var dbConfig = configuration
                .GetSection("Database")
                .Get<DatabaseConfig>();

            switch (dbConfig!.Provider)
            {
                case "Postgre":
                    services.AddDbContext<PostgreDbContext>(options =>
                        options.UseNpgsql(dbConfig.ConnectionString));

                    services.AddScoped<AppDbContext, PostgreDbContext>();
                    break;
                case "Mongo":
                    services.AddDbContext<MongoDbContext>(options =>
                        options.UseMongoDB(dbConfig.ConnectionString));

                    services.AddScoped<AppDbContext, MongoDbContext>();
                    break;
                default:
                    throw new NotSupportedException($"Invalid database provider '{dbConfig.Provider}'.");
            }

            return services;
        }
    }
}
