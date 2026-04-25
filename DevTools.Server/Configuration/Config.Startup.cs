namespace DevTools.Server.Configuration
{
    public static class ConfigStartup
    {
        public const string General = "General";
        public const string BlobStorage = "BlobStorage";

        public static IServiceCollection AddAppConfiguration(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<GeneralConfig>(configuration.GetSection(General));
            services.Configure<BlobStorageConfig>(configuration.GetSection(BlobStorage));

            return services;
        }
    }
}
