import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import moment from 'moment';

export function firstLetterShouldBeUppercase(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = <string>control.value;

    if (!value) return null;
    if (value.length === 0) return null;

    const firstLetter = value[0];
    if (firstLetter !== firstLetter.toUpperCase()) {
      return {
        firstLetterShouldBeUppercase: {
          message: 'The first letter should be uppercase',
        },
      };
    }

    return null;
  };
}

export function dateShouldBeInPast(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = <string>control.value;

    if (!value) return null;
    if (value.length === 0) return null;

    const selected = moment(value, 'YYYY-MM-DD');
    const today = moment().startOf('day');

    if (selected.isSameOrAfter(today)) {
      return {
        dateShouldBeInPast: {
          message: 'The date should be in the past',
        },
      };
    }

    return null;
  };
}
