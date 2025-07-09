using MoviesAPI.Entities;

namespace MoviesAPI
{
    public interface IInMemoryRepository
    {
        Task AddGenreAsync(Genre genre);
        Task DeletedGenreAsync(Genre genre);
        Task<bool> GenreWithSameNameExists(string title);
        Task<IEnumerable<Genre>> GetAllGenresAsync();
        Task<Genre?> GetGenreByIdAsync(int id);
        Task<Genre?> SearchGenreAsync(int id, string name);
        Task UpdateGenreAsync(Genre genre);
    }
}