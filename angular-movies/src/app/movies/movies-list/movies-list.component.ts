import {
  CurrencyPipe,
  DatePipe,
  NgFor,
  NgIf,
  //NgOptimizedImage,
  UpperCasePipe,
} from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, UpperCasePipe, NgIf, NgFor],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.scss',
})
export class MoviesListComponent {
  @Input({ required: true }) movies!: any[];

  addMovie(): void {
    this.movies.push({
      title: 'Inception',
      releaseDate: new Date('2012-05-03'),
      price: 500.99,
      poster: null,
    });
  }

  removeMovie(movie: any) {
    const indexToRemove = this.movies.findIndex(
      (x: any) => x.Title === movie.Title
    );
    this.movies.splice(indexToRemove, 1);
  }
}
