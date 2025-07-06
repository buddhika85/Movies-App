import { Component, inject, OnInit } from '@angular/core';
import { GenreDto } from '../../shared/models/genre.models';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-movie-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './movie-search.component.html',
  styleUrl: './movie-search.component.scss',
})
export class MovieSearchComponent implements OnInit {
  genres!: GenreDto[];

  private formBuilder: FormBuilder = inject(FormBuilder);
  formGroup!: FormGroup<{
    title: FormControl<string | null>;
    genre: FormControl<number>;
    upcomingReleases: FormControl<boolean>;
    inTheatres: FormControl<boolean>;
  }>;

  ngOnInit(): void {
    // To Do: get from DB
    this.genres = [
      { id: 1, title: 'Action' },
      { id: 2, title: 'Comedy' },
      { id: 3, title: 'Adventure' },
    ];

    this.formGroup = this.formBuilder.group({
      title: this.formBuilder.control('', {
        nonNullable: false,
        validators: [],
      }),
      genre: this.formBuilder.control(0, { nonNullable: true, validators: [] }),
      upcomingReleases: this.formBuilder.control(false, {
        nonNullable: true,
        validators: [],
      }),
      inTheatres: this.formBuilder.control(false, {
        nonNullable: true,
        validators: [],
      }),
    });
  }

  get title(): FormControl<string | null> {
    return this.formGroup.controls.title;
  }

  get genre(): FormControl<number> {
    return this.formGroup.controls.genre;
  }

  get upcomingReleases(): FormControl<boolean> {
    return this.formGroup.controls.upcomingReleases;
  }

  get inTheatres(): FormControl<boolean> {
    return this.formGroup.controls.upcomingReleases;
  }

  onReset(): void {
    this.formGroup.reset();
  }

  onSubmit(): void {
    console.log('Movies search ', this.formGroup.value);
  }
}
