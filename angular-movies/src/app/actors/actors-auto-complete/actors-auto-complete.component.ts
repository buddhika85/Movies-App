import { Component, OnInit } from '@angular/core';
import { ActorsAutoCompleteDto } from '../../shared/models/actors.models';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
@Component({
  selector: 'app-actors-auto-complete',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatAutocompleteModule,
    MatIconModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './actors-auto-complete.component.html',
  styleUrl: './actors-auto-complete.component.scss',
})
export class ActorsAutoCompleteComponent implements OnInit {
  actorsOrginal!: ActorsAutoCompleteDto[];
  actors!: ActorsAutoCompleteDto[];
  actorsSelected: ActorsAutoCompleteDto[] = [];

  control: FormControl = new FormControl();

  columnsToDisplay: string[] = ['image', 'name', 'character', 'action'];

  ngOnInit(): void {
    // To Do: take from DB
    this.actors = [
      {
        id: 1,
        name: 'Tom Holland',
        character: '',
        picture:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Tom_Holland_by_Gage_Skidmore.jpg/330px-Tom_Holland_by_Gage_Skidmore.jpg',
      },
      {
        id: 2,
        name: 'Tom Hanks',
        character: '',
        picture:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Tom_Hanks_TIFF_2019.jpg/220px-Tom_Hanks_TIFF_2019.jpg',
      },
      {
        id: 3,
        name: 'Samuel L. Jackson',
        character: '',
        picture:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/SamuelLJackson.jpg/250px-SamuelLJackson.jpg',
      },
    ];

    this.actorsOrginal = this.actors;

    // value changes subscription
    this.control.valueChanges.subscribe((value) => {
      this.actors = this.actorsOrginal;
      const typedInput = (value ?? '').toString();
      this.actors = this.actors.filter((x) =>
        x.name.toLowerCase().includes(typedInput.toLowerCase())
      );
    });
  }

  handleSelection(event: MatAutocompleteSelectedEvent) {
    this.actorsSelected.push(event.option.value);
    this.control.patchValue('');
  }

  delete(actor: ActorsAutoCompleteDto) {
    const index = this.actors.findIndex(
      (x: ActorsAutoCompleteDto) => x.id === actor.id
    );
    if (index !== -1) this.actors.splice(index, 1);
  }
}
