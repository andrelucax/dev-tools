using System.ComponentModel.DataAnnotations;

namespace DevTools.Api.Files
{
    public class FileRequest
    {

        [Required, MaxLength(255)]
        public string Name { get; set; } = string.Empty;

        [Required, MaxLength(255)]
        public string ContentType { get; set; } = string.Empty;

        [Required]
        public byte[] Base64 { get; set; } = [];

    }
}
