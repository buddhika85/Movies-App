using MoviesAPI.Validations;
using System.ComponentModel.DataAnnotations;

namespace MoviesAPI.Entities
{
    public class Genre : BaseEntity
    {
        [Required(ErrorMessage = "{0} is required")]
        [FirstLetterUpperCase]                                  // no need of Attribute prefix
        public required string Title { get; set; }
    }
}
