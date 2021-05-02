import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { ClaimsService } from "../../claims.service";

import { FinalReviewPageModel } from "./reviewpay.model";

import { LoggerService } from "../../../global/logger.service";
import { StorageService } from "../../../global/storage.service";
import { ErrorModalService } from "../../../error-modal/errormodal.service";
import { TokenServiceRequestOptions } from "../../../global/base.service";

/**
 * The service powering the final review page. Handles getting data on claims,
 * forms, and documents, as well as submitting the claims.
 */
@Injectable()
export class PaymentService extends ClaimsService {
  constructor(
    http: HttpClient,
    logger: LoggerService,
    storage: StorageService,
    router: Router,
    errorModService: ErrorModalService
  ) {
    super(http, logger, storage, router, errorModService);
  }

  /**
   * Tells the backend to submit all claims in the process for which all requirements
   * have been fulfilled.
   */
  submitClaims() {
    let options = new TokenServiceRequestOptions({
      url: "submitclaims",
      data: {},
    });

    return this.post(options);
  }

  /**
   * Gets the data on claims, forms, and documents for any claims ready to
   * be submitted.
   */
  getReviewData() {
    let options = new TokenServiceRequestOptions({
      url: "review/pay",
    });
    return this.postInject(this.get(options), (res) => {
      return new FinalReviewPageModel(res);
    });
  }
}
