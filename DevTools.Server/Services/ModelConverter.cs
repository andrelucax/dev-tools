using DevTools.Api.Clipboard;
using DevTools.Server.Configuration;
using DevTools.Server.Entities;
using Microsoft.Extensions.Options;

namespace DevTools.Server.Services
{
    public interface IModelConverter
    {
        ClipboardModel ToModel(Clipboard clipboard);
    }

    public class ModelConverter : IModelConverter
    {

        private readonly IOptions<GeneralConfig> generalConfig;

        public ModelConverter(
            IOptions<GeneralConfig> generalConfig
        )
        {
            this.generalConfig = generalConfig;
        }

        public ClipboardModel ToModel(Clipboard clipboard)
            => new ClipboardModel()
            {
                Code = clipboard.Code,
                CopyUrl = generalConfig.Value.SiteUri != null
                    ? new Uri(generalConfig.Value.SiteUri, $"/clipboard?code={clipboard.Code}").ToString()
                    : null,
                Text = clipboard.Text,
                FileUrl = clipboard.BlobId.HasValue ? $"/api/clipboards/{clipboard.Code}/file" : null
            };
    }
}
