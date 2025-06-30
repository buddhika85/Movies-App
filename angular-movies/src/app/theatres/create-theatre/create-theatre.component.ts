import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-theatre',
  standalone: true,
  imports: [],
  templateUrl: './create-theatre.component.html',
  styleUrl: './create-theatre.component.scss',
})
export class CreateTheatreComponent {
  private router: Router = inject(Router);

  saveChanges() {
    this.router.navigate(['/theatres']);
  }
}
