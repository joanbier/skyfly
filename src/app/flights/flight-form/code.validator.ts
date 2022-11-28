import {AbstractControl, ValidationErrors} from "@angular/forms";

export const flightCodeValidator = (formControl: AbstractControl): ValidationErrors | null => {
  return (formControl.value as string).startsWith('SKY') ? null : {incorrectCode: true};
}
