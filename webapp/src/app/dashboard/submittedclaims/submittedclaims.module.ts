import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { OverlayModule } from "@angular/cdk/overlay";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { LoggerService } from "../../global/logger.service";

import { SubmittedClaimsPageComponent } from "./submittedclaimspage.component";
import { SubmittedClaimsService } from "./submittedclaims.service";
import { SubmittedClaimsTotalsComponent } from "./totalswidget/submittedclaimstotals.component";
import { ClaimSubmissionComponent } from "./claimsubmission/claimsubmission.component";
import { StateSubmissionComponent } from "./claimsubmission/statesubmission/statesubmission.component";
import { StateClaimRowComponent } from "./claimsubmission/statesubmission/claimstatus/claimrow/stateclaimrow.component";
import { StateClaimBarComponent } from "./claimsubmission/statesubmission/claimstatus/claimbar/stateclaimbar.component";
import { StateClaimStatusComponent } from "./claimsubmission/statesubmission/claimstatus/stateclaimstatus.component";

import { ClaimReviewModule } from "../claim/review/claimreview.module";

import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";

/**
 * This module contains the submitted claims page, where the user can view their previously submitted claim
 * packages, including the claims, documents, and forms, and current status according to the state department.
 */
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ClaimReviewModule,
    OverlayModule,
    BrowserAnimationsModule,
    NgbTooltipModule,
  ],
  declarations: [
    SubmittedClaimsPageComponent,
    SubmittedClaimsTotalsComponent,
    ClaimSubmissionComponent,
    StateSubmissionComponent,
    StateClaimRowComponent,
    StateClaimBarComponent,
    StateClaimStatusComponent,
  ],
  exports: [SubmittedClaimsPageComponent, SubmittedClaimsTotalsComponent],
  providers: [LoggerService, SubmittedClaimsService],
})
export class SubmittedClaimsModule {}
