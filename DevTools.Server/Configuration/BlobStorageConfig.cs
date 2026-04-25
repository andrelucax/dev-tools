namespace DevTools.Server.Configuration
{
    public class BlobStorageConfig
    {
        public string ServiceUrl { get; set; } = string.Empty;

        public bool ForcePathStyle { get; set; } = false;

        public string AccessKey { get; set; } = string.Empty;

        public string SecretKey { get; set; } = string.Empty;

        public string BucketName { get; set; } = string.Empty;
    }
}
