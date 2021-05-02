import { FormBuilder, FormGroup } from "@angular/forms";
import { InputFieldsModel } from "src/app/global/api/models/userInput/inputFields.model";
import {LoginFieldArgs} from "../../../global/api/interfaces/general/login.interface";
import {Constants} from "./Constants";


export class UserLoginModel extends InputFieldsModel{
  email: string;
  password: string;

  constructor(args?: LoginFieldArgs) {
    if (!args) {
      return;
    }
    super();
    this.email = args.email;
    this.password = args.password;
  }

  createFormGroup(fb: FormBuilder): FormGroup {
    return super.createFormGroup(fb, Constants.formFieldsAttr);
  }

  fillDefaultsInForm(form: FormGroup): void {
    form.setValue({

      email:"",
      password: "",
    });
  }

}
