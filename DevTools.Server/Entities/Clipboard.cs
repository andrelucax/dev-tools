using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DevTools.Server.Entities
{
    public class Clipboard
    {

        public Guid Id { get; set; }

        [MaxLength(6)]
        public string Code { get; set; } = string.Empty;

        public string? Text { get; set; }

        public Guid? BlobId { get; set; }

        #region DateCreated

        [NotMapped]
        public DateTimeOffset DateCreated { get; set; }

        public DateTime DateCreatedUtc
        {
            get => DateCreated.UtcDateTime;
            set => DateCreated = new DateTimeOffset(value, TimeSpan.Zero);
        }

        #endregion
    }
}
