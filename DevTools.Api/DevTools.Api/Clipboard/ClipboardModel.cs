namespace DevTools.Api.Clipboard
{
    public class ClipboardModel
    {

        public string Code { get; set; } = string.Empty;

        public string? CopyUrl { get; set; }

        public string? Text { get; set; }

        public string? FileUrl { get; set; }
    }
}
