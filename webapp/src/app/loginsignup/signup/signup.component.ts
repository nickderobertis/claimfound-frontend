import {
  Component,
  OnDestroy,
  ElementRef,
  ViewChild,
  EventEmitter,
} from "@angular/core";
import { Subscription } from "rxjs";

import { SignUpModalService } from "./sign-up-modal.service";
import { LoggerService } from "../../global/logger.service";

import { UserSignUpModel } from "./models/user-sign-up.model";
import { StorageService } from "src/app/global/storage.service";

/**
 * The high-level component containing all of the sign up functionality.
 *
 * It is structured as a nested set of components:
 * * [SignUpChooserComponent]{@link SignUpChooserComponent}
 * * [SignUpInputAreaComponent]{@link SignUpInputAreaComponent}
 *     * [SignUpInputFieldComponent]{@link SignUpInputFieldComponent}
 */
@Component({
  selector: "cf-signup",
  templateUrl: "./signup.component.html",
  styleUrls: [
    "../../global/css/normalize.scss",
    "../../global/css/webflow.scss",
    "./signup.component.scss",
  ],
})
export class SignupComponent implements OnDestroy {
  emailSignUp: boolean = false;
  showSignUpModal: boolean = false;

  model: UserSignUpModel = new UserSignUpModel();
  openSignUpModal$: Subscription;
  closeSignUpModal$: Subscription;

  @ViewChild("signupModalBackground", { static: true })
  signupModalBackground: ElementRef;

  constructor(
    private signUpModalService: SignUpModalService,
    private storage: StorageService,
    private logger: LoggerService
  ) {
    this.openSignUpModal$ = this.signUpModalService.openSignUpModal.subscribe(
      (email: string) => {
        this.logger.debug(
          "opening signup modal from signup modal service event"
        );
        if (email != "" && email != null) {
          this.showEmailSignUp(null);
        }
        this.storage.write("cf-email-sent", email);
        this.openModal();
      }
    );
    this.closeSignUpModal$ = this.signUpModalService.closeSignUpModal.subscribe(
      (event: boolean) => {
        this.logger.debug(
          "closing signup modal from signup modal service event"
        );
        this.closeModal(event);
      }
    );
  }

  openModal(): void {
    this.showSignUpModal = true;
  }

  closeModal(event: MouseEvent | boolean): void {
    this.showSignUpModal = false;
    this.emailSignUp = false;
  }

  closeIfClickedOnBackground(event: MouseEvent): void {
    if (this.signupModalBackground.nativeElement === event.target) {
      this.closeModal(event);
    }
  }

  showEmailSignUp(event: EventEmitter<boolean>): void {
    this.emailSignUp = true;
  }

  ngOnDestroy(): void {
    this.openSignUpModal$.unsubscribe();
    this.closeSignUpModal$.unsubscribe();
  }

  get emailSignupDisplayStyles() {
    if (this.emailSignUp) {
      return {};
    }

    return { display: "none" };
  }
}
