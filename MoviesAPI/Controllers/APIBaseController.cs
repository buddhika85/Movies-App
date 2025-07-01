using Microsoft.AspNetCore.Mvc;

namespace MoviesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class APIBaseController : ControllerBase
    {
        protected ActionResult ValidationError(string field, string message)
        {
            var problemDetails = new ValidationProblemDetails(new Dictionary<string, string[]>
            {
                [field] = new string[] { message },
            });
            return new BadRequestObjectResult(problemDetails);
        }

        protected ActionResult NotFoundError(string title, string detail)
        {
            return NotFound(new ProblemDetails
            {
                Title = title,
                Detail = detail,
                Status = StatusCodes.Status404NotFound
            });
        }
    }
}
