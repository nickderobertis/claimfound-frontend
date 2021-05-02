import { Component, Input } from "@angular/core";
import { FormGroup, AbstractControl } from "@angular/forms";
import { FormFieldAttr } from "../../../global/api/interfaces/general/userInput/field.interface";
@Component({
  selector: "app-login-input-field",
  templateUrl: "./login-input-field.component.html",
  styleUrls: [
    "../../../global/css/normalize.scss",
    "../../../global/css/webflow.scss",
    "./login-input-field.component.scss",
  ],
})
export class LoginInputFieldComponent {
  @Input() formFieldAttr: FormFieldAttr;
  @Input() emailForm: FormGroup;

  constructor() {}

  get f(): AbstractControl {
    return this.emailForm.controls[this.formFieldAttr.id];
  }

  fieldHasErrors(): boolean {
    if (this.f.errors != null) {
      return this.f.dirty || this.f.touched;
    }
    return false;
  }
}
