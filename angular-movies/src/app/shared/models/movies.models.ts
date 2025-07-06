export interface MoviesSearchDto {
  title: string | null;
  genreId: number;
  upcomingReleases: boolean;
  inTheatres: boolean;
}
