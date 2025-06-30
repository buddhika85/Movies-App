import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-movie',
  standalone: true,
  imports: [],
  templateUrl: './create-movie.component.html',
  styleUrl: './create-movie.component.scss',
})
export class CreateMovieComponent {
  private router: Router = inject(Router);

  saveChanges() {
    this.router.navigate(['']); // go to landing page
  }
}
