import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ActorsFormComponent } from '../actors-form/actors-form.component';
import { ActorCreationDto } from '../../shared/models/actors.models';

@Component({
  selector: 'app-create-actor',
  standalone: true,
  imports: [ActorsFormComponent],
  templateUrl: './create-actor.component.html',
  styleUrl: './create-actor.component.scss',
})
export class CreateActorComponent {
  private router: Router = inject(Router);

  saveChanges(actor: ActorCreationDto) {
    console.log('Create New Actor');
    console.log(actor);
    this.router.navigate(['actors']);
  }
}
