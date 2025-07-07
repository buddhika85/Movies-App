namespace MoviesAPI.Mddleware
{
    public class CustomExceptionMiddelware : IMiddleware
    {
        private readonly ILogger<CustomExceptionMiddelware> logger;

        public CustomExceptionMiddelware(ILogger<CustomExceptionMiddelware> logger)
        {
            this.logger = logger;
        }
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                logger.LogCritical("An Exception Occurred. The message is {message}", ex.Message);
            }
        }
    }
}
