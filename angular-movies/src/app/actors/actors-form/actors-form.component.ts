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
import { ActorCreationDto, ActorDto } from '../../shared/models/actors.models';
import { firstLetterShouldBeUppercase } from '../../shared/validators/validators';
import moment from 'moment';

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
    dateOfBirth: FormControl<string>;
  }>;

  @Input()
  model!: ActorDto | null;

  @Output()
  postFormEmitter: EventEmitter<ActorCreationDto> =
    new EventEmitter<ActorCreationDto>();

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
      dateOfBirth: this.formBuilder.control<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });

    // debugger;
    if (this.model !== null) {
      const dob = moment(this.model.dateOfBirth).format('YYYY-MM-DD');
      this.formGroup.patchValue({
        ...this.model,
        dateOfBirth: dob,
      });
    }
  }

  get name(): FormControl<string> {
    return this.formGroup.controls.name;
  }

  get dateOfBirth(): FormControl<string> {
    return this.formGroup.controls.dateOfBirth;
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      console.log('Invalid form submission');
      return;
    }

    const actor: ActorCreationDto = {
      name: this.formGroup.controls.name.value,
      dateOfBirth: moment(this.formGroup.controls.dateOfBirth.value).toDate(),
    };

    this.postFormEmitter.emit(actor);
  }

  onReset(): void {
    this.formGroup.reset();
  }
}
