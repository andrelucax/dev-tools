namespace DevTools.Server.Configuration
{
    public class GeneralConfig
    {
        #region SiteUrl
        public string SiteUrl { get; set; } = string.Empty;

        public Uri? SiteUri =>
        Uri.TryCreate(SiteUrl, UriKind.Absolute, out var uri)
            ? uri
            : null;
        #endregion
    }
}
