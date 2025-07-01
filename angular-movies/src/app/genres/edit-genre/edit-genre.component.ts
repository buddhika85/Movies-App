import { Component, inject, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GenreCreationDto, GenreDto } from '../../shared/models/genre.models';
import { Router } from '@angular/router';
import { GenresFormComponent } from '../genres-form/genres-form.component';

@Component({
  selector: 'app-edit-genre',
  standalone: true,
  imports: [GenresFormComponent],
  templateUrl: './edit-genre.component.html',
  styleUrl: './edit-genre.component.scss',
})
export class EditGenreComponent {
  @Input() id!: number; // URL Route Values Reading

  // TO DO: get this model from DB
  model: GenreDto = { id: this.id, title: 'Action' };

  private router: Router = inject(Router);

  saveChanges(genre: GenreCreationDto) {
    console.log('Edit');
    console.log(genre);
    this.router.navigate(['/genres']);
  }
}
