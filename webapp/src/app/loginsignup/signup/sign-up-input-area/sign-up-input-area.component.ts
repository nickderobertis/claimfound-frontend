import {
  Component,
  OnInit,
  Input,
  ViewChild,
  HostListener,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

import { UserSignUpModel } from "../models/user-sign-up.model";
import { Constants } from "../models/constants.model";
import { SignUpFieldsErrors } from "../models/sign-up-fields-errors.model";
import { FormFieldAttr } from "../../../global/api/interfaces/general/userInput/field.interface";
import { SignUpModalService } from "../sign-up-modal.service";
import { StorageService } from "../../../global/storage.service";
import { LoggerService } from "../../../global/logger.service";
import { ErrorBarService } from "../../../global/services/error-bar.service";
import { CFError } from "src/app/global/error.service";
import { ProgressButtonModel } from "src/app/global/components/progressButton/progressButton.model";
import { ProgressButtonComponent } from "src/app/global/components/progressButton/progressButton.component";
import { sleep } from "src/app/global/utils";
import { SimpleProgressButtonModel } from "src/app/global/components/progressButton/simpleprogressbutton/simpleProgressButton.model";
import { EventTrackerService } from "../../../global/services/event-tracker/event-tracker.service";
/**
 * The component containing the email sign up functionality, input fields, and button,
 * as well as the buttons for social/external sign up.
 */
declare let env: any;
@Component({
  selector: "cf-sign-up-input-area",
  templateUrl: "./sign-up-input-area.component.html",
  styleUrls: [
    "../../../global/css/normalize.scss",
    "../../../global/css/webflow.scss",
    "./sign-up-input-area.component.scss",
  ],
})
export class SignUpInputAreaComponent implements OnInit {
  errorModel: SignUpFieldsErrors = new SignUpFieldsErrors();
  emailForm: FormGroup;
  formFieldsAttr: FormFieldAttr[] = Constants.formFieldsAttr;
  showErrors: boolean = false;
  //canProceed: boolean = false;
  /*progressButtonModel: ProgressButtonModel = new ProgressButtonModel({
    width: 390,
    height: 50,
    submitText: "Sign Up",
    textSize: 14,
    disabled: true,
  });
  @ViewChild("progressButton", { static: true })
  progressEl: ProgressButtonComponent;*/

  progressButtonModel: SimpleProgressButtonModel = new SimpleProgressButtonModel(
    {
      buttonText: "Sign Up",
      disabled: true,
      width: 100,
      height: 50,
    }
  );

  @Input()
  model: UserSignUpModel = new UserSignUpModel();

  backendErrorKeysToFrontendFormMap: { [key: string]: string } = {
    first_name: "firstName",
    last_name: "lastName",
    email: "email",
    password: "password",
  };

  constructor(
    private signUpModalService: SignUpModalService,
    private fb: FormBuilder,
    private storageService: StorageService,
    private router: Router,
    private logger: LoggerService,
    private errorBarService: ErrorBarService,
    private eventTrackerService: EventTrackerService
  ) {}

  ngOnInit(): void {
    this.emailForm = this.model.createFormGroup(this.fb);
    this.listenFormDataChanges();
    this.logger.debug("About set defaults in form");
    this.fullEmailReset();
  }

  /*@HostListener("window:resize", ["$event"])
  onResize(event: Event) {
    let wind: Window = event.target as Window; // This is how the event comes, not sure why ts doesn't agree
    if (wind.innerWidth <= 479) {
      this.progressButtonModel.width = 320;
    } else {
      this.progressButtonModel.width = 390;
    }
  }*/

  // TODO: this entire function is a hack. See account update-row.component.ts for more details
  // The issue that this hack was addressing appears to have been related to the animated submit
  // button. Since we are not currently using it this hack is unecessary. Leaving the code in place
  // because Nick seemed to want to bring the animated submit button back later.
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
    this.model.fillDefaultsInForm(this.emailForm, this.storageService);
  }

  signUpUser(form: FormGroup): void {
    this.model.setFromFormModel(form);
    this.signUpModalService.sendNewUserData(this.model).subscribe(
      (response: string) => this.handleSuccess(response),
      (error: CFError) => this.handleError(error)
    );
  }

  onProgressSubmit(): void {
    this.showErrors = false;
    this.signUpUser(this.emailForm);
  }

  handleSuccess(response: string): void {
    //this.progressEl.triggerResult(true);
    this.progressButtonModel.showSpinner = false;
    this.logger.debug("Successful sign up");
    this.storageService.write("cf-email-sent", this.model.email);

    //this.canProceed = true;
    this.router.navigate(["/login/emailsent"]);
  }

  /*onAnimationFinish(): void {
    if (this.canProceed) {
      this.router.navigate(["/login/emailsent"]);
    }
  }*/

  handleError(error: CFError): void {
    //this.progressEl.triggerResult(false);
    this.progressButtonModel.showSpinner = false;
    this.showErrors = true;
    //this.canProceed = false;
    this.errorBarService.pushCFErrorEvent({ emailSignUpErrorBar: error });
    if (env.CF_ANALYTICS_FE) {
      this.eventTrackerService.triggerEvent("signupError", error.message);
    }
  }

  receiveError(message: string) {
    this.logger.debug("received error: " + message);
    this.showErrors = true;
    this.errorBarService.pushErrorMessages({
      emailSignUpErrorBar: [message],
    });
  }

  listenFormDataChanges(): void {
    this.emailForm.valueChanges.subscribe((changes) => {
      this.progressButtonModel.disabled = this.emailForm.invalid;
    });
  }

  closeSignUpModal(event): void {
    this.signUpModalService.hideSignUpModal();
  }
}
