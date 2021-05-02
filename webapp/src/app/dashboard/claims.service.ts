import { HttpClient } from "@angular/common/http";

import { Router } from "@angular/router";

import { LoggerService } from "../global/logger.service";

import { StorageService } from "../global/storage.service";

import { ErrorModalService } from "../error-modal/errormodal.service";

import {
  BaseService,
  TokenServiceRequestOptions,
} from "../global/base.service";

export class ClaimsService extends BaseService {
  constructor(
    http: HttpClient,
    logger: LoggerService,
    storage: StorageService,
    router: Router,
    errorModalService: ErrorModalService
  ) {
    super(http, logger, storage, router, errorModalService);
  }

  claimSteps() {
    let options = new TokenServiceRequestOptions({
      url: "claimsteps",
    });
    return this.get(options);
  }
}
