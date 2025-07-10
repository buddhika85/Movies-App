using Microsoft.EntityFrameworkCore;
using MoviesAPI.Data.RepositoryInterfaces;
using MoviesAPI.Entities;

namespace MoviesAPI.Data.Repositories
{
    public class GenreRepository : IGenreRepository
    {
        private readonly ApplicationDbContext context;

        public GenreRepository(ApplicationDbContext dbContext)
        {
            context = dbContext;
        }

        public async Task<Genre> AddGenreAsync(Genre genre)
        {
            context.Genres.Add(genre);
            await context.SaveChangesAsync();
            return genre;
        }

        public async Task<Genre> DeleteGenreAsync(Genre genre)
        {
            var entityToDelete = await GetGenreByIdAsync(genre.Id);
            if (entityToDelete == null)
            {
                throw new ArgumentException($"Genre with Id {genre.Id} unavailable for deletion");
            }
            context.Remove(entityToDelete);
            await context.SaveChangesAsync();
            return genre;
        }

        public async Task<bool> GenreWithSameNameExists(string title)
        {

            return (await
                (from genre in context.Genres
                 where genre.Title.Equals(title, StringComparison.OrdinalIgnoreCase)
                 select genre)
                 .AsNoTracking()
                 .CountAsync()) > 0;
        }

        public async Task<IEnumerable<Genre>> GetAllGenresAsync()
        {
            return await
                (from genre in context.Genres
                 select genre)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Genre?> GetGenreByIdAsync(int id)
        {
            return await
                (from genre in context.Genres
                 where genre.Id == id
                 select genre)
                .FirstOrDefaultAsync();
        }

        public async Task<Genre?> SearchGenreAsync(int id, string name)
        {
            return await
                (from genre in context.Genres
                 where genre.Id == id && genre.Title.Equals(name, StringComparison.OrdinalIgnoreCase)
                 select genre)
                .AsNoTracking()
                .FirstOrDefaultAsync();
        }

        public async Task UpdateGenreAsync(Genre genre)
        {
            var entityToUpdate = await GetGenreByIdAsync(genre.Id);
            if (entityToUpdate == null)
            {
                throw new ArgumentException($"Genre with Id {genre.Id} unavailable for updates");
            }

            entityToUpdate.Title = genre.Title;
            await context.SaveChangesAsync();
        }
    }
}
