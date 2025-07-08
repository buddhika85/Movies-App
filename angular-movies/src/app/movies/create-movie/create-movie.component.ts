import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesFormComponent } from '../movies-form/movies-form.component';
import { MovieCreationDto } from '../../shared/models/movies.models';
import { MultipleSelectorDto } from '../../shared/models/multipleSelector.models';

@Component({
  selector: 'app-create-movie',
  standalone: true,
  imports: [MoviesFormComponent],
  templateUrl: './create-movie.component.html',
  styleUrl: './create-movie.component.scss',
})
export class CreateMovieComponent implements OnInit {
  private router: Router = inject(Router);

  selectedGenres: MultipleSelectorDto[] = [];
  nonSelectedGenres!: MultipleSelectorDto[];

  selectedTheatres: MultipleSelectorDto[] = [];
  nonSelectedTheatres!: MultipleSelectorDto[];

  ngOnInit(): void {
    // To Do: get from DB
    this.nonSelectedGenres = [
      { key: 1, description: 'Drama' },
      { key: 2, description: 'Action' },
      { key: 3, description: 'Comedy' },
    ];
    // To Do: get from DB
    this.nonSelectedTheatres = [
      { key: 1, description: 'Theatre X' },
      { key: 2, description: 'Theatre Y' },
      { key: 3, description: 'Theatre Z' },
    ];
  }

  saveChanges(movie: MovieCreationDto) {
    console.log('Creating movie ', movie);
    //this.router.navigate(['']); // go to landing page
  }
}
