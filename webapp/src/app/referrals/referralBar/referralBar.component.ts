import { Component, Input } from "@angular/core";

import { LoggerService } from "../../global/logger.service";
import { ReferralService } from "../referral.service";
import { ReferralTokenFunctions } from "../../global/utils/tokens/referralTokenFunctions";
import { EventTrackerService } from "../../global/services/event-tracker/event-tracker.service";
import { displayStyleFromBoolean } from "../../global/css/utils/display";
import { CFError } from "src/app/global/error.service";
import { copyToClipboard } from "src/app/global/utils";

/**
 * Component which allows referring a user by email, Facebook, or copying a link.
 *
 * Currently used on both property search and the family claims page.
 */
@Component({
  selector: "cf-referral-bar",
  templateUrl: "./referralBar.component.html",
  styleUrls: [
    "../../global/css/normalize.scss",
    "../../global/css/webflow.scss",
    "./referralBar.component.scss",
  ],
})
export class ReferralBarComponent {
  @Input() name: string = "";
  @Input() token: string = "";

  showReferralEmailInput: boolean = false;
  showEmailSentMessage: boolean = false;
  showCopiedToClipboard: boolean = false;
  lastSentEmailAddress: string = "";

  constructor(
    private logger: LoggerService,
    private referralService: ReferralService,
    private eventTrackerService: EventTrackerService
  ) {}

  handleSendRelativeEmailReferralError(error: CFError) {
    this.logger.error("Error sending relative referral: " + error.toString());
  }

  showReferralEmailClick() {
    this.showReferralEmailInput = !this.showReferralEmailInput;
    this.showEmailSentMessage = false;
  }

  copyReferralLinkClick() {
    let referralLink: string = ReferralTokenFunctions.createReferralLink(
      this.token,
      "referral",
      "link",
      encodeURI(this.name)
    );

    copyToClipboard(referralLink);
    this.showCopiedToClipboard = true;
    setTimeout(() => {
      this.showCopiedToClipboard = false;
    }, 1000);
    this.eventTrackerService.triggerEvent("referralLinkCopied", {
      firstName: this.name,
    });
  }

  submitReferralEmailClick(emailInput: HTMLInputElement) {
    this.showEmailSentMessage = false;
    this.lastSentEmailAddress = emailInput.value;
    this.eventTrackerService.triggerEvent("referralLinkEmailed", {
      firstName: this.name,
    });
    emailInput.value = "";
    this.referralService
      .sendRelativeReferralEmail(this.token, this.lastSentEmailAddress)
      .subscribe(
        (result) => {
          this.showEmailSentMessage = true;
        },
        (error: CFError) => this.handleSendRelativeEmailReferralError(error)
      );
  }

  openFacebookShareWindow() {
    this.eventTrackerService.triggerEvent("referralFacebook", {
      firstName: this.name,
    });
    this.referralService.openFacebookShareWindow(encodeURI(this.name));
  }

  get referralEmailStyles(): { [s: string]: string } {
    return displayStyleFromBoolean(this.showReferralEmailInput);
  }

  get emailSentMessageStyles(): { [s: string]: string } {
    return displayStyleFromBoolean(this.showEmailSentMessage);
  }
}
