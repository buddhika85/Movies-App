using MoviesAPI.Validations;
using System.ComponentModel.DataAnnotations;

namespace MoviesAPI.Entities
{
    public class Genre : BaseEntity
    {
        [Required(ErrorMessage = "{0} is required")]
        [FirstLetterUpperCase]                                  // no need of Attribute prefix
        [MinLength(2)]
        [MaxLength(50)]
        public required string Title { get; set; }
    }
}
