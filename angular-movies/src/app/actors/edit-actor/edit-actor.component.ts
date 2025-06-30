import { Component, Input, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-edit-actor',
  standalone: true,
  imports: [],
  templateUrl: './edit-actor.component.html',
  styleUrl: './edit-actor.component.scss',
})
export class EditActorComponent {
  @Input({ transform: numberAttribute }) id!: number;
}
