import { ValidationMessages } from "./../../global/api/interfaces/general/userInput/fieldErrors.interface";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";

import { LoggerService } from "../../global/logger.service";

import { ForgotPasswordService } from "./forgotpassword.service";
import { ResetPasswordModel } from "./resetpassword.model";
import { ErrorBarService } from "src/app/global/services/error-bar.service";
import { ResetPassErrors } from "./resetpasswordform-error-model";
import { CFError } from "src/app/global/error.service";

/**
 * Manages the password inputs and button for the reset password page
 * ([ResetPasswordComponent]{@link ResetPasswordComponent}).
 *
 * The individual inputs are components:
 * [ResetPasswordFormInputFieldComponent]{@link ResetPasswordFormInputFieldComponent}
 *
 * This is part of the forgot password feature. See
 * [ForgotPasswordComponent]{@link ForgotPasswordComponent} for more details.
 */
@Component({
  selector: "cf-reset-password-form",
  templateUrl: "./resetpasswordform.component.html",
  providers: [ForgotPasswordService],
  styleUrls: [
    "../../global/css/normalize.scss",
    "../../global/css/webflow.scss",
    "../../global/css/claimfound-platform.webflow.scss",
    "../login/login.component.scss",
  ],
})
export class ResetPasswordFormComponent implements OnInit, OnDestroy {
  passResetForm: FormGroup;
  model: ResetPasswordModel = new ResetPasswordModel();
  errorModel: ResetPassErrors = new ResetPassErrors();
  showError: boolean = false;

  private sub: any;
  public forgotLink: boolean;

  backendErrorKeysToFrontendFormMap: { [key: string]: string } = {
    password: "newPassword",
    password2: "password",
  };

  constructor(
    private router: Router,
    private forgotService: ForgotPasswordService,
    private errorBarService: ErrorBarService,
    private route: ActivatedRoute,
    private logger: LoggerService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.passResetForm = this.model.createFormGroup(this.fb);
    this.sub = this.route.params.subscribe((params) => {
      this.model.resetVars.nonce = params["nonce"];
    });
    this.logger.debug(
      "Got nonce for password reset: ",
      this.model.resetVars.nonce
    );
    this.forgotLink = false;
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  goToSuccessPage() {
    this.router.navigate(["/login/reset-password-successful"]);
  }

  /*checkPasswords() {
        if (this.model.password !== this.model.password2) {
            this.logger.debug('User entered two different passwords for reset.');
            this.errorMessage = 'Passwords do not match';
            return false;
        } else if (this.model.password != null && this.model.password !== '') {
            if(PasswordValidator.validatePassword(this.model.password)) {
                return true;
            } else {
                this.errorMessage = 'password must be between 8-255 characters.';
            }
        }
    }

    checkPasswordsAndSubmit() {
        let valid: boolean = this.checkPasswords();
        if (valid) {
            this.submitReset();
        }
    }*/

  handleError(error: CFError) {
    this.logger.debug("Starting handle error for reset");
    this.logger.error("Error message for reset:", error.message);
    this.forgotLink = true;
    this.showError = true;
    this.errorBarService.pushCFErrorEvent({ resetPass: error });
  }

  submitReset() {
    this.showError = false;
    this.model.setFromFormModel(this.passResetForm);
    this.forgotService.resetPassword(this.model.resetVars).subscribe(
      (response) => this.goToSuccessPage(),
      (error: CFError) => this.handleError(error)
    );
  }
}
