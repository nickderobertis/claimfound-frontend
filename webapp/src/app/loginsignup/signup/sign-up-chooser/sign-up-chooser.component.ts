import { Component, EventEmitter, Output } from "@angular/core";

import { ErrorBarService } from "../../../global/services/error-bar.service";
import { LoggerService } from "../../../global/logger.service";

/**
 * The initially displayed sign up area where the user can choose to continue with a
 * social/external login service or go to email sign up.
 *
 * Email sign up itself is delegated to [SignUpInputAreaComponent]{@link SignUpInputAreaComponent}.
 */
@Component({
  selector: "cf-sign-up-chooser",
  templateUrl: "./sign-up-chooser.component.html",
  styleUrls: [
    "../../../global/css/normalize.scss",
    "../../../global/css/webflow.scss",
    "./sign-up-chooser.component.scss",
  ],
})
export class SignUpChooserComponent {
  @Output()
  chooseEmailSignUp: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private errorBarService: ErrorBarService,
    private logger: LoggerService
  ) {}

  openEmailSignUp(event: MouseEvent): void {
    this.chooseEmailSignUp.emit(true);
  }

  receiveError(message: string) {
    this.logger.debug("received error: " + message);
    this.errorBarService.pushErrorMessages({
      signUpChooserErrorBar: [message],
    });
  }
}
