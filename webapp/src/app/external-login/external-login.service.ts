import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { SocialUser } from "angularx-social-login";
import { Observable } from "rxjs";

import {
  BaseService,
  TokenServiceRequestOptions,
} from "../global/base.service";
import { LoggerService } from "../global/logger.service";
import { StorageService } from "../global/storage.service";
import { ErrorModalService } from "../error-modal/errormodal.service";

export interface SocialEventArgs {
  socialType: string;
  success: boolean;
}

/**
 * The service powering the functionality for the user to log in using an external service
 * such as Google or Facebook.
 */
@Injectable()
export class ExternalConnectService extends BaseService {
  // To raise event when successful connection happens
  connectEvent: EventEmitter<SocialEventArgs> = new EventEmitter();
  // To raise event when successful login or signup happens
  signInEvent: EventEmitter<SocialEventArgs> = new EventEmitter();

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
   * Sends a request to the backend to authenticate the user based on social/external info
   * @param data The user's social information returned from the Google or Facebook API
   * @param myurl The backend url to send the infomation to, currently should use 'external/connect'
   */
  connect(data: SocialUser, myurl: string): Observable<string> {
    let options = new TokenServiceRequestOptions({
      url: myurl,
      data: data,
    });
    return this.post(options);
  }

  /**
   * Pushes a notification to frontend components that the user has connected a social/external account to
   * an existing ClaimFound account.
   * @param socialType The social service, currently 'Google' or 'Facebook'
   * @param success Whether the connection was successful
   */
  pushConnectEvent(socialType: string, success: boolean) {
    this.connectEvent.emit({ socialType: socialType, success: success });
  }

  /**
   * Pushes a notification to frontend components that the user has signed in with a social/external account.
   * @param socialType The social service, currently 'Google' or 'Facebook'
   * @param success Whether the connection was successful
   */
  pushSignInEvent(socialType: string, success: boolean) {
    this.signInEvent.emit({ socialType: socialType, success: success });
  }
}
