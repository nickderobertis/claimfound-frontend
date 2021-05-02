import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { User } from "./login.component";
import { Observable } from "rxjs";

import { BaseService, ServiceRequestOptions } from "../../global/base.service";
import { log, LoggerService } from "../../global/logger.service";
import { StorageService } from "../../global/storage.service";
import { ErrorModalService } from "../../error-modal/errormodal.service";
import { SocialUser } from "angularx-social-login";
import { LoginAPIPOSTResponseArgs } from 'src/app/global/api/interfaces/endpoints/login/login.interface';

declare let env: any;

declare var RollbarLogger: any;

/**
 * The service powering user login
 */
@Injectable()
export class LoginService extends BaseService {
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
   * Stores information about the user in local storage, as well as the authentication
   * token to keep them logged in. Then routes to the login splash page.
   */
  @log()
  getTokenAndGoToSplashPage(data: LoginAPIPOSTResponseArgs, email: string) {
    this.storage.write("cf-jwt", data.token);
    this.storage.write("cf-user-name", data.first_name);
    this.storage.write(
      "cf-user-full-name",
      data.first_name + " " + data.last_name
    );
    this.storage.write("cf-jwt-expiration", data.expiration);
    this.storage.write("cf-email-sent", email);
    this.storage.write("cf-uuid", data.uuid);
    if (env.CF_PRODUCTION_LOGGING) {
      // configuring rollbar before navigating to splashpage
      if (RollbarLogger) {
        RollbarLogger.configure({
          payload: {
            person: {
              id: data.uuid, // required
              username: data.first_name + " " + data.last_name,
              email: email,
            },
          },
        });
      }
    }
    const isIE = /msie\s|trident\//i.test(window.navigator.userAgent);
    if (!isIE) this.router.navigate(["/login/splashpage"]);
    else {
      this.router.navigate(["/login/upgradebrowser"]);
    }
  }

  /**
   * Sends the user's login details to the backend to authenticate them.
   *
   * Upon success, calls
   * [getTokenAndGoToSplashPage]{@link LoginService#getTokenAndGoToSplashPage}
   */
  login(data: User | SocialUser, myurl: String): Observable<string> {
    let options = new ServiceRequestOptions({
      url: myurl,
      data: data,
    });

    let obs = Observable.create((observer) => {
      this.post(options).subscribe(
        (res: LoginAPIPOSTResponseArgs) => {
          this.getTokenAndGoToSplashPage(res, data["email"]);
          observer.next(res);
          observer.complete();
        },
        (error) => {
          observer.error(error);
          observer.complete();
        }
      );
    });

    return obs;
  }
}
