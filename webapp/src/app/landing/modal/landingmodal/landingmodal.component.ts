import {
  Component,
  ViewChild,
  OnDestroy,
  ElementRef,
  OnInit,
} from "@angular/core";
import { Subscription } from "rxjs";
import { LandingModalService } from "../landingmodal.service";
import { LoggerService } from "src/app/global/logger.service";
import { SimpleProgressButtonModel } from "src/app/global/components/progressButton/simpleprogressbutton/simpleProgressButton.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { EventTrackerService } from "src/app/global/services/event-tracker/event-tracker.service";
import { UserInfoService } from "src/app/global/userinfo.service";
import { SignUpModalService } from "src/app/loginsignup/signup/sign-up-modal.service";
import { UserNameAndEmailArgs } from "src/app/global/api/interfaces/endpoints/userinfo/user-info.interface";
import { CFError } from "src/app/global/error.service";
import { ErrorBarService } from "src/app/global/services/error-bar.service";

declare let env: any;

@Component({
  selector: "cf-landing-modal",
  templateUrl: "./landingmodal.component.html",
  styleUrls: [
    "../../../global/css/normalize.scss",
    "../../../global/css/webflow.scss",
    "./landingmodal.component.scss",
  ],
})
export class LandingModelComponent implements OnInit, OnDestroy {
  showModal: boolean = false;
  showError: boolean = true;

  form: FormGroup;
  email: string;

  progressButtonModel: SimpleProgressButtonModel = new SimpleProgressButtonModel(
    {
      buttonText: "Sign Up",
      disabled: true,
      width: 100,
      height: 50,
    }
  );

  openLandingModal$: Subscription;

  @ViewChild("modalBackground", { static: false }) modalBackground: ElementRef;

  formConstants: { [key: string]: string } = {
    firstName: "firstName",
    lastName: "lastName",
    email: "email",
  };

  backendErrorKeysToFrontendFormMap: { [key: string]: string } = {
    first_name: this.formConstants.firstName,
    last_name: this.formConstants.lastName,
    email: this.formConstants.email,
  };

  constructor(
    private landingModalService: LandingModalService,
    private eventTrackerService: EventTrackerService,
    private userInfoService: UserInfoService,
    private signupService: SignUpModalService,
    private errorBarService: ErrorBarService,
    private logger: LoggerService
  ) {
    this.form = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
    });
  }

  ngOnInit() {
    this.openLandingModal$ = this.landingModalService.openLandingModal.subscribe(
      () => {
        this.openModal();
      }
    );
    this.form.valueChanges.subscribe((changes) => {
      this.progressButtonModel.disabled = this.form.invalid;
    });
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  closeIfClickedOnBackground(event: MouseEvent): void {
    if (this.modalBackground.nativeElement === event.target) {
      this.closeModal();
    }
  }

  ngOnDestroy(): void {
    this.openLandingModal$.unsubscribe();
  }

  onProgressSubmit() {
    this.showError = false;
    let firstName = this.form.controls[this.formConstants.firstName].value;
    let lastName = this.form.controls[this.formConstants.lastName].value;
    this.email = this.form.controls[this.formConstants.email].value;

    let eventData = {
      firstName: firstName,
      lastName: lastName,
      email: this.email,
    };
    if (env.CF_ANALYTICS_FE) {
      this.eventTrackerService.triggerEvent("timedModalSignup", eventData);
    }

    this.userInfoService.storeUserInfo(firstName, lastName, this.email);

    let backendArgs: UserNameAndEmailArgs = {
      email: this.email,
      first_name: firstName,
      second_name: lastName,
      user_name_full: firstName + " " + lastName,
    };
    this.landingModalService.sendUserEmailRegister(backendArgs).subscribe(
      (response: string) => this.handleSuccess(response),
      (error: CFError) => this.handleError(error)
    );
  }

  handleSuccess(response: string): void {
    this.progressButtonModel.showSpinner = false;
    this.signupService.showSignUpModal(this.email);
  }

  handleError(error: CFError): void {
    this.logger.info("error adding monitored user", error);
    this.showError = true;
    this.progressButtonModel.showSpinner = false;
    this.errorBarService.pushCFErrorEvent({ landingModalErrorBar: error });
  }

  textBoxErrorClass(field: string): string {
    if (this.showError && this.form.controls[field].invalid) {
      return "error";
    } else {
      return "";
    }
  }
}
