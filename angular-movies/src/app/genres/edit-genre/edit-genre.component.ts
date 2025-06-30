import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-edit-genre',
  standalone: true,
  imports: [],
  templateUrl: './edit-genre.component.html',
  styleUrl: './edit-genre.component.scss',
})
export class EditGenreComponent {
  @Input() id!: number; // URL Route Values Reading
}
