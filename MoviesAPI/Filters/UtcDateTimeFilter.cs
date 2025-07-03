using Microsoft.AspNetCore.Mvc.Filters;

namespace MoviesAPI.Filters
{
    // Change the Date Time Argument to use UTC (Universal Time Coordinated / previously Greenwich time) Time 
    public class UtcDateTimeFilter : IActionFilter
    {
        public void OnActionExecuting(ActionExecutingContext context)
        {
            foreach (var argument in context.ActionArguments)
            {
                if (argument.Value is DateTime dt && dt.Kind == DateTimeKind.Local)
                {
                    context.ActionArguments[argument.Key] = dt.ToUniversalTime();
                }

                // Optional: recursively update properties if argument is a model
                if (argument.Value is IHasDateTime dateTimeModel)
                {
                    dateTimeModel.NormalizeToUtc();
                }
            }
        }

        public void OnActionExecuted(ActionExecutedContext context) { }

    }


    public interface IHasDateTime
    {
        void NormalizeToUtc();
    }

}
