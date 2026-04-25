using Amazon.S3;
using DevTools.Server.Configuration;
using Microsoft.Extensions.Options;

namespace DevTools.Server.Services
{
    public static class ServicesStartup
    {

        public static IServiceCollection AddAppServices(this IServiceCollection services)
        {
            services.AddSingleton<IModelConverter, ModelConverter>();

            services.AddScoped<IUserAgentService, UserAgentService>();
            services.AddScoped<IClipboardService, ClipboardService>();

            return services;
        }

        public static IServiceCollection AddBlobStorage(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton<IAmazonS3>(sp =>
            {
                var blobStorageConfig = sp
                    .GetRequiredService<IOptions<BlobStorageConfig>>()
                    .Value;

                var config = new AmazonS3Config
                {
                    ForcePathStyle = blobStorageConfig.ForcePathStyle,
                };

                if (!string.IsNullOrWhiteSpace(blobStorageConfig.ServiceUrl))
                {
                    config.ServiceURL = blobStorageConfig.ServiceUrl;
                }

                if (!string.IsNullOrWhiteSpace(blobStorageConfig.AccessKey))
                {
                    return new AmazonS3Client(
                        blobStorageConfig.AccessKey,
                        blobStorageConfig.SecretKey,
                        config
                    );
                }

                return new AmazonS3Client(config);
            });

            services.AddSingleton<IBlobStorageService, BlobStorageService>();

            return services;
        }
    }
}
