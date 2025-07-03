import {
  Component,
  inject,
  Input,
  numberAttribute,
  OnInit,
} from '@angular/core';
import { ActorsFormComponent } from '../actors-form/actors-form.component';
import { ActorCreationDto, ActorDto } from '../../shared/models/actors.models';
import moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-actor',
  standalone: true,
  imports: [ActorsFormComponent],
  templateUrl: './edit-actor.component.html',
  styleUrl: './edit-actor.component.scss',
})
export class EditActorComponent implements OnInit {
  @Input({ transform: numberAttribute }) id!: number; // query string

  actorToEdit!: ActorDto;
  private router: Router = inject(Router);

  ngOnInit(): void {
    // TO DO: get actor from DB

    this.actorToEdit = {
      id: this.id,
      name: 'Tom Hanks',
      dateOfBirth: new Date('1948-05-25'),
      picture:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/TomHanksPrincEdw031223_%2811_of_41%29_%28cropped%29.jpg/250px-TomHanksPrincEdw031223_%2811_of_41%29_%28cropped%29.jpg',
    };
  }

  saveChanges(actor: ActorCreationDto) {
    console.log('Edit Actor');
    console.log(actor);
    this.router.navigate(['actors']);
  }
}
