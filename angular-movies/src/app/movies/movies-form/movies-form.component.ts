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
import { firstLetterShouldBeUppercase } from '../../shared/validators/validators';
import { MovieCreationDto, MovieDto } from '../../shared/models/movies.models';
import moment from 'moment';
import { toBase64 } from '../../shared/functions/toBase64';
import { InputImageComponent } from '../../shared/components/input-image/input-image.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputImageComponent],
  templateUrl: './movies-form.component.html',
  styleUrl: './movies-form.component.scss',
})
export class MoviesFormComponent implements OnInit {
  @Input()
  movieToEdit!: MovieDto | null;

  @Output()
  postFormData: EventEmitter<MovieCreationDto> =
    new EventEmitter<MovieCreationDto>();

  private FormBuilder: FormBuilder = inject(FormBuilder);
  formGroup!: FormGroup<{
    title: FormControl<string>;
    releaseDate: FormControl<string>;
    trailer: FormControl<string | null>;
    poster: FormControl<File | string | null>;
  }>;

  private router: Router = inject(Router);

  ngOnInit(): void {
    this.formGroup = this.FormBuilder.group({
      title: this.FormBuilder.control('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(2),
          firstLetterShouldBeUppercase(),
        ],
      }),

      releaseDate: this.FormBuilder.control('', {
        nonNullable: true,
      }),

      trailer: this.FormBuilder.control<string | null>(null, {
        nonNullable: false,
      }),

      poster: this.FormBuilder.control<File | string | null>(null, {
        nonNullable: false,
      }),
    });

    if (this.movieToEdit !== null) {
      const releaseDate = moment(this.movieToEdit.releaseDate).format(
        'YYYY-MM-DD'
      );
      this.formGroup.patchValue({
        ...this.movieToEdit,
        releaseDate: releaseDate,
      });
    }
  }

  get title(): FormControl<string> {
    return this.formGroup.controls.title;
  }

  get releaseDate(): FormControl<string> {
    return this.formGroup.controls.releaseDate;
  }

  get trailer(): FormControl<string | null> {
    return this.formGroup.controls.trailer;
  }

  get poster(): FormControl<File | string | null> {
    return this.formGroup.controls.poster;
  }

  onImageReceive(file: File): void {
    this.formGroup.controls.poster.setValue(file);
  }

  onSubmit(): void {
    //console.log(this.formGroup.value);

    const movie: MovieCreationDto = {
      title: this.title.value,
      releaseDate: moment(this.releaseDate.value).toDate(),
      trailer: this.trailer.value,
    };

    if (typeof this.formGroup.controls.poster.value !== 'string') {
      movie.poster = this.formGroup.controls.poster.value;
    } else {
      movie.poster = undefined;
    }

    this.postFormData.emit(movie);
  }

  onReset(): void {
    this.formGroup.reset();
    this.router.navigate(['']);
  }
}
