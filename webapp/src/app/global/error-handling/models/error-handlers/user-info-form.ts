import { ErrorHandler } from "../error-handler";

import { Observable, throwError } from "rxjs";

import { BaseService } from "../../../base.service";
import { CFError } from "src/app/global/error.service";

export class UserInfoFormErrorHandler extends ErrorHandler {
  name: string = "userInfoForm";

  handleErrors(
    baseService: BaseService,
    error: CFError,
    url: string
  ): Observable<CFError> {
    error.expected = true;
    return throwError(error);
  }
}
