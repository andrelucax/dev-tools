namespace DevTools.Server.Configuration
{
    public static class ConfigStartup
    {
        public const string General = "General";

        public static IServiceCollection AddAppConfiguration(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<GeneralConfig>(configuration.GetSection(General));

            return services;
        }
    }
}
