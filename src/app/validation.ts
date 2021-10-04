import { AbstractControl, FormControl, ValidationErrors, Validators } from "@angular/forms";

const validationMessages: any = {
  minlength: 'Имя должно содержать не менее 3 символов.',
  maxlength: 'Имя должно содержать не более 20 символов.',
  nameValidator: 'В имени могут быть только буквы и цифры, первый символ только буква.'
};

function nameValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  const emailRegex = /^[a-zа-я]+[a-zа-яё0-9\s]*$/i;
  const result = emailRegex.test(value);
  if (!result) return {nameValidator: {value: 'value'}}
    else return null;
};

export function checkName(hero: string | undefined): string {
  let checkMessage = '';
  const heroName = new FormControl(hero, [Validators.minLength(3), Validators.maxLength(20), nameValidator]);
  if (heroName.errors) {
    for (const key in heroName.errors) {
      checkMessage += validationMessages[key] + ' '
    }
  }
  return checkMessage;
}  