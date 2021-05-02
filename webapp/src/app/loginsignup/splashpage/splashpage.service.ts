import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Subscription, interval } from "rxjs";

import { Router } from "@angular/router";
import { StorageService } from "../../global/storage.service";
import {
  BaseService,
} from "../../global/base.service";
import { LoggerService } from "../../global/logger.service";
import { ErrorModalService } from "../../error-modal/errormodal.service";
import { DetermineLoginDashboardRouteService } from 'src/app/global/services/determine-login-dashboard-route.service';

/**
 * Service responsible for redirecting the user after a successful login attempt.
 */
@Injectable()
export class SplashPageService extends BaseService {

  gotRouteEvent$: Subscription;

  constructor(
    http: HttpClient,
    router: Router,
    logger: LoggerService,
    storage: StorageService,
    errorModService: ErrorModalService,
    private routeFindingService: DetermineLoginDashboardRouteService
  ) {
    super(http, logger, storage, router, errorModService);
  }

  init() {
    this.gotRouteEvent$ = this.routeFindingService.gotRouteEvent.subscribe(
      (route: string) => {
        this.router.navigate([route]);
      }
    );
    this.routeFindingService.getRoute();
  }

  destroy() {
    this.gotRouteEvent$.unsubscribe();
  }
}
