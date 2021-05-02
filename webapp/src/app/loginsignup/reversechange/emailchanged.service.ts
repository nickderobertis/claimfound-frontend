import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { BaseService, ServiceRequestOptions } from "../../global/base.service";
import { LoggerService } from "../../global/logger.service";
import { StorageService } from "../../global/storage.service";
import { ErrorModalService } from "../../error-modal/errormodal.service";

/**
 * The service powering the feature to reset a change to the user's email.
 *
 * For more information, see [EmailChangedComponent]{@link EmailChangedComponent}.
 */
@Injectable()
export class EmailChangedService extends BaseService {
  constructor(
    http: HttpClient,
    logger: LoggerService,
    storage: StorageService,
    router: Router,
    errorModService: ErrorModalService
  ) {
    super(http, logger, storage, router, errorModService);
  }

  sendNonce(nonce: string) {
    let nonce_data: any = {};
    nonce_data["nonce"] = nonce;

    let options = new ServiceRequestOptions({
      url: "email/reset",
      data: nonce_data,
    });
    return this.post(options);
  }
}
