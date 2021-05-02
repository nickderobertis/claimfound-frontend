import { Injectable, EventEmitter } from "@angular/core";
import { BaseService, TokenServiceRequestOptions } from "../base.service";
import { HttpClient } from "@angular/common/http";
import { LoggerService } from "../logger.service";
import { StorageService } from "../storage.service";
import { Router } from "@angular/router";
import { ErrorModalService } from "src/app/error-modal/errormodal.service";
import { ProfileCompletionService } from "./profile-completion.service";
import { UserDetailsStatusModel } from "../api/models/userdetails/user-details-status.model";
import { ProfilePageConstants } from "src/app/dashboard/profile/profilepageconstants";
import { Observable } from "rxjs";
import {
  SelectClaimsTable,
  SelectClaimsGETAPIRequestArgs,
  SelectClaimsAPIArgs,
} from "src/app/dashboard/myclaims/select/selectclaimstable.model";
import { SelectClaimsService } from "src/app/dashboard/myclaims/select/selectclaims.service";
import { CFError } from "../error.service";

/**
 * This service returns which url the site should navigate to when the user logs in
 * or clicks the "dashboard" button on the landing page.
 */
@Injectable()
export class DetermineLoginDashboardRouteService extends BaseService {
  constructor(
    http: HttpClient,
    logger: LoggerService,
    storage: StorageService,
    router: Router,
    errorModService: ErrorModalService,
    private profileCompletionService: ProfileCompletionService
  ) {
    super(http, logger, storage, router, errorModService);
  }

  gotRouteEvent: EventEmitter<string> = new EventEmitter<string>();

  DASHBOARD = "/dashboard";

  getRoute() {
    this.profileCompletionService.getStatus().subscribe(
      (res: UserDetailsStatusModel) => {
        if (!res.name.userHasViewed) {
          this.gotRouteEvent.emit(ProfilePageConstants.pagePaths.names);
        } else if (!res.birthDay.hasPrimary || !res.gender.hasPrimary) {
          this.gotRouteEvent.emit(
            ProfilePageConstants.pagePaths.birthdayGender
          );
        } else if (!res.relative.userHasViewed) {
          this.gotRouteEvent.emit(ProfilePageConstants.pagePaths.relatives);
        } else if (!res.hasViewedRelativeQuestions) {
          this.gotRouteEvent.emit(
            ProfilePageConstants.pagePaths.relativesQuestions
          );
        } else if (!res.phone.hasPrimary) {
          this.gotRouteEvent.emit(ProfilePageConstants.pagePaths.phones);
        } else if (!res.hasViewedPhoneQuestions) {
          this.gotRouteEvent.emit(
            ProfilePageConstants.pagePaths.phonesQuestions
          );
        } else if (!res.address.hasPrimary) {
          this.gotRouteEvent.emit(ProfilePageConstants.pagePaths.addresses);
        } else if (!res.hasViewedAddressQuestions) {
          this.gotRouteEvent.emit(
            ProfilePageConstants.pagePaths.addressesQuestions
          );
        } else {
          this.getRouteToDashBoardOrSelectClaims();
        }
      },
      (error: CFError) => {
        this.gotRouteEvent.emit(this.DASHBOARD);
      }
    );
  }

  getRouteToDashBoardOrSelectClaims() {
    this.getSelectClaimsTotals(
      SelectClaimsService.VALID_RESULT_TYPES.PREVIOUSLY_VIEWED
    ).subscribe(
      (res: SelectClaimsTable) => {
        if (res.totalNumberOfClaims > 0) {
          this.gotRouteEvent.emit(this.DASHBOARD);
        } else {
          this.getSelectClaimsTotals(
            SelectClaimsService.VALID_RESULT_TYPES.NEW
          ).subscribe(
            (res: SelectClaimsTable) => {
              if (res.totalNumberOfClaims > 0) {
                this.gotRouteEvent.emit("/dashboard/myclaims/select");
              } else {
                this.gotRouteEvent.emit(this.DASHBOARD);
              }
            },
            (error: CFError) => {
              this.gotRouteEvent.emit(this.DASHBOARD);
            }
          );
        }
      },
      (error: CFError) => {
        this.gotRouteEvent.emit(this.DASHBOARD);
      }
    );
  }

  /**
   *
   * @param resultType a value from the VALID_RESULT_TYPES defined in SelectClaimsService
   */
  getSelectClaimsTotals(resultType: string): Observable<SelectClaimsTable> {
    let data: SelectClaimsGETAPIRequestArgs = {
      offset: 0,
      resultType: resultType,
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
}
