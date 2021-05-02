import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { FormFieldAttr } from "src/app/global/api/interfaces/general/userInput/field.interface";
import { InputFieldsModel } from "src/app/global/api/models/userInput/inputFields.model";
import { PasswordUpdatePATCHRequestArgs } from "src/app/dashboard/account/models/account-page.interface";
import { PassResetVariables } from "src/app/global/api/interfaces/general/userInput/resetPassword.interface";
import { ValidationMessages } from "src/app/global/api/interfaces/general/userInput/fieldErrors.interface";

export class ResetPasswordModel extends InputFieldsModel {
  public resetVars: PassResetVariables = {
    nonce: "",
    password: "",
    password2: "",
  };

  static readonly formFieldsAttr: FormFieldAttr[] = [
    {
      id: "newPassword",
      backendKey: "password",
      placeholder: "New Password",
      validators: [Validators.required, Validators.minLength(8)],
      updateOn: "change",
    },
    {
      id: "password",
      backendKey: "password2",
      placeholder: "Password",
      validators: [Validators.required, Validators.minLength(8)],
      updateOn: "change",
    },
  ];

  static readonly validationErrorMessages: ValidationMessages = {
    required: "Required",
    email: "Provide a valid value",
    minlength: "Must have at least 8 characters",
    pattern: "Passwords must match.",
  };

  constructor() {
    super();
  }

  createFormGroup(fb: FormBuilder): FormGroup {
    return super.createFormGroup(fb, ResetPasswordModel.formFieldsAttr);
  }

  setFromFormModel(form: FormGroup): void {
    this.resetVars.password = form.value.password;
    this.resetVars.password2 = form.value.newPassword;
  }
}
