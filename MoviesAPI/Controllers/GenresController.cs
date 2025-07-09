using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;
using MoviesAPI.Entities;
using MoviesAPI.Filters;

namespace MoviesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenresController : APIBaseController
    {
        private readonly IInMemoryRepository inMemoryRepository;

        public GenresController(IInMemoryRepository inMemoryRepository)
        {
            this.inMemoryRepository = inMemoryRepository;
        }

        [EndpointSummary("Gets all genres")]
        [ProducesResponseType(typeof(IEnumerable<Genre>), StatusCodes.Status200OK)]
        [HttpGet]
        [OutputCache]       // this is configured to keep 15 seconds in Program.cs
        public async Task<ActionResult<IEnumerable<Genre>>> Get() => Ok(await inMemoryRepository.GetAllGenresAsync());


        [EndpointSummary("Gets genre by ID")]
        [ProducesResponseType(typeof(Genre), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]

        // Execute filter ConsoleLoggerFilter before and after this endpoint exceution
        //[ServiceFilter(typeof(ConsoleLoggerFilter))]
        [ServiceFilter(typeof(LoggerFilter))]
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Genre>> Get([FromRoute] int id)
        {
            if (id <= 0)
            {
                return ValidationError("id", $"{id} is invalid for Id");
            }

            var entity = await inMemoryRepository.GetGenreByIdAsync(id);
            if (entity == null)
                return NotFoundError("genre not found", $"Id {id} entity unavailable");

            return Ok(entity);
        }

        [ProducesResponseType(typeof(Genre), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpGet("SearchGenre/{id:int}")]
        public async Task<ActionResult<Genre>> Get([FromRoute] int id, [FromQuery] string name)
        {
            if (id <= 0)
            {
                return ValidationError("id", $"{id} is invalid for Id");
            }

            var entity = await inMemoryRepository.SearchGenreAsync(id, name);
            if (entity == null)
                return NotFoundError("genre not found", $"Id {id} and name {name} entity unavailable");

            return Ok(entity);
        }

        [ProducesResponseType(typeof(Genre), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpPost]
        public async Task<ActionResult<Genre>> Post([FromBody] Genre genre)
        {
            if (genre == null)
            {
                return ValidationError("genre", "genre value is mandatory");
            }
            if (await inMemoryRepository.GenreWithSameNameExists(genre.Title))
            {
                return ValidationError("title", $"genre with same title {genre.Title} already exists");
            }
            await inMemoryRepository.AddGenreAsync(genre);
            return CreatedAtAction(nameof(Get), new { id = genre.Id }, genre);      //same as Created($"/api/genres/{genre.Id}", genre);
        }

        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put([FromRoute] int id, [FromBody] Genre genre)
        {
            if (id <= 0)
            {
                return ValidationError("id", $"{id} is invalid for Id");
            }
            if (id != genre.Id)
            {
                return ValidationError("id", $"{id} and {genre.Id} do not match");
            }

            var entity = await inMemoryRepository.GetGenreByIdAsync(id);
            if (entity == null)
            {
                return NotFoundError("genre not found", $"Id {id} entity unavailable");
            }

            await inMemoryRepository.UpdateGenreAsync(genre);
            return NoContent();
        }

        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpDelete("{id:int}")]
        public async Task<ActionResult<Genre>> Delete([FromRoute] int id)
        {
            if (id <= 0)
            {
                return ValidationError("id", $"{id} is invalid for Id");
            }
            var entity = await inMemoryRepository.GetGenreByIdAsync(id);
            if (entity == null)
            {
                return NotFoundError("genre not found", $"Id {id} entity unavailable");
            }

            await inMemoryRepository.DeletedGenreAsync(entity);
            return Ok(entity);
        }
    }
}
