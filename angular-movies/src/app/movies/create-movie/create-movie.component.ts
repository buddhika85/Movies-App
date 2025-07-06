import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesFormComponent } from '../movies-form/movies-form.component';
import { MovieCreationDto } from '../../shared/models/movies.models';

@Component({
  selector: 'app-create-movie',
  standalone: true,
  imports: [MoviesFormComponent],
  templateUrl: './create-movie.component.html',
  styleUrl: './create-movie.component.scss',
})
export class CreateMovieComponent {
  private router: Router = inject(Router);

  saveChanges(movie: MovieCreationDto) {
    console.log('Creating movie ', movie);
    //this.router.navigate(['']); // go to landing page
  }
}
