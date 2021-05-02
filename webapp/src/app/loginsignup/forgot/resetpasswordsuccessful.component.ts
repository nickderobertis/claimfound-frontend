import { Component } from "@angular/core";
import { Router } from "@angular/router";

/**
 * A static page component which shows that the reset of the user's password was successful.
 *
 * This is part of the forgot password feature. See
 * [ForgotPasswordComponent]{@link ForgotPasswordComponent} for more details.
 */
@Component({
  selector: "cf-reset-password-successful",
  templateUrl: "./resetpasswordsuccessful.component.html",
  styleUrls: ["./resetpasswordsuccessful.component.scss"],
})
export class ResetPasswordSuccessfulComponent {
  constructor(private router: Router) {}

  OnOkClick() {
    this.router.navigate(["/login"]);
  }
}
