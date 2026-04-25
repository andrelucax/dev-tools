using DevTools.Server.Services;

namespace DevTools.Server.Classes
{
    public static class BlobStorageServiceExtensions
    {
        public static Task<Stream> GetAsync(this IBlobStorageService blobStorageService, BlobStorageFolders folder, Guid id, CancellationToken ct = default)
            => blobStorageService.GetAsync(folder.ToString(), id.ToString(), ct);

        public static async Task PutAsync(this IBlobStorageService blobStorageService, BlobStorageFolders folder, Guid id, byte[] data, CancellationToken ct = default)
        {
            using var stream = new MemoryStream(data);
            await blobStorageService.PutAsync(folder, id, stream, ct);
        }

        public static Task PutAsync(this IBlobStorageService blobStorageService, BlobStorageFolders folder, Guid id, Stream stream, CancellationToken ct = default)
            => blobStorageService.PutAsync(folder.ToString(), id.ToString(), stream, ct);

        public static Task DeleteAsync(this IBlobStorageService blobStorageService, BlobStorageFolders folder, Guid id, CancellationToken ct = default)
            => blobStorageService.DeleteAsync(folder.ToString(), id.ToString(), ct);
    }
}
