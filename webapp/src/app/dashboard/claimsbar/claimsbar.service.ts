import { Injectable, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

import {
  BaseService,
  TokenServiceRequestOptions,
} from "../../global/base.service";
import { LoggerService } from "../../global/logger.service";
import { StorageService } from "../../global/storage.service";
import { ErrorModalService } from "../../error-modal/errormodal.service";
import { ClaimStatusModel } from "./claims-status.model";

/**
 * The service powering the claims bar which allows the user to navigate between My Claims, Upload Documents,
 * E-Sign Forms, and Final Review.
 *
 * Interacts with the backend to determine which pages the user should be allowed to navigate.
 */
@Injectable()
export class ClaimsBarService extends BaseService {
  claimsBarRefreshEvent = new EventEmitter<ClaimStatusModel>();
  claimsBarPageSetEvent = new EventEmitter<string>();

  constructor(
    http: HttpClient,
    logger: LoggerService,
    storage: StorageService,
    router: Router,
    errorModService: ErrorModalService
  ) {
    super(http, logger, storage, router, errorModService);
  }

  refreshClaimsBar(): void {
    let options = new TokenServiceRequestOptions({
      url: "claimstatus",
    });
    this.get(options).subscribe(
      result => {
        this.claimsBarRefreshEvent.emit(new ClaimStatusModel(result));
      },
      error => this.logger.debug("error getting claims status")
    );
  }

  setClaimsBarPage(page: string): void {
    this.claimsBarPageSetEvent.emit(page);
  }
}
