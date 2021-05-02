import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup, AbstractControl } from "@angular/forms";

/**
 * Represents an individual input field on the reset password page.
 *
 * This is part of the forgot password feature. See
 * [ForgotPasswordComponent]{@link ForgotPasswordComponent} for more details.
 */
@Component({
  selector: "cf-reset-password-form-input-field",
  templateUrl: "./reset-password-form-input-field.component.html",
  styleUrls: [
    "../../../global/css/normalize.scss",
    "../../../global/css/webflow.scss",
    "../../../global/css/claimfound-platform.webflow.scss",
    "../../login/login.component.scss",
    "reset-password-form-input-field.component.scss",
  ],
})
export class ResetPasswordFormInputFieldComponent implements OnInit {
  @Input() passResetForm: FormGroup;

  constructor() {}

  ngOnInit() {}

  get newPassword() {
    return this.passResetForm.get("newPassword");
  }

  get password() {
    return this.passResetForm.get("password");
  }

  fieldHasErrors(
    formCtrl: { [key: string]: AbstractControl },
    fieldId: string
  ): boolean {
    if (formCtrl[fieldId].errors != null) {
      return formCtrl[fieldId].dirty || formCtrl[fieldId].touched;
    }
    return false;
  }

  getFieldErrorClass(fieldId: string) {
    if (this.fieldHasErrors(this.passResetForm.controls, fieldId)) {
      return "error";
    } else {
      return "";
    }
  }
}
