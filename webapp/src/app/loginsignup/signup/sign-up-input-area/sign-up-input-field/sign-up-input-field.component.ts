import { Component, Input } from "@angular/core";
import { FormGroup, AbstractControl } from "@angular/forms";

import { FormFieldAttr } from "../../../../global/api/interfaces/general/userInput/field.interface";

/**
 * An individual input field, such as email or password, in the email sign up.
 */
@Component({
  selector: "cf-sign-up-input-field",
  templateUrl: "./sign-up-input-field.component.html",
  styleUrls: [
    "../../../../global/css/normalize.scss",
    "../../../../global/css/webflow.scss",
    "./sign-up-input-field.component.scss",
  ],
})
export class SignUpInputFieldComponent {
  @Input() formFieldAttr: FormFieldAttr;
  @Input() emailForm: FormGroup;

  constructor() {}

  // getter to get reactive form controls easily
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
