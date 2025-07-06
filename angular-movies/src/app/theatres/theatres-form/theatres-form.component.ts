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
import {
  TheatreCreationDto,
  TheatreDto,
} from '../../shared/models/theatres.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-theatres-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './theatres-form.component.html',
  styleUrl: './theatres-form.component.scss',
})
export class TheatresFormComponent implements OnInit {
  private router: Router = inject(Router);

  @Input()
  theatreToEdit!: TheatreDto | null;

  @Output()
  postForm: EventEmitter<TheatreCreationDto> =
    new EventEmitter<TheatreCreationDto>();

  private formBuilder: FormBuilder = inject(FormBuilder);
  formGroup!: FormGroup<{ name: FormControl<string> }>;

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: this.formBuilder.control<string>('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(2),
          firstLetterShouldBeUppercase(),
        ],
      }),
    });

    if (this.theatreToEdit !== null) {
      this.formGroup.patchValue(this.theatreToEdit);
    }
  }

  get name(): FormControl<string> {
    return this.formGroup.controls.name;
  }

  onReset(): void {
    this.formGroup.reset();
    this.router.navigate(['theatres']);
  }

  onSubmit(): void {
    //console.log(this.formGroup.value);
    if (this.formGroup.valid) {
      const theatre = this.formGroup.value as TheatreCreationDto;
      this.postForm.emit(theatre);
    }
  }
}
