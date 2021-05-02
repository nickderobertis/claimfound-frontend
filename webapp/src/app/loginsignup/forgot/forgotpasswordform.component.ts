/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { StorageService } from "../../global/storage.service";
import { LoggerService } from "../../global/logger.service";

import { ForgotPasswordService } from "./forgotpassword.service";

import { SignUpModalService } from "../signup/sign-up-modal.service";
import { CFError } from "src/app/global/error.service";

/**
 * Manages the email and button inputs for the forgot password page.
 *
 * See [ForgotPasswordComponent]{@link ForgotPasswordComponent} for more details.
 */
@Component({
  selector: "cf-forgot-password-form",
  templateUrl: "./forgotpasswordform.component.html",
  providers: [ForgotPasswordService, StorageService],
  styleUrls: [
    "../../global/css/normalize.scss",
    "../../global/css/webflow.scss",
    "../login/login.component.scss",
  ],
})
export class ForgotPasswordFormComponent {
  errorMessage: string;
  email: string;

  constructor(
    private router: Router,
    private forgotService: ForgotPasswordService,
    private storage: StorageService,
    private logger: LoggerService,
    private signUpModalService: SignUpModalService
  ) {}

  handleError(error: CFError) {
    switch (error.name) {
      case "userDoesNotExist":
      case "emailFormat":
        this.errorMessage = error.displayMessage;
        break;
      default:
        this.errorMessage = "An unexpected error occured.";
        break;
    }
  }

  goToEmailSentPage() {
    this.storage.write("cf-email-sent", this.email);
    this.logger.debug("Redirecting to email sent page");
    this.router.navigate(["/login/reset-sent"]);
  }

  submitForgot() {
    this.forgotService.requestLink(this.email).subscribe(
      (response) => this.goToEmailSentPage(),
      (error: CFError) => this.handleError(error)
    );
  }

  showSignUpModal(event) {
    this.logger.debug("emitting showSignUpModal from loginform");
    this.signUpModalService.showSignUpModal();
  }
}
