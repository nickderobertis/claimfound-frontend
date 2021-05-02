import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { BaseService } from "../../global/base.service";
import { LoggerService } from "../../global/logger.service";
import { StorageService } from "../../global/storage.service";
import { ErrorModalService } from "../../error-modal/errormodal.service";
import { TokenServiceRequestOptions } from "../../global/base.service";

import { SubmittedClaimsEndpointModel } from "../../global/api/models/submittedclaimsendpoint.model";

/**
 * The service powering the submitted claims page.
 *
 * Gets the data for each of the claim submissions, including the claims, documents, and forms, as well as
 * the status of the submissions.
 */
@Injectable()
export class SubmittedClaimsService extends BaseService {
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
   * Gets the data for each of the claim submissions, including the claims, documents, and forms, as well as
   * the status of the submissions.
   */
  getSubmittedClaims() {
    let options = new TokenServiceRequestOptions({
      url: "review/submitted",
    });
    return this.postInject(this.get(options), res => {
      return new SubmittedClaimsEndpointModel(res);
    });
  }
}
