import { Component, inject } from '@angular/core';

import { GenresFormComponent } from '../genres-form/genres-form.component';
import { Router } from '@angular/router';
import { GenreCreationDto } from '../../shared/models/genre.models';

@Component({
  selector: 'app-create-genres',
  standalone: true,
  imports: [GenresFormComponent],
  templateUrl: './create-genres.component.html',
  styleUrl: './create-genres.component.scss',
})
export class CreateGenresComponent {
  private router: Router = inject(Router);

  saveChanges(genre: GenreCreationDto) {
    console.log('Create');
    console.log(genre);
    this.router.navigate(['/genres']);
  }
}
