import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-genres',
  standalone: true,
  imports: [],
  templateUrl: './create-genres.component.html',
  styleUrl: './create-genres.component.scss',
})
export class CreateGenresComponent {
  router: Router = inject(Router);

  saveChanges() {
    this.router.navigate(['/genres']);

    // this.router.navigateByUrl('genres');  // another way
  }
}
