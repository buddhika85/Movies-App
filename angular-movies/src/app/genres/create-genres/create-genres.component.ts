import { Component, inject } from '@angular/core';

import { GenresFormComponent } from '../genres-form/genres-form.component';
import { Router } from '@angular/router';
import { GenreCreationDto, GenreDto } from '../../shared/models/genre.models';
import { GenresService } from '../../shared/services/genres.service';
import { extractErrors } from '../../shared/functions/extractErrors';
import { DisplayErrorComponent } from '../../shared/components/display-error/display-error.component';

@Component({
  selector: 'app-create-genres',
  standalone: true,
  imports: [GenresFormComponent, DisplayErrorComponent],
  templateUrl: './create-genres.component.html',
  styleUrl: './create-genres.component.scss',
})
export class CreateGenresComponent {
  private router: Router = inject(Router);
  private genreService: GenresService = inject(GenresService);
  errors: string[] = [];

  saveChanges(genre: GenreCreationDto) {
    this.errors = [];
    this.genreService.create(genre).subscribe({
      next: (data: GenreDto) => {
        this.router.navigate(['/genres']);
      },
      error: (error) => {
        //console.log('genre creation error', error);
        this.errors = extractErrors(error);
      },
    });
  }
}
