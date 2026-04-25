using DevTools.Api.Clipboard;
using DevTools.Server.Classes;
using DevTools.Server.Entities;
using DevTools.Server.Repositories;

namespace DevTools.Server.Services
{
    public interface IClipboardService
    {
        Task<Clipboard> GetRequiredAsync(string code);

        Task<ClipboardModel> UploadAsync(ClipboardRequest request);

        Task<(Stream Stream, string ContentType, string FileName)> GetFileAsync(Clipboard clipboard);
    }

    public class ClipboardService : IClipboardService
    {

        private readonly AppDbContext dbContext;
        private readonly IModelConverter mc;
        private readonly IBlobStorageService blobStorageService;
        private readonly IClipboardRepository clipboardRepository;

        public ClipboardService(
            AppDbContext dbContext,
            IModelConverter mc,
            IBlobStorageService blobStorageService,
            IClipboardRepository clipboardRepository
        )
        {
            this.dbContext = dbContext;
            this.mc = mc;
            this.blobStorageService = blobStorageService;
            this.clipboardRepository = clipboardRepository;
        }

        public async Task<Clipboard> GetRequiredAsync(string code)
            => await clipboardRepository.GetAsync(code)
                ?? throw new ApiException(ErrorCodes.ClipboardNotFound, $"Clipboard with code '{code}' not found.");

        public async Task<ClipboardModel> UploadAsync(ClipboardRequest request)
        {
            var clipboard = new Clipboard()
            {
                Id = Guid.NewGuid(),
                Code = RandomCodeGenerator.Generate(),
                DateCreated = DateTimeOffset.Now,
            };

            if (!string.IsNullOrWhiteSpace(request.Text))
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

        public async Task<(Stream Stream, string ContentType, string FileName)> GetFileAsync(Clipboard clipboard)
        {
            if (!clipboard.BlobId.HasValue)
            {
                throw new ApiException(ErrorCodes.ClipboardNoBlob, $"Clipboard with code '{clipboard.Code}' does not have a blob.");
            }

            var stream = await blobStorageService.GetAsync(BlobStorageFolders.Clipboards, clipboard.BlobId.Value);

            return (stream, "application/octet-stream", clipboard.BlobId.Value.ToString());
        }
    }
}
