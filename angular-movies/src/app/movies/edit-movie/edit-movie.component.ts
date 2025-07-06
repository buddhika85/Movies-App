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

@Component({
  selector: 'app-edit-movie',
  standalone: true,
  imports: [MoviesFormComponent],
  templateUrl: './edit-movie.component.html',
  styleUrl: './edit-movie.component.scss',
})
export class EditMovieComponent implements OnChanges {
  private router: Router = inject(Router);
  @Input({ transform: numberAttribute }) id!: number;

  movieToEdit!: MovieDto;

  ngOnChanges(changes: SimpleChanges): void {
    // To Do: get from DB
    this.movieToEdit = {
      id: this.id,
      title: 'Spider Man Far From  Home',
      releaseDate: new Date('2019-07-22'),
      trailer: 'abcd',
      poster:
        'https://upload.wikimedia.org/wikipedia/en/b/bd/Spider-Man_Far_From_Home_poster.jpg',
    };
  }

  saveChanges(movie: MovieCreationDto) {
    console.log('Editing movie ', movie);
    //this.router.navigate(['']); // go to landing page
  }
}
