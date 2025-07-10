using MoviesAPI.Data.Repositories;
using MoviesAPI.Entities;

namespace MoviesAPI
{
    public class InMemoryRepository : IInMemoryRepository
    {
        private List<Genre> genres;
        private TimeSpan artificalDelayTime = TimeSpan.FromMilliseconds(1000);

        public InMemoryRepository()
        {
            genres = new List<Genre>
            {
                new Genre { Id = 1, Title = "Comedy" },
                new Genre { Id = 2, Title = "Action" }
            };
        }

        public async Task<IEnumerable<Genre>> GetAllGenresAsync()
        {
            await Task.Delay(artificalDelayTime);
            return genres;
        }

        public async Task<Genre?> GetGenreByIdAsync(int id)
        {
            await Task.Delay(artificalDelayTime);
            return genres.SingleOrDefault(x => x.Id == id);
        }

        public async Task<Genre?> SearchGenreAsync(int id, string name)
        {
            await Task.Delay(artificalDelayTime);
            return genres.SingleOrDefault(x => x.Id == id && x.Title.Equals(name, StringComparison.OrdinalIgnoreCase));
        }

        public async Task AddGenreAsync(Genre genre)
        {
            await Task.Delay(artificalDelayTime);
            genre.Id = genres.Max(x => x.Id) + 1;
            genres.Add(genre);
        }

        public async Task UpdateGenreAsync(Genre genre)
        {
            await Task.Delay(artificalDelayTime);
            var entity = await GetGenreByIdAsync(genre.Id);
            if (entity != null)
            {
                entity.Title = genre.Title;
            }
        }

        public async Task DeletedGenreAsync(Genre genre)
        {
            await Task.Delay(artificalDelayTime);
            var entity = await GetGenreByIdAsync(genre.Id);
            if (entity != null)
            {
                genres.Remove(entity);
            }
        }

        public async Task<bool> GenreWithSameNameExists(string title)
        {
            await Task.Delay(artificalDelayTime);
            return genres.FirstOrDefault(x => x.Title.ToLower() == title.ToLower()) != null;
        }
    }
}
