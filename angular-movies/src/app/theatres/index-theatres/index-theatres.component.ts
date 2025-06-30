import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-index-theatres',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './index-theatres.component.html',
  styleUrl: './index-theatres.component.scss',
})
export class IndexTheatresComponent {}
