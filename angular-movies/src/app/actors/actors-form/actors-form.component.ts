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
import {
  dateShouldBeInPast,
  firstLetterShouldBeUppercase,
} from '../../shared/validators/validators';
import moment from 'moment';
import { InputImageComponent } from '../../shared/components/input-image/input-image.component';

@Component({
  selector: 'app-actors-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputImageComponent],
  templateUrl: './actors-form.component.html',
  styleUrl: './actors-form.component.scss',
})
export class ActorsFormComponent implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);
  formGroup!: FormGroup<{
    name: FormControl<string>;
    dateOfBirth: FormControl<string>;
    picture: FormControl<File | string | null>;
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
        validators: [Validators.required, dateShouldBeInPast()],
      }),
      picture: this.formBuilder.control<File | string | null>(null, {
        nonNullable: true,
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

  onImageReceive(file: File) {
    this.formGroup.controls.picture.setValue(file);
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

    // on edit mode, if the type of picture is string, there is no change
    // so we dont need to send it back to API
    debugger;
    if (typeof this.formGroup.controls.picture.value !== 'string') {
      actor.picture = this.formGroup.controls.picture.value;
    } else {
      actor.picture = undefined;
    }

    this.postFormEmitter.emit(actor);
  }

  onReset(): void {
    this.formGroup.reset();
  }
}
