using MoviesAPI.Entities;

namespace MoviesAPI.Data.RepositoryInterfaces
{
    public interface IGenreRepository
    {
        Task<Genre> AddGenreAsync(Genre genre);
        Task<Genre> DeleteGenreAsync(Genre genre);
        Task<bool> GenreWithSameNameExists(string title);
        Task<IEnumerable<Genre>> GetAllGenresAsync();
        Task<Genre?> GetGenreByIdAsync(int id);
        Task<Genre?> SearchGenreAsync(int id, string name);
        Task UpdateGenreAsync(Genre genre);
    }
}
