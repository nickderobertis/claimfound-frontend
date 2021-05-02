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
import { Observable } from "rxjs";
import { FormsAPIGETArgs } from "src/app/global/api/interfaces/endpoints/forms/forms.interface";
import { FormsPageModel, FormsPostModel } from "./models/formspage.model";

@Injectable()
export class FormsPageService extends BaseService {
  constructor(
    http: HttpClient,
    logger: LoggerService,
    storage: StorageService,
    router: Router,
    errorModService: ErrorModalService
  ) {
    super(http, logger, storage, router, errorModService);
  }

  getForms(): Observable<FormsPageModel> {
    let options = new TokenServiceRequestOptions({
      url: "form",
    });
    return this.postInject(this.get(options), (res: FormsAPIGETArgs) => {
      return new FormsPageModel(res);
    });
  }

  sendFormFill(args: FormsPostModel): Observable<FormsPageModel> {
    let options = new TokenServiceRequestOptions({
      url: "form",
      data: args,
    });
    return this.postInject(this.post(options), (res: FormsAPIGETArgs) => {
      return new FormsPageModel(res);
    });
  }
}
