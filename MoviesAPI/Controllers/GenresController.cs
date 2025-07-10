using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;
using MoviesAPI.DTOs;
using MoviesAPI.Entities;
using MoviesAPI.Filters;
using MoviesAPI.Services.Interfaces;

namespace MoviesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenresController : APIBaseController
    {
        private readonly IOutputCacheStore outputCacheStore;
        private readonly IConfiguration configuration;
        private readonly IGenreService service;
        private const string cacheTag = "genres";

        public GenresController(IOutputCacheStore outputCacheStore, IConfiguration configuration, IGenreService service)
        {
            this.outputCacheStore = outputCacheStore;
            this.configuration = configuration;
            this.service = service;
        }

        [HttpGet("/get-configs-test")]
        public ActionResult TestConfigurations()
        {
            //return Ok(configuration.GetValue<string>("ConnectionStrings:default"));
            return Ok(configuration["ConnectionStrings:DefaultConnection"]);
        }


        [EndpointSummary("Gets all genres")]
        [ProducesResponseType(typeof(IEnumerable<Genre>), StatusCodes.Status200OK)]
        [HttpGet]
        [OutputCache(Tags = [cacheTag])]       // this is configured to keep 15 seconds in Program.cs
        public async Task<ActionResult<IEnumerable<GenreDto>>> Get() => Ok(await service.GetAllGenresAsync());


        [EndpointSummary("Gets genre by ID")]
        [ProducesResponseType(typeof(Genre), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [OutputCache(Tags = [cacheTag])]       // this is configured to keep 15 seconds in Program.cs
        // Execute filter ConsoleLoggerFilter before and after this endpoint exceution
        //[ServiceFilter(typeof(ConsoleLoggerFilter))]
        [ServiceFilter(typeof(LoggerFilter))]
        [HttpGet("{id:int}", Name = "GetGenreById")]
        public async Task<ActionResult<GenreDto>> Get([FromRoute] int id)
        {
            if (id <= 0)
            {
                return ValidationError("id", $"{id} is invalid for Id");
            }

            var dto = await service.GetGenreByIdAsync(id);
            if (dto == null)
                return NotFoundError("genre not found", $"Id {id} entity unavailable");

            return Ok(dto);
        }



        [ProducesResponseType(typeof(Genre), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [OutputCache(Tags = [cacheTag])]
        [HttpGet("SearchGenre/{id:int}")]
        public async Task<ActionResult<GenreDto>> Get([FromRoute] int id, [FromQuery] string name)
        {
            if (id <= 0)
            {
                return ValidationError("id", $"{id} is invalid for Id");
            }

            var dto = await service.SearchGenreAsync(id, name);
            if (dto == null)
                return NotFoundError("genre not found", $"Id {id} and name {name} entity unavailable");

            return Ok(dto);
        }



        [ProducesResponseType(typeof(Genre), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpPost]
        public async Task<ActionResult<Genre>> Post([FromBody] GenreDto genre)
        {
            if (genre == null)
            {
                return ValidationError("genre", "genre value is mandatory");
            }
            //if (await service.GenreWithSameNameExists(genre.Title))
            //{
            //    return ValidationError("title", $"genre with same title {genre.Title} already exists");
            //}
            genre = await service.AddGenreAsync(genre);
            await outputCacheStore.EvictByTagAsync(cacheTag, default);
            return CreatedAtRoute("GetGenreById", new { id = genre.Id }, genre);      //same as Created($"/api/genres/{genre.Id}", genre);
        }



        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put([FromRoute] int id, [FromBody] GenreDto genre)
        {
            if (id <= 0)
            {
                return ValidationError("id", $"{id} is invalid for Id");
            }
            if (id != genre.Id)
            {
                return ValidationError("id", $"{id} and {genre.Id} do not match");
            }

            var dto = await service.GetGenreByIdAsync(id);
            if (dto == null)
            {
                return NotFoundError("genre not found", $"Id {id} entity unavailable");
            }

            await service.UpdateGenreAsync(genre);
            await outputCacheStore.EvictByTagAsync(cacheTag, default);
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
            var dto = await service.GetGenreByIdAsync(id);
            if (dto == null)
            {
                return NotFoundError("genre not found", $"Id {id} entity unavailable");
            }

            dto = await service.DeleteGenreAsync(dto);
            await outputCacheStore.EvictByTagAsync(cacheTag, default);
            return Ok(dto);
        }
    }
}
