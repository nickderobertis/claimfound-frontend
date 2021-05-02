import { Component } from "@angular/core";

/**
 * The main page component for user login
 *
 * Delegates the handling of input fields and the buttons to a subcomponent:
 * [LoginFormComponent]{@link LoginFormComponent}.
 */
@Component({
  selector: "sign-in",
  templateUrl: "./login.component.html",
  styleUrls: [
    "./login.component.scss",
    "../../global/css/normalize.scss",
    "../../global/css/webflow.scss",
  ],
})
export class LoginComponent {
  message: string;

  receiveErrorMessage($event) {
    this.message = $event;
  }
}

export class User {
  constructor(public email: string, public password: string) {}
}
