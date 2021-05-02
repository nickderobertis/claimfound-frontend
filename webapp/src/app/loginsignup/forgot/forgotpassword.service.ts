import { PassResetVariables } from "./../../global/api/interfaces/general/userInput/resetPassword.interface";
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { BaseService, ServiceRequestOptions } from "../../global/base.service";
import { LoggerService } from "../../global/logger.service";
import { StorageService } from "../../global/storage.service";
import { ErrorModalService } from "../../error-modal/errormodal.service";

@Injectable()
export class ForgotPasswordService extends BaseService {
  constructor(
    http: HttpClient,
    logger: LoggerService,
    storage: StorageService,
    router: Router,
    errorModService: ErrorModalService
  ) {
    super(http, logger, storage, router, errorModService);
  }

  requestLink(email: string) {
    let data: Object = { email: email };
    this.storage.write("cf-email-sent", email);

    let options = new ServiceRequestOptions({
      url: "forgot",
      data: data,
    });
    return this.post(options);
  }

  resetPassword(data: PassResetVariables) {
    let options = new ServiceRequestOptions({
      url: "reset",
      data: data,
    });
    return this.post(options);
  }
}
