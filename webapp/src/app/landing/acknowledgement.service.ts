import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import {
  BaseService,
  TokenServiceRequestOptions,
} from "../global/base.service";
import { StorageService } from "../global/storage.service";
import { LoggerService } from "../global/logger.service";
import { ErrorModalService } from "../error-modal/errormodal.service";

/**
 * The service which provides the backend packages for the Acknowledgements page
 */
@Injectable()
export class AcknowledgementService extends BaseService {
  constructor(
    http: HttpClient,
    logger: LoggerService,
    storage: StorageService,
    router: Router,
    errorModService: ErrorModalService
  ) {
    super(http, logger, storage, router, errorModService);
  }

  getCredits() {
    let options = new TokenServiceRequestOptions({
      url: "credits",
    });
    return this.get(options);
  }
}
