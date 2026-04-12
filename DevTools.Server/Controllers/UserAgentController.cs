using DevTools.Server.Api;
using DevTools.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace DevTools.Server.Controllers
{
    [ApiController]
    [Route("api/user-agent")]
    public class UserAgentController : ControllerBase
    {
        private readonly IUserAgentService userAgentService;

        public UserAgentController(
            IUserAgentService userAgentService
        )
        {
            this.userAgentService = userAgentService;
        }

        [HttpGet]
        public UserAgentModel Get()
        {
            return userAgentService.Get();
        }
    }
}
