using DevTools.Api.Files;

namespace DevTools.Api.Clipboards
{
    public class ClipboardRequest
    {

        public string? Text { get; set; }

        public FileRequest? File { get; set; }
    }
}
