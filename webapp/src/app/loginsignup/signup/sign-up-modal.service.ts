import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

import { BaseService, ServiceRequestOptions } from "../../global/base.service";
import { LoggerService } from "../../global/logger.service";
import { StorageService } from "../../global/storage.service";
import { ErrorModalService } from "../../error-modal/errormodal.service";
import { UserSignUpModel } from "./models/user-sign-up.model";
import { UserSignUpPOSTRequestArgs } from "../../global/api/interfaces/general/signup.interface";

/**
 * The service powering the sign up modal and email sign ups.
 *
 * The external/social login functionality is in [ExternalLoginService]{@link ExternalLoginService}.
 */
@Injectable()
export class SignUpModalService extends BaseService {
  openSignUpModal: EventEmitter<string> = new EventEmitter();
  closeSignUpModal: EventEmitter<boolean> = new EventEmitter();

  constructor(
    http: HttpClient,
    logger: LoggerService,
    storage: StorageService,
    router: Router,
    errorModService: ErrorModalService
  ) {
    super(http, logger, storage, router, errorModService);
  }

  showSignUpModal(email: string = null): void {
    this.logger.debug("emitting openSignUpModal");
    this.openSignUpModal.emit(email);
  }

  hideSignUpModal(): void {
    this.logger.debug("emitting closeSignUpModal");
    this.closeSignUpModal.emit(true);
  }

  sendNewUserData(userModel: UserSignUpModel): Observable<string> {
    let endpointArgs: UserSignUpPOSTRequestArgs = userModel.toRequestArgs();
    let referralToken: string =
      this.storage.read("cf-user-referral-token") || "";

    if (referralToken !== "") {
      endpointArgs.additional_info = { referral_token: referralToken };
    }

    let options = new ServiceRequestOptions({
      url: "account",
      data: endpointArgs,
    });
    return this.post(options);
  }
}
