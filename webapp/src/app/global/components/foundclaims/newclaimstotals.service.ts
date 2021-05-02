import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import {
  BaseService,
  TokenServiceRequestOptions,
} from "src/app/global/base.service";
import { LoggerService } from "src/app/global/logger.service";
import { StorageService } from "src/app/global/storage.service";
import { ErrorModalService } from "src/app/error-modal/errormodal.service";
import { SelectClaimsTable } from "src/app/dashboard/myclaims/select/selectclaimstable.model";
import {
  SelectClaimsAPIArgs,
  SelectClaimsGETAPIRequestArgs,
} from "../../../dashboard/myclaims/select/selectclaimstable.model";
import { Observable } from "rxjs";
import { ClaimStatusModel, ClaimStatusModelAPIArgs } from 'src/app/dashboard/claimsbar/claims-status.model';

/**
 * The service which requests the backend for the user's new claims to review,
 * the previously viewed claims, and their totals.
 */
@Injectable()
export class NewClaimsTotalsService extends BaseService {
  constructor(
    http: HttpClient,
    logger: LoggerService,
    storage: StorageService,
    router: Router,
    errorModService: ErrorModalService
  ) {
    super(http, logger, storage, router, errorModService);
  }

  // Below method is calling an endpoint which retrieves newly matched claims and returns a subset of them as well as the total amounts
  // For this widget we just want the totals so we are calling it but requesting zero claims
  getNewClaimsTotals(): Observable<SelectClaimsTable> {
    let data: SelectClaimsGETAPIRequestArgs = {
      offset: 0,
      resultType: "new",
      numberToGet: 0,
      filterClaims: [],
    };
    let options = new TokenServiceRequestOptions({
      url: "select/getclaims",
      data: data,
    });

    return this.postInject(this.get(options), (res: SelectClaimsAPIArgs) => {
      return new SelectClaimsTable(res);
    });
  }

  getPreviouslyViewedClaims(): Observable<SelectClaimsTable> {
    let data: SelectClaimsGETAPIRequestArgs = {
      offset: 0,
      resultType: "previously_viewed",
      numberToGet: 0,
      filterClaims: [],
    };
    let options = new TokenServiceRequestOptions({
      url: "select/getclaims",
      data: data,
    });

    return this.postInject(this.get(options), (res: SelectClaimsAPIArgs) => {
      return new SelectClaimsTable(res);
    });
  }

  getClaimsStatus(): Observable<ClaimStatusModel> {
    let options = new TokenServiceRequestOptions({
      url: "claimstatus",
    });
    return this.postInject(this.get(options), (res: ClaimStatusModelAPIArgs) => {
      return new ClaimStatusModel(res);
    });
  }
}
