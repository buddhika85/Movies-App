using System.ComponentModel.DataAnnotations;

namespace MoviesAPI.Entities
{
    public class Genre : BaseEntity
    {
        [Required]
        public required string Title { get; set; }
    }
}
