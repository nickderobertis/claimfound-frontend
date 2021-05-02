import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { BaseService, ServiceRequestOptions } from "../../global/base.service";
import { LoggerService } from "../../global/logger.service";
import { StorageService } from "../../global/storage.service";
import { ErrorModalService } from "../../error-modal/errormodal.service";

/**
 * The service which powers account verification.
 *
 * Sends the cryptographic nonce in the URL to the backend for verification,
 * must match the nonce stored for the user in the database for the user to be verified.
 */
@Injectable()
export class VerifyService extends BaseService {
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
   * Sends the nonce to the backend to check whether it matches what we have stored in the
   * database for the user.
   *
   * @param nonce A random string extracted from the URL
   */
  sendNonce(nonce: string) {
    var nonce_data: any = {};
    nonce_data["nonce"] = nonce;

    let options = new ServiceRequestOptions({
      url: "verify",
      data: nonce_data,
    });
    return this.post(options);
  }
}
