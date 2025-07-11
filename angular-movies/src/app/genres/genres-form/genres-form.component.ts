import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { GenreCreationDto, GenreDto } from '../../shared/models/genre.models';
import { firstLetterShouldBeUppercase } from '../../shared/validators/validators';

@Component({
  selector: 'app-genres-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './genres-form.component.html',
  styleUrl: './genres-form.component.scss',
})
export class GenresFormComponent implements OnInit {
  private router: Router = inject(Router);
  formError: string = '';

  @Input() genreToEdit!: GenreDto | null;

  @Output() postFormEmitter: EventEmitter<GenreCreationDto> =
    new EventEmitter<GenreCreationDto>();

  private formBuilder: FormBuilder = inject(FormBuilder);
  formGroup!: FormGroup<{ title: FormControl<string> }>;

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      title: this.formBuilder.control('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(2),
          firstLetterShouldBeUppercase(), // custom validator
        ],
      }),
    });

    // edit data population
    if (this.genreToEdit !== null) {
      this.formGroup.patchValue(this.genreToEdit);
    }
  }

  get title(): FormControl<string> {
    return this.formGroup.controls.title;
  }

  saveChanges() {
    if (this.formGroup.valid) {
      this.formError = '';
      const genre = this.formGroup.value as GenreCreationDto;
      this.postFormEmitter.emit(genre);
    } else {
      this.formError = 'Please check form errors';
    }
  }
}
