import { BaseDto } from './base.models';

export interface TheatreCreationDto {
  name: string;
}

export interface TheatreDto extends BaseDto {
  name: string;
}
