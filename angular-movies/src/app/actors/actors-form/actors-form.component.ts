import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-actors-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './actors-form.component.html',
  styleUrl: './actors-form.component.scss',
})
export class ActorsFormComponent implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);
  formGroup!: FormGroup<{
    name: FormControl<string>;
    dateOfBirth: FormControl<Date | null>;
  }>;

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: this.formBuilder.control<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(2)],
      }),
      dateOfBirth: this.formBuilder.control<Date | null>(null, {
        nonNullable: false,
        validators: [],
      }),
    });
  }

  get name(): FormControl<string> {
    return this.formGroup.controls.name;
  }

  get dateOfBirth(): FormControl<Date | null> {
    return this.formGroup.controls.dateOfBirth;
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      console.log('Invalid form submission');
      return;
    }

    console.log(this.formGroup.value);
  }

  onReset(): void {
    this.formGroup.reset();
  }
}
