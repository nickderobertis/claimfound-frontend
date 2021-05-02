import { FormBuilder, FormGroup } from "@angular/forms";

import {
  UserSignUpPOSTRequestArgs,
  UserSignUpFieldArgs,
} from "../../../global/api/interfaces/general/signup.interface";
import { StorageService } from "../../../global/storage.service";
import { Constants } from "./constants.model";
import { InputFieldsModel } from "src/app/global/api/models/userInput/inputFields.model";

export class UserSignUpModel extends InputFieldsModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  constructor(args?: UserSignUpFieldArgs) {
    if (!args) {
      return;
    }
    super();
    this.firstName = args.first_name;
    this.lastName = args.last_name;
    this.email = args.email;
    this.password = args.password;
  }

  createFormGroup(fb: FormBuilder): FormGroup {
    return super.createFormGroup(fb, Constants.formFieldsAttr);
  }

  fillDefaultsInForm(form: FormGroup, storage: StorageService): void {
    form.setValue({
      firstName: storage.read("cf-user-name") || "",
      lastName: storage.read("cf-user-last-name") || "",
      email: storage.read("cf-email-sent") || "",
      password: "",
    });
  }

  toRequestArgs(): UserSignUpPOSTRequestArgs {
    return {
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
      password: this.password,
    };
  }

  setFromFormModel(form: FormGroup): void {
    this.firstName = form.value.firstName;
    this.lastName = form.value.lastName;
    this.email = form.value.email;
    this.password = form.value.password;
  }
}
