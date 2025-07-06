import {
  Component,
  Input,
  numberAttribute,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { TheatresFormComponent } from '../theatres-form/theatres-form.component';
import {
  TheatreCreationDto,
  TheatreDto,
} from '../../shared/models/theatres.models';

@Component({
  selector: 'app-edit-theatre',
  standalone: true,
  imports: [TheatresFormComponent],
  templateUrl: './edit-theatre.component.html',
  styleUrl: './edit-theatre.component.scss',
})
export class EditTheatreComponent implements OnChanges {
  @Input({ transform: numberAttribute }) id!: number;
  theatreToEdit!: TheatreDto;

  ngOnChanges(changes: SimpleChanges): void {
    // To do: get theatre from DB
    this.theatreToEdit = { id: this.id, name: 'Blacktown IMAX' };
  }

  editTheatre(theatre: TheatreCreationDto) {
    console.log('Edit theatre');
    console.log(theatre);
  }
}
