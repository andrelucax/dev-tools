using DevTools.Server.Api;

namespace DevTools.Server.Services
{
    public interface IUserAgentService
    {
        UserAgentModel Get();
    }

    public class UserAgentService : IUserAgentService
    {
        private readonly IHttpContextAccessor httpContextAccessor;

        public UserAgentService(
            IHttpContextAccessor httpContextAccessor
        )
        {
            this.httpContextAccessor = httpContextAccessor;
        }

        public UserAgentModel Get()
        {
            var context = httpContextAccessor.HttpContext;

            var request = context?.Request;

            var userAgent = request?.Headers["User-Agent"].ToString() ?? string.Empty;

            var ip = context?.Connection.RemoteIpAddress?.ToString() ?? string.Empty;

            return new UserAgentModel
            {
                Raw = userAgent,
                IpAddress = ip,
            };
        }
    }
}
