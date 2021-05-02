import { Component, OnInit } from "@angular/core";

import { LoggerService } from "../../global/logger.service";
import { Router } from "@angular/router";
import { SubmittedClaimsEndpointModel } from "../../global/api/models/submittedclaimsendpoint.model";
import { SubmittedClaimsService } from "./submittedclaims.service";
import { CFError } from "src/app/global/error.service";
import { StepConstants } from "../step/stepconstants";

/**
 * The main page component for the submitted claims page, where the user can view their previously submitted claim
 * packages, including the claims, documents, and forms, and current status according to the state department.
 *
 * Subcomponents:
 * * [SubmittedClaimsTotalsComponent]{@link SubmittedClaimsTotalsComponent}
 * * [ClaimSubmissionComponent]{@link ClaimSubmissionComponent}
 *     * [StateSubmissionComponent]{@link StateSubmissionComponent}
 *         * [StateClaimStatusComponent]{@link StateClaimStatusComponent}
 *             * [StateClaimBarComponent]{@link StateClaimBarComponent}
 *             * [StateClaimRowComponent]{@link StateClaimRowComponent}
 *         * [ClaimReviewComponent]{@link ClaimReviewComponent}
 */
@Component({
  selector: "cf-submitted-claims-page",
  templateUrl: "./submittedclaimspage.component.html",
  styleUrls: [
    "../../global/css/normalize.scss",
    "../../global/css/webflow.scss",
    "./submittedclaimspage.component.scss",
  ],
})
export class SubmittedClaimsPageComponent implements OnInit {
  model: SubmittedClaimsEndpointModel;
  loading: boolean = true;

  constructor(
    private submittedClaimsService: SubmittedClaimsService,
    private logger: LoggerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.submittedClaimsService.getSubmittedClaims().subscribe(
      (result) => {
        this.setModelFromResult(result);
      },
      (error: CFError) => this.handleGetRelativeClaimsError(error)
    );
  }

  handleGetRelativeClaimsError(error: CFError) {
    this.logger.error("Error getting relative claims: " + error.toString());
  }

  setModelFromResult(resultModel: SubmittedClaimsEndpointModel) {
    this.model = resultModel;
    if (this.model.submittedClaims.length == 0) {
      this.router.navigate([StepConstants.routesForPage.MYCLAIMS]);
    }
    this.loading = false;
  }
}
