import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { LoggerService } from "../../../global/logger.service";

import { ClaimReviewComponent } from "./claimreview.component";
import { GlobalComponentsModule } from "../../../global/components/globalcomponents.module";

/**
 * The module containing the component which displays claims, documents, and forms for the user to
 * review.
 */
@NgModule({
  imports: [CommonModule, RouterModule, GlobalComponentsModule],
  declarations: [ClaimReviewComponent],
  exports: [ClaimReviewComponent],
  providers: [LoggerService],
})
export class ClaimReviewModule {}
