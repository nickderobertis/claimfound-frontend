import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";
import { FormGroup, FormBuilder, AbstractControl } from "@angular/forms";
import { EventTrackerService } from "../../../global/services/event-tracker/event-tracker.service";
import { EmailUpdateModel } from "../models/email-update.model";
import { EmailErrorModel } from "../models/email-error.model";
import { PasswordUpdateModel } from "../models/password-update.model";
import { PasswordErrorModel } from "../models/password-error.model";

import { AccountService } from "../account.service";
import { ErrorBarService } from "../../../global/services/error-bar.service";
import { LoggerService } from "../../../global/logger.service";
import { UserHasPasswordGETAPIArg } from "../models/account-page.interface";
import { CFError } from "src/app/global/error.service";
import {
  ProgressButtonModel,
  ProgressButtonArgs,
} from "src/app/global/components/progressButton/progressButton.model";
import { ProgressButtonComponent } from "src/app/global/components/progressButton/progressButton.component";
import { sleep } from "src/app/global/utils";
import { SimpleProgressButtonModel } from "src/app/global/components/progressButton/simpleprogressbutton/simpleProgressButton.model";
declare let env: any;
// Config for animated submit Save buttons under update email and password
const DEFAULT_BUTTON_ARGS: ProgressButtonArgs = {
  height: 30,
  width: 80,
  textSize: 12,
  submitText: "Save",
  disabled: true,
};

/**
 * The component which has the main functionality and inputs to update email and password
 * on the Account page.
 */
@Component({
  selector: "cf-account-update",
  templateUrl: "./update-row.component.html",
  styleUrls: ["../../../../globalcss/base.scss", "./update-row.component.scss"],
  animations: [
    trigger("openClose", [
      state(
        "open",
        style({
          opacity: "1",
          display: "block",
        })
      ),
      state(
        "close",
        style({
          opacity: "0",
          display: "none",
        })
      ),
      transition("open => close", [animate("0.35s")]),
      transition("close => open", [animate("0.25s")]),
    ]),
  ],
})
export class UpdateRowComponent implements OnInit {
  emailUpdateForm: FormGroup;
  passwordUpdateForm: FormGroup;

  emailUpdateModel: EmailUpdateModel = new EmailUpdateModel();
  emailErrorModel: EmailErrorModel = new EmailErrorModel();
  passwordUpdateModel: PasswordUpdateModel = new PasswordUpdateModel();
  passwordErrorModel: PasswordErrorModel = new PasswordErrorModel();

  /*emailProgressButtonModel: ProgressButtonModel = new ProgressButtonModel(
    DEFAULT_BUTTON_ARGS
  );
  @ViewChild("emailProgressButton", { static: true })
  emailProgressEl: ProgressButtonComponent;*/

  emailProgressButtonModel: SimpleProgressButtonModel = new SimpleProgressButtonModel(
    { disabled: true, buttonText: "Save" }
  );

  /*(passwordProgressButtonModel: ProgressButtonModel = new ProgressButtonModel(
    DEFAULT_BUTTON_ARGS
  );
  @ViewChild("passwordProgressButton", { static: true })
  passwordProgressEl: ProgressButtonComponent;*/

  passwordProgressButtonModel: SimpleProgressButtonModel = new SimpleProgressButtonModel(
    { disabled: true, buttonText: "Save" }
  );

  isEmailOpen: boolean = false;
  isPasswordOpen: boolean = false;
  emailUpdateLoading: boolean = false;
  passwordUpdateLoading: boolean = false;
  userHasPassword: boolean = true;
  emailGotSuccess: boolean = true;
  passwordGotSuccess: boolean = true;
  showEmailErrors: boolean = false;
  showPasswordErrors: boolean = false;

  backendErrorKeysToFrontendFormMap: { [key: string]: string } = {
    email: "email",
    password: "password",
  };

