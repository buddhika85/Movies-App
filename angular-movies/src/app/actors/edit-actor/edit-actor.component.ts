import { Component, Input, numberAttribute } from '@angular/core';
import { ActorsFormComponent } from '../actors-form/actors-form.component';

@Component({
  selector: 'app-edit-actor',
  standalone: true,
  imports: [ActorsFormComponent],
  templateUrl: './edit-actor.component.html',
  styleUrl: './edit-actor.component.scss',
})
export class EditActorComponent {
  @Input({ transform: numberAttribute }) id!: number;
}
