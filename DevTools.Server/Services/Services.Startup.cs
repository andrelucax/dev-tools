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
    }
}
