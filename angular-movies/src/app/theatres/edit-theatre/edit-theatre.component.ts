import { Component, Input, numberAttribute } from '@angular/core';
import { TheatresFormComponent } from '../theatres-form/theatres-form.component';

@Component({
  selector: 'app-edit-theatre',
  standalone: true,
  imports: [TheatresFormComponent],
  templateUrl: './edit-theatre.component.html',
  styleUrl: './edit-theatre.component.scss',
})
export class EditTheatreComponent {
  @Input({ transform: numberAttribute }) id!: number;
}
