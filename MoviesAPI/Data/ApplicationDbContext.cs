using Microsoft.EntityFrameworkCore;
using MoviesAPI.Entities;

namespace MoviesAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Genre> Genres { get; set; }

        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{

        //    if (!Genres.Any())
        //    {
        //        modelBuilder.Entity<Genre>().HasData(new Genre { Title = "Action" }, new Genre { Title = "Comedy" });
        //    }

        //    SaveChanges();
        //}
    }
}
