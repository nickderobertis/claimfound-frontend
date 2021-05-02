import { FormFieldAttr } from "../../../global/api/interfaces/general/userInput/field.interface";
import { Validators } from "@angular/forms";
import { ValidationMessages } from "src/app/global/api/interfaces/general/userInput/fieldErrors.interface";


export class Constants {
  static readonly minPasswordLength: number = 8;
  static readonly formFieldsAttr: FormFieldAttr[] = [{
      id: "email",
      backendKey: "email",
      placeholder: "Email",
      divClass: "signupinputfieldcomponent",
      type: "email",
      validators: [Validators.required, Validators.email],
      updateOn: "blur",
    },
    {
      id: "password",
      backendKey: "password",
      placeholder: "Password",
      divClass: "signupmodal-input-form-passwordwrapper",
      type: "password",
      validators: [
        Validators.required,
        Validators.minLength(Constants.minPasswordLength),
      ],
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
