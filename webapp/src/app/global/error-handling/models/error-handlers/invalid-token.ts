import { ErrorHandler } from "../error-handler";

import { Observable, throwError } from "rxjs";

import { BaseService } from "../../../base.service";
import { CFError } from "src/app/global/error.service";

export class InvalidTokenErrorHandler extends ErrorHandler {
  name: string = "invalidToken";

  handleErrors(
    baseService: BaseService,
    error: CFError,
    url: string
  ): Observable<CFError> {
    this.raiseErrorModalAndRedirectToUrl(baseService, error.displayMessage);
    error.expected = true;
    return throwError(error);
  }
}
