import { Component, Input } from "@angular/core";

import { FinalReviewPageModel } from "./reviewpay.model";

/**
 * The top-level component for the section of the Final Review page which allows the user
 * to view claims, forms, and documents ready to be submitted.
 *
 * Directly contains the tab switching functionality. Offloads the display of information
 * to [ClaimReviewComponent]{@link ClaimReviewComponent}.
 *
 * Subcomponents:
 * * [ClaimReviewComponent]{@link ClaimReviewComponent}
 */
@Component({
  selector: "cf-payment-review-claims",
  templateUrl: "./paymentreviewclaims.component.html",
  styleUrls: [
    "../../../global/css/normalize.scss",
    "../../../global/css/webflow.scss",
    "./paymentreviewclaims.component.scss",
  ],
})
export class PaymentReviewClaimsComponent {
  @Input() model: FinalReviewPageModel;

  selectedState: string;

  ngOnInit() {
    this.switchStateTab(this.model.formTabModels[0].state);
  }

  switchStateTab(state: string) {
    this.selectedState = state;
  }
}
