using DevTools.Api.Files;

namespace DevTools.Api.Clipboards
{
    public class ClipboardModel
    {

        public string Code { get; set; } = string.Empty;

        public string? CopyUrl { get; set; }

        public string? Text { get; set; }

        public FileModel? File { get; set; }
    }
}
