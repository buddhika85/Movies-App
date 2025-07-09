
using System.ComponentModel.DataAnnotations;

namespace MoviesAPI.Validations;

public class FirstLetterUpperCaseAttribute : ValidationAttribute
{
    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        string? strValue = value as string;
        if (string.IsNullOrWhiteSpace(strValue))
            return ValidationResult.Success;

        string firstLetter = strValue[0].ToString();
        string firstLetterUppercased = strValue[0].ToString().ToUpper();
        if (!firstLetter.Equals(firstLetterUppercased))
        {
            return new ValidationResult("First letter should be uppercase");
        }

        return ValidationResult.Success;
    }
}
