using DevTools.Server.Entities;
using Microsoft.EntityFrameworkCore;

namespace DevTools.Server.Repositories
{

    public interface IClipboardRepository
    {

        Task<Clipboard?> GetAsync(string code);
    }

    public class ClipboardRepository : IClipboardRepository
    {

        private readonly AppDbContext dbContext;

        public ClipboardRepository(
            AppDbContext dbContext
        )
        {
            this.dbContext = dbContext;
        }

        public Task<Clipboard?> GetAsync(string code)
            => dbContext.Clipboards.FirstOrDefaultAsync(c => c.Code == code.ToUpper());
    }
}
