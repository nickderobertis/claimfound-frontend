import { Component, OnInit, Input } from "@angular/core";

import { LoggerService } from "../../../global/logger.service";

import { SubmittedClaimsModel } from "../models/submittedclaims.model";

/**
 * The component on the submitted claims page that represents a single ClaimFound claim submission.
 *
 * It may include multiple state submissions, but they were all submitted at the same time in the ClaimFound system.
 * This component directly displays the submission date and total value and number of claims across the state submissions.
 * Everything else it offloads to [StateSubmissionComponent]{@link StateSubmissionComponent}.
 *
 * Subcomponents:
 * * [StateSubmissionComponent]{@link StateSubmissionComponent}
 */
@Component({
  selector: "cf-claim-submission",
  templateUrl: "./claimsubmission.component.html",
  styleUrls: [
    "../../../global/css/normalize.scss",
    "../../../global/css/webflow.scss",
    "./claimsubmission.component.scss",
  ],
})
export class ClaimSubmissionComponent {
  @Input() model: SubmittedClaimsModel;

  constructor(private logger: LoggerService) {}
}
