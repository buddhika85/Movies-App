import { BaseDto } from './base.models';

export interface MoviesSearchDto {
  title: string | null;
  genreId: number;
  upcomingReleases: boolean;
  inTheatres: boolean;
}

export interface MovieCreationDto {
  title: string;
  releaseDate: Date;
  trailer?: string | null;
  poster?: File | string | null;
  genreIds?: number[];
}

export interface MovieDto extends BaseDto {
  title: string;
  releaseDate: Date;
  trailer?: string | null;
  poster?: string;
  genreIds?: number[];
}
