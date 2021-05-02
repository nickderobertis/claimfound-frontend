import {
  Component,
  OnInit,
  Input,
  Output,
  ViewChild,
  EventEmitter,
  HostListener,
} from "@angular/core";

import { LoginService } from "./login.service";
import { User } from "./login.component";
import { LoggerService } from "../../global/logger.service";
import { SignUpModalService } from "../signup/sign-up-modal.service";
import { Router, ActivatedRoute } from "@angular/router";
import { EventTrackerService } from "../../global/services/event-tracker/event-tracker.service";
import { CFError } from "src/app/global/error.service";
import { ErrorBarService } from "src/app/global/services/error-bar.service";
import { UserLoginModel } from "./models/user-login.model";
import { Constants } from "./models/Constants";
import { LoginFieldsErrors } from "./models/login-fields-errors.model";
import { FormFieldAttr } from "../../global/api/interfaces/general/userInput/field.interface";
import { StorageService } from "../../global/storage.service";
import { FormBuilder, FormGroup } from "@angular/forms";

declare let env: any;
declare var RollbarLogger: any;

/**
 * Handles the input fields and buttons for user login. Contains inputs for
 * email and password, as well as the submit button, and social sign in buttons.
 *
 * This is a subcomponent of [LoginComponent]{@link LoginComponent}.
 */
@Component({
  selector: "cf-login-form",
  templateUrl: "./loginform.component.html",
  providers: [LoginService],
  styleUrls: [
    "../../global/css/normalize.scss",
    "../../global/css/webflow.scss",
    "./login.component.scss",
  ],
})
export class LoginFormComponent implements OnInit {
  errorModel: LoginFieldsErrors = new LoginFieldsErrors();
  emailForm: FormGroup;
  formFieldAttr: FormFieldAttr[] = Constants.formFieldsAttr;
  @Input() model: UserLoginModel = new UserLoginModel();
  @Input() usermodel: User;
  @Output() errorMessageEvent = new EventEmitter<string>();

  backendErrorKeysToFrontendFormMap: { [key: string]: string } = {
    email: "email",
    password: "password",
  };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService,
    private logger: LoggerService,
    private eventTrackerService: EventTrackerService,
    private errorBarService: ErrorBarService,
    private signUpModalService: SignUpModalService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      let getStarted = params["get_started"];
      if (getStarted) {
        this.signUpModalService.showSignUpModal();
      }
    });
    this.emailForm = this.model.createFormGroup(this.fb);
    this.fullEmailReset();
  }

  fullEmailReset(): void {
    /*sleep(750).then(() => {
      this.emailForm.get("firstName").setValue("john");
      this.emailForm.get("lastName").setValue("smith");
      this.emailForm.get("email").setValue("abc@123.com");
      this.emailForm.get("password").setValue("aaaaaaaa");
      sleep(500).then(() => {
        this.emailForm.reset();
        this.model.fillDefaultsInForm(this.emailForm, this.storageService);
      });
    });*/
    this.model.fillDefaultsInForm(this.emailForm);
  }

  handleError(error: CFError): void {
    switch (error.name) {
      case "userNotVerified":
        this.navigateToEmailSentComponent();
        break;
      case "emailFormat":
        this.handleDefaultError(error, error.displayMessage);
        break;
      default:
        this.handleDefaultError(error, error.displayMessage);
        break;
    }

    if (env.CF_ANALYTICS_FE) {
      this.eventTrackerService.triggerEvent("signinError", error.message);
    }
  }

  handleDefaultError(error: CFError, message: string) {
    this.logger.debug("Error on LoginFormComponent:", error.message);
    this.errorBarService.pushCFErrorEvent({ loginFormErrorBar: error });
  }

  receiveError(message: string): void {
    this.logger.info("received login form error: " + message);
    this.errorBarService.pushErrorMessages({ loginFormErrorBar: [message] });
  }

  loginUser(): void {
    this.logger.debug("Starting login user");
    this.errorBarService.clearNonFormErrorMessages("loginFormErrorBar");
    let email = this.emailForm.controls.email.value;
    let password = this.emailForm.controls.password.value;

    if (!email) return;

    if (!password) {
      return;
    }
    this.usermodel = new User(email, password);

    this.loginService.login(this.usermodel, "login").subscribe(
      (res: string) => this.logger.debug("Result received from login service"),
      (error: CFError) => this.handleError(error)
    );
  }

  showSignUpModal(event: MouseEvent): void {
    this.logger.debug("emitting showSignUpModal from loginform");
    this.signUpModalService.showSignUpModal();
  }

  navigateToEmailSentComponent() {
    this.router.navigate(["/login/emailsent"]);
  }
}
