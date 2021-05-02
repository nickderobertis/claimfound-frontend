import { Component } from "@angular/core";

/**
 * The page component which the user lands on after clicking a link in the email to reset
 * their password.
 *
 * Management of the inputs is delegated to a subcomponent:
 * [ResetPasswordFormComponent]{@link ResetPasswordFormComponent}
 *
 * Within that component, there is another subcomponent which represents an individual
 * input field: [ResetPasswordFormInputFieldComponent]{@link ResetPasswordFormInputFieldComponent}.
 *
 * This is part of the forgot password feature. See
 * [ForgotPasswordComponent]{@link ForgotPasswordComponent} for more details.
 */
@Component({
  selector: "cf-reset-password",
  templateUrl: "./resetpassword.component.html",
  styleUrls: [
    "../login/login.component.scss",
    "../../global/css/normalize.scss",
    "../../global/css/webflow.scss",
  ],
})
export class ResetPasswordComponent {}
