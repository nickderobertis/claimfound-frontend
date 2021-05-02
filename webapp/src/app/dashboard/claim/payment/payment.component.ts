import { Component, OnInit, OnDestroy, Input } from "@angular/core";

import { Router } from "@angular/router";

import { PaymentService } from "./payment.service";
import { LoggerService, log } from "../../../global/logger.service";
import { LoadingService } from "../../../global/services/loading.service";

import { interval } from "rxjs";
import { Subscription } from "rxjs";
import { FinalReviewPageModel } from "./reviewpay.model";
import { StepConstants } from "../../step/stepconstants";
import { CFError } from "src/app/global/error.service";
/**
 * The main page component for the final review page.
 *
 * Subcomponents:
 * * [PaymentReviewClaimsComponent]{@link PaymentReviewClaimsComponent}
 *     * [ClaimReviewComponent]{@link ClaimReviewComponent}
 * * [PaymentCheckoutComponent]{@link PaymentCheckoutComponent}
 */
@Component({
  selector: "cf-payment",
  templateUrl: "./payment.component.html",
  styleUrls: [
    "../../../global/css/normalize.scss",
    "../../../global/css/webflow.scss",
    "./payment.component.scss",
  ],
})
export class PaymentComponent implements OnInit, OnDestroy {
  model: FinalReviewPageModel;
  modal: boolean = false;
  loading: boolean = true;
  public timer = interval(2000);
  public subscription: Subscription;
  pageName = StepConstants.REVIEW;

  private _processClaimsSub: Subscription;

  constructor(
    private paymentService: PaymentService,
    private logger: LoggerService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.loadingService.setLoading(true);

    this.paymentService.getReviewData().subscribe(
      (result) => this.updateReviewModel(result),
      (error: CFError) => this.handleGetReviewDataError(error)
    );
  }

  submitClaims() {
    this.modal = true;
    this.loadingService.setLoading(true);
    this.paymentService.submitClaims().subscribe(
      (result) => this.dismissModalNavigateToSuccess(),
      (error: CFError) => this.handleSubmitclaimsError(error)
    );
  }

  dismissModalNavigateToSuccess() {
    this.modal = false;
    this.loadingService.setLoading(false);
    this.router.navigate(["/dashboard/claim/success"]);
  }

  handleGetReviewDataError(error: CFError) {
    //TODO: error handling
    this.logger.error(
      "Error getting review data in PaymentComponent: " + error.toString()
    );
  }

  handleSubmitclaimsError(error: CFError) {
    //TODO: error handling
    this.modal = false;
    this.loadingService.setLoading(false);
    this.logger.error(
      "Error submitting claims in PaymentComponent: " + error.toString()
    );
  }

  updateReviewModel(results: FinalReviewPageModel) {
    this.model = results;
    this.loading = false;
    this.loadingService.setLoading(false);
  }

  ngOnDestroy() {
    if (this._processClaimsSub) {
      this._processClaimsSub.unsubscribe();
    }
    this.loadingService.setLoading(false);
  }
}
