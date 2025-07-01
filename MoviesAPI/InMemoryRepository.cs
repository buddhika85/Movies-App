using MoviesAPI.Entities;

namespace MoviesAPI
{
    public class InMemoryRepository
    {
        private List<Genre> genres;

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
            await Task.Delay(TimeSpan.FromMilliseconds(5000));
            return genres;
        }

        public async Task<Genre?> GetGenreByIdAsync(int id)
        {
            await Task.Delay(TimeSpan.FromMilliseconds(3000));
            return genres.SingleOrDefault(x => x.Id == id);
        }

        public async Task<Genre?> SearchGenreAsync(int id, string name)
        {
            await Task.Delay(TimeSpan.FromMilliseconds(3000));
            return genres.SingleOrDefault(x => x.Id == id && x.Title.Equals(name, StringComparison.OrdinalIgnoreCase));
        }

        public async Task AddGenreAsync(Genre genre)
        {
            await Task.Delay(TimeSpan.FromMilliseconds(3000));
            genre.Id = genres.Max(x => x.Id) + 1;
            genres.Add(genre);
        }

        public async Task UpdateGenreAsync(Genre genre)
        {
            await Task.Delay(TimeSpan.FromMilliseconds(3000));
            var entity = await GetGenreByIdAsync(genre.Id);
            if (entity != null)
            {
                entity.Title = genre.Title;
            }
        }
    }
}
