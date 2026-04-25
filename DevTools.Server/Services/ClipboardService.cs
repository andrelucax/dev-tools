using DevTools.Api.Clipboard;
using DevTools.Server.Classes;
using DevTools.Server.Entities;
using Microsoft.EntityFrameworkCore;

namespace DevTools.Server.Services
{
    public interface IClipboardService
    {
        Task<ClipboardModel> GetAsync(string code);

        Task<ClipboardModel> UploadAsync(ClipboardRequest request);
    }

    public class ClipboardService : IClipboardService
    {

        private readonly AppDbContext dbContext;
        private readonly IModelConverter mc;
        private readonly IBlobStorageService blobStorageService;

        public ClipboardService(
            AppDbContext dbContext,
            IModelConverter mc,
            IBlobStorageService blobStorageService
        )
        {
            this.dbContext = dbContext;
            this.mc = mc;
            this.blobStorageService = blobStorageService;
        }

        public async Task<ClipboardModel> GetAsync(string code)
        {
            var clipboard = await dbContext.Clipboards.FirstOrDefaultAsync(c => c.Code == code.ToUpper());

            if (clipboard == null)
            {
                throw new ApiException(ErrorCodes.ClipboardNotFound, $"Clipboard with code '{code}' not found.");
            }

            return mc.ToModel(clipboard);
        }

        public async Task<ClipboardModel> UploadAsync(ClipboardRequest request)
        {
            var clipboard = new Clipboard()
            {
                Id = Guid.NewGuid(),
                Code = RandomCodeGenerator.Generate(),
                DateCreated = DateTimeOffset.Now,
            };

            if (!string.IsNullOrEmpty(request.Text))
            {
                clipboard.Text = request.Text;
            } else if (request.File is not null && request.File.Length > 0)
            {
                clipboard.BlobId = Guid.NewGuid();
                await blobStorageService.PutAsync(BlobStorageFolders.Clipboards, clipboard.BlobId.Value, request.File!);
            } else
            {
                throw new ApiException(ErrorCodes.InvalidClipboardRequest, $"Both '{nameof(request.File)}' and '{nameof(request.Text)}' are empty");
            }

            dbContext.Add(clipboard);

            await dbContext.SaveChangesAsync();

            return mc.ToModel(clipboard);
        }
    }
}
