import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { LoggerService } from "../../../global/logger.service";
import { Name } from "../../models/name.model";
import { EventTrackerService } from "../../../global/services/event-tracker/event-tracker.service";
import { StorageService } from "../../storage.service";
import { SignUpModalService } from "../../../loginsignup/signup/sign-up-modal.service";

declare let env: any;

/**
 * The component which displays an input field for the user to add their email and a button
 * to then be routed to the sign up.
 *
 * Currently used in the property search and the referral landing page.
 */
@Component({
  selector: "cf-email-signup",
  templateUrl: "./emailsignup.component.html",
  styleUrls: [
    "../../../global/css/normalize.scss",
    "../../../global/css/webflow.scss",
    "./emailsignup.component.scss",
  ],
})
export class EmailSignUpComponent {
  @Input() name: Name;
  @Input() sideText: string = "Sign-up so we can narrow down your claims!";
  @Input() btnText: string = "Submit >";
  @Input() btnColor: string = "#3b62b0";
  @Input() eventKey: string = "emailGetStarted";
  email: string = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private logger: LoggerService,
    private eventTrackerService: EventTrackerService,
    private storageService: StorageService,
    private signUpModalService: SignUpModalService
  ) {}

  ngOnInit() {}

  onEmailSubmit() {
    if (this.emailHasNoValue(this.email)) {
      return;
    }
    if (env.CF_ANALYTICS_FE) {
      this.eventTrackerService.triggerEvent(this.eventKey, {
        email: this.email,
        firstName: this.name.firstName,
        lastName: this.name.lastName,
      });
    }
    this.storageService.write("cf-email-sent", this.email);
    this.signUpModalService.showSignUpModal(this.email);
  }

  emailHasNoValue(email: string): boolean {
    return email == "" || email == null;
  }

  goToURL(url: string) {
    this.router.navigate([url]);
  }

  get submitButtonStyles(): object {
    return { "background-color": this.btnColor };
  }
}
