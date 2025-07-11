import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GenresService } from '../../shared/services/genres.service';
import { GenreDto } from '../../shared/models/genre.models';
import { Subscription } from 'rxjs';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-index-genres',
  standalone: true,
  imports: [RouterLink, MatTableModule],
  templateUrl: './index-genres.component.html',
  styleUrl: './index-genres.component.scss',
})
export class IndexGenresComponent implements OnInit, OnDestroy {
  private genreService: GenresService = inject(GenresService);
  private subcription!: Subscription;
  genres!: GenreDto[];

  columnsToDisplay = ['id', 'name', 'actions'];

  ngOnInit(): void {
    this.subcription = this.genreService.getAll().subscribe({
      next: (data) => {
        this.genres = data;
      },
      error: (error) => {
        console.log('error getting all genres', error);
      },
      complete: () => {},
    });
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }
}
