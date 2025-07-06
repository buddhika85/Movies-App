import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TheatresFormComponent } from '../theatres-form/theatres-form.component';

@Component({
  selector: 'app-create-theatre',
  standalone: true,
  imports: [TheatresFormComponent],
  templateUrl: './create-theatre.component.html',
  styleUrl: './create-theatre.component.scss',
})
export class CreateTheatreComponent {
  private router: Router = inject(Router);

  saveChanges() {
    this.router.navigate(['/theatres']);
  }
}
