import { BaseDto } from './base.models';

export interface GenreCreationDto {
  title: string;
}

export interface GenreDto extends BaseDto {
  title: string;
}
