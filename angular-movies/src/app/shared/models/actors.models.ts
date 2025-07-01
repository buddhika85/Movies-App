import { BaseDto } from './base.models';

export interface ActorDto extends BaseDto {
  name: string;
  dateOfBirth: Date;
}

export interface ActorCreationDto {
  name: string;
  dateOfBirth: Date;
}
