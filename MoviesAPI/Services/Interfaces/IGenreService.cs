using MoviesAPI.DTOs;

namespace MoviesAPI.Services.Interfaces
{
    public interface IGenreService
    {
        Task<GenreDto> AddGenreAsync(GenreDto genre);
        Task<GenreDto> DeleteGenreAsync(GenreDto genre);
        Task<bool> GenreWithSameNameExists(string title);
        Task<IEnumerable<GenreDto>> GetAllGenresAsync();
        Task<GenreDto?> GetGenreByIdAsync(int id);
        Task<GenreDto?> SearchGenreAsync(int id, string name);
        Task UpdateGenreAsync(GenreDto genre);
    }
}
