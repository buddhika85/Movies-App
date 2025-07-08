import { BaseDto } from './base.models';

export interface ActorDto extends BaseDto {
  name: string;
  dateOfBirth: Date;
  picture?: string;
}

export interface ActorCreationDto {
  name: string;
  dateOfBirth: Date;
  picture?: File | string | null;
}

export interface ActorsAutoCompleteDto extends BaseDto {
  name: string;
  character: string;
  picture: string;
}
