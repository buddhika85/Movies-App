using MoviesAPI.DTOs;
using MoviesAPI.Entities;

namespace MoviesAPI.Extensions;

public static class MappingExtensions
{
    public static GenreDto ToDto(this Genre entity)
    {
        return new GenreDto { Title = entity.Title };
    }

    public static Genre ToEntity(this GenreDto dto)
    {
        return new Genre { Title = dto.Title };
    }
}
