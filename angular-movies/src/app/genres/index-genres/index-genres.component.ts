import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-index-genres',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './index-genres.component.html',
  styleUrl: './index-genres.component.scss',
})
export class IndexGenresComponent {}
