import { Component, OnInit, Input } from "@angular/core";

import { LoggerService } from "../../../../global/logger.service";

import { StateSubmissionsModel } from "../../models/statesubmissions.model";

/**
 * The component on the submitted claims page representing a single state submission.
 *
 * There may be multiple state submissions within a single ClaimFound submission. The entire ClaimFound submission
 * is represented by [ClaimSubmissionComponent]{@link ClaimSubmissionComponent}.
 *
 * This component directly shows the state claim submission ID, the total number of claims submitted to the state,
 * and the total value of claims submitted to the state. It offloads showing the current claims status to
 * [StateClaimStatusComponent]{@link StateClaimStatusComponent} and showing the claims, documents, and forms
 * to [ClaimReviewComponent]{@link ClaimReviewComponent}.
 *
 * Subcomponents:
 * * [StateClaimStatusComponent]{@link StateClaimStatusComponent}
 * * [ClaimReviewComponent]{@link ClaimReviewComponent}
 */
@Component({
  selector: "cf-state-submission",
  templateUrl: "./statesubmission.component.html",
  styleUrls: [
    "../../../../global/css/normalize.scss",
    "../../../../global/css/webflow.scss",
    "./statesubmission.component.scss",
  ],
})
export class StateSubmissionComponent {
  @Input() model: StateSubmissionsModel;

  displayDetails: boolean = false;
  displayToggleText: string = "View Claim Package Details";
  toggledTextSymbol: string = "+";

  constructor(private logger: LoggerService) {}

  toggleDetailsClick() {
    this.displayDetails = !this.displayDetails;
    if (this.displayDetails) {
      this.displayToggleText = "Hide Claim Package Details";
      this.toggledTextSymbol = "(-)";
    } else {
      this.displayToggleText = "View Claim Package Details";
      this.toggledTextSymbol = "(+)";
    }
  }
}
