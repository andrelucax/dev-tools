using DevTools.Api.Clipboard;
using DevTools.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace DevTools.Server.Controllers
{
    [ApiController]
    [Route("api/clipboards")]
    public class ClipboardController : ControllerBase
    {
        private readonly IClipboardService clipboardService;

        public ClipboardController(
            IClipboardService clipboardService
        )
        {
            this.clipboardService = clipboardService;
        }

        [HttpGet("{code}")]
        public async Task<ClipboardModel> Get(string code)
        {
            return await clipboardService.GetAsync(code);
        }

        [HttpPost]
        public async Task<ClipboardModel> Upload(ClipboardRequest request)
        {
            return await clipboardService.UploadAsync(request);
        }
    }
}
