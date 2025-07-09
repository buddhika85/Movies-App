using FluentValidation;
using MoviesAPI.Entities;

namespace MoviesAPI.Validations.FluentValidations;

public class GenreFluentValidator : AbstractValidator<Genre>
{

    public GenreFluentValidator()
    {
        Console.WriteLine("***********************************************************************GenreFluentValidator constructed!");

        RuleFor(x => x.Title).NotNull().NotEmpty().MinimumLength(2);
    }
}
