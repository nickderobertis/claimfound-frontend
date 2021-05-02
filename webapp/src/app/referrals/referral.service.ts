import { Injectable, Renderer2, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import {
  BaseService,
  TokenServiceRequestOptions,
} from "../global/base.service";
import { LoggerService } from "../global/logger.service";
import { StorageService } from "../global/storage.service";
import { ErrorModalService } from "../error-modal/errormodal.service";
import { ReferralEmailModalModel } from './referralEmailModal/referralemailmodal.model';

/**
 * Service which powers the [ReferralBarComponent]{@link ReferralBarComponent}.
 */
@Injectable()
export class ReferralService extends BaseService {

  toggleReferralEmailModalEvent: EventEmitter<ReferralEmailModalModel> = new EventEmitter<ReferralEmailModalModel>();

  constructor(
    http: HttpClient,
    logger: LoggerService,
    storage: StorageService,
    router: Router,
    errorModalService: ErrorModalService
  ) {
    super(http, logger, storage, router, errorModalService);
  }

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

  openFacebookShareWindow(name: string) {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.claimfound.com%2F%3Fsrc%3Dsdkpreparse%26utm_source%3Dreferral%26utm_medium%3Dfacebook%26utm_term%3D${name}&amp;src=sdkpreparse`,
      "_blank",
      "fullscreen=no"
    );
  }

  /**
   * Opens the referral email modal. Be sure to have a <cf-referral-email-modal>
   * in the component that calls this method.
   */
  openReferralEmailModal(model: ReferralEmailModalModel) {
    this.toggleReferralEmailModalEvent.emit(model);
  }
}
