using DevTools.Server.Classes;
using DevTools.Server.Configuration;
using DevTools.Server.Entities;
using DevTools.Server.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddHttpContextAccessor();

builder.Services
    .AddAppConfiguration(builder.Configuration)
    .AddBlobStorage()
    .AddAppServices()
    .AddAppDbContext(builder.Configuration);

var app = builder.Build();

app.UseMiddleware<ApiExceptionMiddleware>();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    if (db.HasMigrations)
    {
        db.Database.Migrate();
    }
}

app.UseDefaultFiles();
app.MapStaticAssets();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
