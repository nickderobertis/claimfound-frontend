import { Injectable } from "@angular/core";
import {
  BaseService,
  TokenServiceRequestOptions,
} from "src/app/global/base.service";
import { HttpClient } from "@angular/common/http";
import { LoggerService } from "src/app/global/logger.service";
import { StorageService } from "src/app/global/storage.service";
import { Router } from "@angular/router";
import { ErrorModalService } from "src/app/error-modal/errormodal.service";
import { MyClaimsAPIArgs } from "../../../global/api/interfaces/endpoints/myclaims/myclaims.interface";
import { Observable } from "rxjs";
import { Claim } from "src/app/global/models/claim.model";

/**
 * The service powering the claim data on the My Claims page.
 *
 * Other services are used for the other widgets on the My Claims page.
 */
@Injectable()
export class MyClaimsService extends BaseService {
  constructor(
    http: HttpClient,
    logger: LoggerService,
    storage: StorageService,
    router: Router,
    errorModService: ErrorModalService
  ) {
    super(http, logger, storage, router, errorModService);
  }

  getClaims(): Observable<Claim[]> {
    let options = new TokenServiceRequestOptions({
      url: "myclaims",
    });

    return this.postInject(this.get(options), (res: MyClaimsAPIArgs) => {
      return Claim.arrayFromArgsObj(res.details);
    });
  }
}
