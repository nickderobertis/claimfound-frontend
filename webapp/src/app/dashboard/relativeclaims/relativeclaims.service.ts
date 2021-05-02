import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import {
  BaseService,
  TokenServiceRequestOptions,
} from "../../global/base.service";

import { LoggerService } from "../../global/logger.service";

import { StorageService } from "../../global/storage.service";

import { ErrorModalService } from "../../error-modal/errormodal.service";

import { RelativeClaimsAggregateModel } from "./models/user-relatives-claimtotals-aggregate.model";
import { RelativeClaimsEndpointModel } from "./models/user-relative-claims.model";
import { RelativeClaimsQuestionsModel } from "./models/relative-claims.model";
import { ReferUserLegalEndpointModel } from "../jumpoff/models/refer-user-legal.model";
import { RelativeClaimsTotalsAPIArgs } from "../../global/api/interfaces/endpoints/relative-claims/totals.interface";
import { ReferUserLegalAPIArgs } from "../../global/api/interfaces/endpoints/refer-user-legal.interface";
import { AggregateTotalsAPIArgs } from "../../global/api/interfaces/endpoints/relative-claims/aggregate-total.interface";
import { UpdateRelativeDeceasedHeirAPIArgs } from "../../global/api/interfaces/endpoints/user-details-update/relatives-deceased-heir.interface";

/**
 * The service powering the Family Claims and Deceased Claims pages, which gets
 * the amounts of claims owed to relatives, sends referral emails, and
 * gets an appropriate LegalFound link for the user.
 */
@Injectable()
export class RelativeClaimsService extends BaseService {
  constructor(
    http: HttpClient,
    logger: LoggerService,
    storage: StorageService,
    router: Router,
    errorModalService: ErrorModalService
  ) {
    super(http, logger, storage, router, errorModalService);
  }

  /**
   * Get the totals of claims owed to relatives.
   */
  getRelativeClaimsAggregates() {
    let options = new TokenServiceRequestOptions({
      url: "relatives/claimtotals/aggregates",
    });
    return this.postInject(this.get(options), res => {
      let response = res as AggregateTotalsAPIArgs;
      return new RelativeClaimsAggregateModel(response);
    });
  }

  /**
   * Get for each relative, the totals of claims owed to that relative.
   */
  getRelativeClaims() {
    let options = new TokenServiceRequestOptions({
      url: "relatives/claimtotals",
    });
    return this.postInject(this.get(options), res => {
      let response = res as RelativeClaimsTotalsAPIArgs;
      return new RelativeClaimsEndpointModel(response);
    });
  }

  /**
   * Get for each relative, the totals of claims owed to that relative, but only for
   * relatives for which the user is the heir.
   */
  getRelativeClaimsUserIsHeir() {
    let options = new TokenServiceRequestOptions({
      url: "relatives/claimtotals/user_is_heir",
    });
    return this.postInject(this.get(options), res => {
      let response = res as RelativeClaimsTotalsAPIArgs;
      return new RelativeClaimsEndpointModel(response);
    });
  }

  /**
   * Get for each relative, the totals of claims owed to that relative, but only for
   * relatives for which the user is the heir or unsure.
   */
  getRelativeClaimsUserIsHeirOrUnsure() {
    let options = new TokenServiceRequestOptions({
      url: "relatives/claimtotals/user_is_heir_or_unsure",
    });
    return this.postInject(this.get(options), res => {
      let response = res as RelativeClaimsTotalsAPIArgs;
      return new RelativeClaimsEndpointModel(response);
    });
  }

  /**
   * Get a location-specific LegalFound link for the user
   */
  getLegalFoundLink() {
    let options = new TokenServiceRequestOptions({
      url: "refer/user/legal",
    });
    return this.postInject(this.get(options), res => {
      let response = res as ReferUserLegalAPIArgs;
      return new ReferUserLegalEndpointModel(response);
    });
  }

  /**
   * Updates whether a relative is deceased or the user is the heir
   * @param model The id of the relative and any information to update.
   */
  updateRelativesDeceasedHeirInfo(model: RelativeClaimsQuestionsModel) {
    let endPointArgs: UpdateRelativeDeceasedHeirAPIArgs = model.toAPIUpdateRequest();
    let options = new TokenServiceRequestOptions({
      url: "user",
      data: endPointArgs,
    });
    return this.patch(options);
  }

  /**
   * Sends a referral email to the passed email.
   * @param referralToken The token generated when referring a relative.
   * @param email The email to which to send a referral email.
   */
  sendRelativeReferralEmail(referralToken: string, email: string) {
    let endPointArgs: any = {};
    endPointArgs.referralToken = referralToken;
    endPointArgs.email = email;
    let options = new TokenServiceRequestOptions({
      url: "referrals/email",
      data: endPointArgs,
    });
    return this.post(options);
  }
}
