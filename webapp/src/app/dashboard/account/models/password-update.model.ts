import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { InputFieldsModel } from "src/app/global/api/models/userInput/inputFields.model";

import { PasswordUpdatePATCHRequestArgs } from "./account-page.interface";
import { FormFieldAttr } from "src/app/global/api/interfaces/general/userInput/field.interface";

export class PasswordUpdateModel extends InputFieldsModel {
  password: string;
  newPassword: string;

  static readonly formFieldsAttr: FormFieldAttr[] = [
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

  constructor() {
    super();
  }

  createFormGroup(fb: FormBuilder): FormGroup {
    return super.createFormGroup(fb, PasswordUpdateModel.formFieldsAttr);
  }

  toRequestArgs(): PasswordUpdatePATCHRequestArgs {
    return {
      new_password: this.newPassword,
      password: this.password,
    };
  }

  setFromFormModel(form: FormGroup): void {
    this.password = form.value.password;
    this.newPassword = form.value.newPassword;
  }
}
