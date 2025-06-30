import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-actor',
  standalone: true,
  imports: [],
  templateUrl: './create-actor.component.html',
  styleUrl: './create-actor.component.scss',
})
export class CreateActorComponent {
  private router: Router = inject(Router);
  saveChanges() {
    this.router.navigate(['/actors']);
  }
}
