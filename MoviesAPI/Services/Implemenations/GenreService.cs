using MoviesAPI.Data.RepositoryInterfaces;
using MoviesAPI.DTOs;
using MoviesAPI.Extensions;
using MoviesAPI.Services.Interfaces;

namespace MoviesAPI.Services.Implemenations;

public class GenreService : IGenreService
{
    private readonly IGenreRepository repository;

    public GenreService(IGenreRepository repository)
    {
        this.repository = repository;
    }

    public async Task AddGenreAsync(GenreDto genre)
    {
        await repository.AddGenreAsync(genre.ToEntity());
    }

    public async Task DeleteGenreAsync(GenreDto genre)
    {
        await repository.DeleteGenreAsync(genre.ToEntity());
    }

    public async Task<bool> GenreWithSameNameExists(string title)
    {
        return await repository.GenreWithSameNameExists(title);
    }

    public async Task<IEnumerable<GenreDto>> GetAllGenresAsync()
    {
        var entities = await repository.GetAllGenresAsync();
        return entities.Select(x => x.ToDto());
    }

    public async Task<GenreDto?> GetGenreByIdAsync(int id)
    {
        var entity = await repository.GetGenreByIdAsync(id);
        if (entity != null)
            return entity.ToDto();
        return null;
    }

    public async Task<GenreDto?> SearchGenreAsync(int id, string name)
    {
        var entity = await repository.SearchGenreAsync(id, name);
        if (entity != null)
            return entity.ToDto();
        return null;
    }

    public async Task UpdateGenreAsync(GenreDto genre)
    {
        await repository.UpdateGenreAsync(genre.ToEntity());
    }
}