  passwordBackendErrorKeysToFrontendFormMap: { [key: string]: string } = {
    new_password: "newPassword",
    password: "password",
  };

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private errorBarService: ErrorBarService,
    private logger: LoggerService,
    private _cd: ChangeDetectorRef,
    private eventTrackerService: EventTrackerService
  ) {
    this.accountService
      .getAccountDetails()
      .subscribe((res: EmailUpdateModel) => {
        this.emailUpdateModel = res;
      });
  }

  ngOnInit(): void {
    this.emailUpdateForm = this.emailUpdateModel.createFormGroup(this.fb);
    this.passwordUpdateForm = this.passwordUpdateModel.createFormGroup(this.fb);
    this.updateUserHasPassword();
    this.listenFormDataChanges();
    this.fullEmailReset();
    this.fullPasswordReset();
  }

  // TODO: this entire function next two functions are hacks
  //
  // For some reason, the progress submit button border color is being set as if it
  // is enabled, while the rest of the button shows as disabled. I found that making
  // the form valid, then invalid again gets the proper styles if change detection is run.
  // For some reason this does not work directly in OnInit or AfterViewInit, it will only
  // work if a sleep of greater than ~750ms is added.
  // This is a very strange issue as the getter for backgroundCircleColor always returns
  // the correct color during this process, but the component won't use it for some reason.
  // There is no reason that it should ever get set to the enabled background color in the
  // init flow, yet somehow it does.
  // To recreate the issue, just return before doing anything in these functions
  fullEmailReset(): void {
    sleep(1000).then(() => {
      this.emailUpdateForm.get("email").setValue("abc@123.com");
      this.emailUpdateForm.get("password").setValue("aaaaaaaa");
      this.emailUpdateForm.reset();
    });
  }

  fullPasswordReset(): void {
    sleep(1000).then(() => {
      this.passwordUpdateForm.get("password").setValue("aaaaaaaa");
      this.passwordUpdateForm.get("newPassword").setValue("aaaaaaaa");
      this.passwordUpdateForm.reset();
    });
  }

  toggleEmail(): void {
    this.isEmailOpen = !this.isEmailOpen;
  }

  toggleEmailIfNecessary(): void {
    if (this.emailGotSuccess) {
      // In success state, when animation is finished, close edit area
      this.toggleEmail();
      this.fullEmailReset();
    } else {
      // In fail state, keep edit area open
      return;
    }
  }

  togglePassword(): void {
    this.isPasswordOpen = !this.isPasswordOpen;
  }

  togglePasswordIfNecessary(): void {
    if (this.passwordGotSuccess) {
      // In success state, when animation is finished, close edit area
      this.togglePassword();
      this.fullPasswordReset();
    } else {
      // In fail state, keep edit area open
      return;
    }
  }

  updateUserHasPassword(): void {
    this.accountService
      .getUserHAsPassword()
      .subscribe((resp: UserHasPasswordGETAPIArg) => {
        this.userHasPassword = resp.has_password;
        if (!this.userHasPassword) {
          this.emailUpdateModel.disableFormControl(
            this.emailUpdateForm,
            "password"
          );
          this.passwordUpdateModel.disableFormControl(
            this.passwordUpdateForm,
            "password"
          );
        } else {
          this.emailUpdateModel.enableFormControl(
            this.emailUpdateForm,
            "password"
          );
          this.passwordUpdateModel.enableFormControl(
            this.passwordUpdateForm,
            "password"
          );
        }
      });
  }

  updateEmail(): void {
    this.showEmailErrors = false;
    this.emailUpdateModel.setFromFormModel(this.emailUpdateForm);
    this.accountService.updateEmail(this.emailUpdateModel).subscribe(
      (res: string) => {
        this.emailGotSuccess = true;
        //this.emailProgressEl.triggerResult(this.emailGotSuccess);
        this.emailProgressButtonModel.showSpinner = false;
        this.emailUpdateModel.currentEmail = this.emailUpdateModel.newEmail;
        this.emailUpdateForm.reset();
        this.updateUserHasPassword();
      },
      (error: CFError) => this.handleEmailUpdateErrors(error)
    );
  }

  updatePassword(): void {
    this.showPasswordErrors = false;
    this.passwordUpdateModel.setFromFormModel(this.passwordUpdateForm);
    this.accountService.updatePassword(this.passwordUpdateModel).subscribe(
      (res: string) => {
        this.passwordGotSuccess = true;
        //this.passwordProgressEl.triggerResult(this.passwordGotSuccess);
        this.passwordProgressButtonModel.showSpinner = false;
        this.passwordUpdateLoading = false;
        this.passwordUpdateForm.reset();
        this.updateUserHasPassword();
      },
      (error: CFError) => {
        return this.handlePasswordUpdateErrors(error);
      }
    );
  }

  handleEmailUpdateErrors(error: CFError): void {
    this.emailGotSuccess = false;
    this.showEmailErrors = true;
    this.errorBarService.pushCFErrorEvent({ updateEmailErrorBar: error });
    //this.emailProgressEl.triggerResult(this.emailGotSuccess);
    this.emailProgressButtonModel.showSpinner = false;
    if (env.CF_ANALYTICS_FE) {
      this.eventTrackerService.triggerEvent("updateEmailError", {
        EmailError: error.message,
      });
    }
  }

  handlePasswordUpdateErrors(error: CFError): void {
    this.passwordGotSuccess = false;
    this.showPasswordErrors = true;
    this.errorBarService.pushCFErrorEvent({ updatePasswordErrorBar: error });
    //this.passwordProgressEl.triggerResult(this.passwordGotSuccess);
    this.passwordProgressButtonModel.showSpinner = false;
    if (env.CF_ANALYTICS_FE) {
      this.eventTrackerService.triggerEvent("updatePasswordError", {
        PasswordError: error.message,
      });
    }
  }

  // getter to get reactive form controls easily
  get emailFormCtrl(): { [key: string]: AbstractControl } {
    return this.emailUpdateForm.controls;
  }

  get passwordFormCtrl(): { [key: string]: AbstractControl } {
    return this.passwordUpdateForm.controls;
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

  listenFormDataChanges(): void {
    this.emailUpdateForm.valueChanges.subscribe((changes: any) => {
      this.logger.debug("account email update input form data changed");
      if (this.emailUpdateForm.valid) {
        this.emailProgressButtonModel.disabled = false;
        this._cd.detectChanges();
      } else {
        this.emailProgressButtonModel.disabled = true;
        this._cd.detectChanges();
      }
    });

    this.passwordUpdateForm.valueChanges.subscribe((changes: any) => {
      this.logger.debug("account password update input form data changed");
      if (this.passwordUpdateForm.valid) {
        this.passwordProgressButtonModel.disabled = false;
        this._cd.detectChanges();
      } else {
        this.passwordProgressButtonModel.disabled = true;
        this._cd.detectChanges();
      }
    });
  }
}
