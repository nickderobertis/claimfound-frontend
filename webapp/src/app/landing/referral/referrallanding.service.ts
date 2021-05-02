import { Injectable, Renderer2 } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import {
  BaseService,
  TokenServiceRequestOptions,
} from "../../global/base.service";
import { LoggerService } from "../../global/logger.service";
import { StorageService } from "../../global/storage.service";
import { ErrorModalService } from "../../error-modal/errormodal.service";
import { ReferralLandingAPIArgs } from "../../global/api/interfaces/endpoints/referral/referral-landing.interface";
import { ReferralLandingModel } from "./models/referrallanding.model";

/**
 * The service powering the referral landing page
 *
 * It sends the referral token to the backend, which then decodes it to return the
 * user's name and claim totals
 */
@Injectable()
export class ReferralLandingService extends BaseService {
  constructor(
    http: HttpClient,
    logger: LoggerService,
    storage: StorageService,
    router: Router,
    errorModalService: ErrorModalService
  ) {
    super(http, logger, storage, router, errorModalService);
  }

  getCustomLandingData(referralToken: string) {
    let endPointArgs: any = {};
    endPointArgs.referralToken = referralToken;
    this.storage.write("cf-user-referral-token", referralToken);
    let options = new TokenServiceRequestOptions({
      url: "referrals/landing",
      data: endPointArgs,
    });
    return this.postInject(this.get(options), res => {
      let response = res as ReferralLandingAPIArgs;
      return new ReferralLandingModel(response);
    });
  }
}
