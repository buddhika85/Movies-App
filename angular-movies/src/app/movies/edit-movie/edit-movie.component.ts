import {
  Component,
  inject,
  Input,
  numberAttribute,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MovieCreationDto, MovieDto } from '../../shared/models/movies.models';
import { Router } from '@angular/router';
import { MoviesFormComponent } from '../movies-form/movies-form.component';
import { MultipleSelectorDto } from '../../shared/models/multipleSelector.models';

@Component({
  selector: 'app-edit-movie',
  standalone: true,
  imports: [MoviesFormComponent],
  templateUrl: './edit-movie.component.html',
  styleUrl: './edit-movie.component.scss',
})
export class EditMovieComponent implements OnChanges, OnInit {
  private router: Router = inject(Router);
  @Input({ transform: numberAttribute }) id!: number;

  movieToEdit!: MovieDto;

  nonSelectedGenres!: MultipleSelectorDto[];
  selectedGenres!: MultipleSelectorDto[];

  ngOnInit(): void {
    // To Do: get from DB
    const all: MultipleSelectorDto[] = [
      { key: 1, description: 'Drama' },
      { key: 2, description: 'Action' },
      { key: 3, description: 'Comedy' },
    ];

    if (this.movieToEdit.genreIds) {
      this.nonSelectedGenres = all.filter(
        (x) =>
          !this.movieToEdit.genreIds?.some(
            (selectedGenre) => selectedGenre === x.key
          )
      );
      this.selectedGenres = all.filter((x) =>
        this.movieToEdit.genreIds?.some(
          (selectedGenre) => selectedGenre === x.key
        )
      );
    } else {
      this.nonSelectedGenres = all;
      this.selectedGenres = [];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // To Do: get from DB
    this.movieToEdit = {
      id: this.id,
      title: 'Spider Man Far From  Home',
      releaseDate: new Date('2019-07-22'),
      trailer: 'abcd',
      poster:
        'https://upload.wikimedia.org/wikipedia/en/b/bd/Spider-Man_Far_From_Home_poster.jpg',
      genreIds: [1, 3],
    };
  }

  saveChanges(movie: MovieCreationDto) {
    console.log('Editing movie ', movie);
    //this.router.navigate(['']); // go to landing page
  }
}
