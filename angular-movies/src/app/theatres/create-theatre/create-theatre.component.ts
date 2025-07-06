import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TheatresFormComponent } from '../theatres-form/theatres-form.component';
import { TheatreCreationDto } from '../../shared/models/theatres.models';

@Component({
  selector: 'app-create-theatre',
  standalone: true,
  imports: [TheatresFormComponent],
  templateUrl: './create-theatre.component.html',
  styleUrl: './create-theatre.component.scss',
})
export class CreateTheatreComponent {
  private router: Router = inject(Router);

  createTheatre(theatre: TheatreCreationDto) {
    console.log('Create theatre');
    console.log(theatre);
    this.router.navigate(['\theatres']);
  }
}
