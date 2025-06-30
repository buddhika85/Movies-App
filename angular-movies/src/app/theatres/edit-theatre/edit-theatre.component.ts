import { Component, Input, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-edit-theatre',
  standalone: true,
  imports: [],
  templateUrl: './edit-theatre.component.html',
  styleUrl: './edit-theatre.component.scss',
})
export class EditTheatreComponent {
  @Input({ transform: numberAttribute }) id!: number;
}
