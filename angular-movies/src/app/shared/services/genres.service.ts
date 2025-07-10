import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GenreDto } from '../models/genre.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenresService {
  private httpClient: HttpClient = inject(HttpClient);

  public getAll(): Observable<GenreDto[]> {
    return this.httpClient.get<GenreDto[]>('https://localhost:7045/api/Genres');
  }
}
