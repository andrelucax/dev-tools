using DevTools.Api.Clipboards;
using DevTools.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace DevTools.Server.Controllers
{
    [ApiController]
    [Route("api/clipboards")]
    public class ClipboardController : ControllerBase
    {
        private readonly IClipboardService clipboardService;
        private readonly IModelConverter mc;

        public ClipboardController(
            IClipboardService clipboardService,
            IModelConverter mc
        )
        {
            this.clipboardService = clipboardService;
            this.mc = mc;
        }

        [HttpGet("{code}")]
        public async Task<ClipboardModel> Get(string code)
        {
            var clipboard = await clipboardService.GetRequiredAsync(code);
            return mc.ToModel(clipboard);
        }

        [HttpPost]
        public async Task<ClipboardModel> Upload(ClipboardRequest request)
        {
            return await clipboardService.UploadAsync(request);
        }

        [HttpGet("{code}/file")]
        public async Task<IActionResult> GetFile(string code)
        {
            var clipboard = await clipboardService.GetRequiredAsync(code);
            var file = await clipboardService.GetFileAsync(clipboard);
            return File(file.Stream, file.ContentType, file.FileName);
        }
    }
}
