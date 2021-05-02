import { Component, OnInit, Input } from "@angular/core";

import { LoggerService } from "../../../global/logger.service";

import { ReviewSubmissionModel } from "../../../global/models/review-submission";

/**
 * The component which displays claims, documents, and forms for the user to
 * review.
 *
 * Used on the Final Review page as well as the Submitted Claims page.
 *
 * Mainly a wrapper, offloads the display functionality to the following subcomponents.
 *
 * Subcomponents:
 * * [ClaimTableComponent]{@link ClaimTableComponent}
 * * [FileViewComponent]{@link FileViewComponent}
 */
@Component({
  selector: "cf-claim-review",
  templateUrl: "./claimreview.component.html",
  styleUrls: [
    "../../../global/css/normalize.scss",
    "../../../global/css/webflow.scss",
    "./claimreview.component.scss",
  ],
})
export class ClaimReviewComponent {
  @Input() model: ReviewSubmissionModel;
}
