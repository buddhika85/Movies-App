import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GenreCreationDto, GenreDto } from '../models/genre.models';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GenresService {
  private httpClient: HttpClient = inject(HttpClient);
  private baseUrl: string = `${environment.apiURL}/Genres`;

  public getAll(): Observable<GenreDto[]> {
    return this.httpClient.get<GenreDto[]>(this.baseUrl);
  }

  public create(genre: GenreCreationDto): Observable<GenreDto> {
    return this.httpClient.post<GenreDto>(this.baseUrl, genre);
  }
}
