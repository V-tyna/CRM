import { FormGroup } from '@angular/forms';

interface ErrorMessage {
  [key: string]:  string
}

export const getErrorMessage = (filedName: string | readonly (string | number)[], form: FormGroup): string => {
  const emailErrorMessages: ErrorMessage = {
    email: 'Not a valid email',
    required: 'You must enter an email.'
}

  const passwordErrorMessages: ErrorMessage = {
      minlength: 'Password length should be minimum 6 characters.',
      maxlength: 'Password length should be maximum 56 characters.',
      pattern: 'Your password must contain at least one uppercase, one lowercase, and one number',
      required: 'You must enter a password.'
  }

  let errorObj: ErrorMessage = {};

  if (filedName === 'email') {
    errorObj = emailErrorMessages
  }

  if (filedName === 'password') {
    errorObj = passwordErrorMessages
  }

  for (let key in errorObj) {
    if (form.get(filedName)?.errors?.[key]) {
      return form.get(filedName)?.errors?.[key] ? errorObj[key] : '';
    }
  }
  
  return '';
}