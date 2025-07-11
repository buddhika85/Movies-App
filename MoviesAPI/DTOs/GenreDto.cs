using MoviesAPI.Validations;
using System.ComponentModel.DataAnnotations;

namespace MoviesAPI.DTOs
{
    public class GenreDto : BaseDto
    {
        [Required(ErrorMessage = "{0} is required")]
        [FirstLetterUpperCase]                                  // no need of Attribute prefix
        [MinLength(2)]
        [MaxLength(50, ErrorMessage = "{0} should be maximum of 50 characters")]
        public required string Title { get; set; }
    }
}
