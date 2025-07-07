using Microsoft.AspNetCore.Mvc.Filters;

namespace MoviesAPI.Filters
{
    public class LoggerFilter : IActionFilter
    {
        private readonly ILogger<LoggerFilter> logger;

        public LoggerFilter(ILogger<LoggerFilter> logger)
        {
            this.logger = logger;
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            logger.Log(LogLevel.Information, FormattedLogMessage($"Action Method {context.ActionDescriptor.DisplayName} Ends at {DateTime.Now}"));
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            logger.Log(LogLevel.Information, FormattedLogMessage($"Action Method {context.ActionDescriptor.DisplayName} Starting at {DateTime.Now}"));
        }

        private string FormattedLogMessage(string message)
            => $">>                                 LOGGER FILTER                               >>{Environment.NewLine}{message}";
    }
}
