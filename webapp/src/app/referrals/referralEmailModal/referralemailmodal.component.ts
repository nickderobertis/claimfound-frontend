import { OnDestroy, Component, ViewChild, ElementRef } from "@angular/core";
import { Subscription } from "rxjs";
import { ReferralService } from "../referral.service";
import { LoggerService } from "src/app/global/logger.service";
import { EventTrackerService } from "src/app/global/services/event-tracker/event-tracker.service";
import { CFError } from "src/app/global/error.service";
import { ReferralEmailModalModel } from "./referralemailmodal.model";

@Component({
  selector: "cf-referral-email-modal",
  templateUrl: "./referralemailmodal.component.html",
  styleUrls: [
    "../../global/css/normalize.scss",
    "../../global/css/webflow.scss",
    "./referralemailmodal.component.scss",
  ],
})
export class ReferralEmailComponent implements OnDestroy {
  model: ReferralEmailModalModel;

  showModal: boolean = false;
  showEmailSentMessage: boolean = false;
  showSpinner: boolean = false;
  lastSentEmailAddress: string = "";
  // helps handle the case where modal is set to close but then user closes and opens up a new one
  // and now we don't want to close that one
  shouldClose: boolean = false;

  openModalEvent$: Subscription;

  @ViewChild("referralEmailModalBackground", { static: true })
  signupModalBackground: ElementRef;

  constructor(
    private referralService: ReferralService,
    private eventTrackerService: EventTrackerService,
    private logger: LoggerService
  ) {
    this.openModalEvent$ = this.referralService.toggleReferralEmailModalEvent.subscribe(
      (event: ReferralEmailModalModel) => {
        this.model = event;
        this.showModal = true;
        this.shouldClose = false;
      }
    );
  }

  closeModal() {
    this.showModal = false;
  }

  closeIfClickedOnBackground(event: MouseEvent): void {
    if (this.signupModalBackground.nativeElement === event.target) {
      this.closeModal();
    }
  }

  submitReferralEmailClick(emailInput: HTMLInputElement) {
    this.showEmailSentMessage = false;
    this.lastSentEmailAddress = emailInput.value;
    this.eventTrackerService.triggerEvent("referralLinkEmailed", {
      firstName: this.model.name,
    });
    emailInput.value = "";
    this.showSpinner = true;
    this.referralService
      .sendRelativeReferralEmail(this.model.token, this.lastSentEmailAddress)
      .subscribe(
        (result) => {
          this.showEmailSentMessage = true;
          this.showSpinner = false;
          this.shouldClose = true;
          setTimeout(() => {
            this.showEmailSentMessage = false;
            if (this.shouldClose) {
              this.closeModal();
            }
          }, 2000);
        },
        (error: CFError) => this.handleSendRelativeEmailReferralError(error)
      );
  }

  handleSendRelativeEmailReferralError(error: CFError) {
    this.showSpinner = false;
    this.logger.error("Error sending relative referral: " + error.toString());
  }

  ngOnDestroy(): void {
    this.openModalEvent$.unsubscribe();
  }
}
