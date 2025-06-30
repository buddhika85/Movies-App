import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GenreDto } from '../../shared/models/genre-dto';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create-genres',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './create-genres.component.html',
  styleUrl: './create-genres.component.scss',
})
export class CreateGenresComponent implements OnInit {
  private router: Router = inject(Router);
  private genre: GenreDto = { title: '' };
  private formBuilder: FormBuilder = inject(FormBuilder);
  formGroup!: FormGroup<{ title: FormControl<string> }>;
  formError: string = '';

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      title: this.formBuilder.control(this.genre.title, {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(2)],
      }),
    });
  }

  get title(): FormControl<string> {
    return this.formGroup.controls.title;
  }

  saveChanges() {
    if (this.formGroup.invalid) {
      this.formError = 'Please check form errors';
      return;
    }
    console.log(this.formGroup.value);
    this.router.navigate(['/genres']);
    // this.router.navigateByUrl('genres');  // another way
  }
}
