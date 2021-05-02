import { Validators } from "@angular/forms";

import { FormFieldAttr } from "src/app/global/api/interfaces/general/userInput/field.interface";
import { ValidationMessages } from "src/app/global/api/interfaces/general/userInput/fieldErrors.interface";

export class Constants {
  static readonly minPasswordLength: number = 8;
  static readonly formFieldsAttr: FormFieldAttr[] = [
    {
      id: "email",
      backendKey: "email",
      placeholder: "Email",
      validators: [Validators.required, Validators.email],
      updateOn: "blur",
    },
    {
      id: "password",
      backendKey: "password",
      placeholder: "Password",
      validators: [Validators.required, Validators.minLength(8)],
      updateOn: "change",
    },
  ];

  static readonly passwordFormFieldsAttr: FormFieldAttr[] = [
    {
      id: "newPassword",
      backendKey: "new_password",
      placeholder: "New Password",
      validators: [Validators.required, Validators.minLength(8)],
      updateOn: "change",
    },
    {
      id: "password",
      backendKey: "password",
      placeholder: "Password",
      validators: [Validators.required, Validators.minLength(8)],
      updateOn: "change",
    },
  ];

  static readonly validationErrorMessages: ValidationMessages = {
    required: "Required",
    email: "Provide a valid value",
    minlength:
      "Must have at least " + Constants.minPasswordLength + " characters",
  };
}
