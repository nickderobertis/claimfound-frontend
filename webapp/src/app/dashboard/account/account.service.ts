import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

import {
  BaseService,
  TokenServiceRequestOptions,
} from "../../global/base.service";
import { StorageService } from "../../global/storage.service";
import { LoggerService } from "../../global/logger.service";
import { ErrorModalService } from "../../error-modal/errormodal.service";

import { EmailUpdateModel } from "./models/email-update.model";
import { PasswordUpdateModel } from "./models/password-update.model";
import { SocialConnectModel } from "./models/social-connect.model";
import {
  AccountDetailsGETAPIArgs,
  SocialConnectGETAPIArgs,
  UserHasPasswordGETAPIArg,
} from "./models/account-page.interface";

/**
 * The service powering the Account page where the user can change email, password, and connect social accounts
 */
@Injectable()
export class AccountService extends BaseService {
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
   * Determines whether the user has a password
   */
  getUserHAsPassword(): Observable<UserHasPasswordGETAPIArg> {
    let options = new TokenServiceRequestOptions({
      url: "user/has_password",
    });

    return this.get(options);
  }

  /**
   * Gets the account details to show the email on the page
   */
  getAccountDetails(): Observable<EmailUpdateModel> {
    // bring AccountDetailsGETAPIArgs
    // create EmailUpdateModel
    let options = new TokenServiceRequestOptions({
      url: "account",
    });

    return this.postInject(
      this.get(options),
      (res: AccountDetailsGETAPIArgs) => {
        return new EmailUpdateModel(res);
      }
    );
  }

  /**
   * Updates the email in the database for the user
   * @param model The new email to update and the existing password
   */
  updateEmail(model: EmailUpdateModel): Observable<string> {
    // patch request to /account/email
    // if email is successfully upadted then do get request to update model
    let options = new TokenServiceRequestOptions({
      url: "account/email",
      data: model.toRequestArgs(),
    });
    return this.patch(options);
  }

  /**
   * Updates the password in the database for the user
   * @param model The new and existing password
   */
  updatePassword(model: PasswordUpdateModel): Observable<string> {
    // patch request to /account/password
    let options = new TokenServiceRequestOptions({
      url: "account/password",
      data: model.toRequestArgs(),
    });
    return this.patch(options);
  }

  /**
   * Gets which social accounts the user has connected
   */
  getSocialConnections(): Observable<SocialConnectModel> {
    let options = new TokenServiceRequestOptions({
      url: "external/connect",
    });

    return this.postInject(
      this.get(options),
      (res: SocialConnectGETAPIArgs) => {
        return new SocialConnectModel(res);
      }
    );
  }
}
