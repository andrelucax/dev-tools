using Amazon.S3;
using Amazon.S3.Model;
using DevTools.Server.Configuration;
using Microsoft.Extensions.Options;

namespace DevTools.Server.Services
{

    public interface IBlobStorageService
    {
        Task PutAsync(string folder, string key, Stream stream, CancellationToken ct = default);

        Task DeleteAsync(string folder, string key, CancellationToken ct = default);
    }

    public class BlobStorageService : IBlobStorageService
    {

        private readonly IAmazonS3 s3;
        private readonly IOptions<BlobStorageConfig> blobStorageConfig;

        public BlobStorageService(
            IAmazonS3 s3,
            IOptions<BlobStorageConfig> blobStorageConfig
        )
        {
            this.s3 = s3;
            this.blobStorageConfig = blobStorageConfig;
        }

        public async Task PutAsync(
            string folder,
            string key,
            Stream stream,
            CancellationToken ct = default
        )
        {
            var request = new PutObjectRequest
            {
                BucketName = blobStorageConfig.Value.BucketName,
                Key = formatKey(folder, key),
                InputStream = stream,
                AutoCloseStream = false,
            };

            await s3.PutObjectAsync(request, ct);
        }

        public async Task DeleteAsync(
            string folder,
            string key,
            CancellationToken ct = default
        )
        {
            var request = new DeleteObjectRequest
            {
                BucketName = blobStorageConfig.Value.BucketName,
                Key = formatKey(folder, key),
            };

            await s3.DeleteObjectAsync(request, ct);
        }

        private string formatKey(string folder, string key)
        {
            return $"{folder.ToLower()}/{key}";
        }
    }
}
