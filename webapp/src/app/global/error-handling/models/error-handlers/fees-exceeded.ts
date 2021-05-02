import { ErrorHandler } from "../error-handler";

import { Observable, throwError } from "rxjs";

import { BaseService } from "../../../base.service";
import { CFError } from "src/app/global/error.service";

export class FeesExceeded extends ErrorHandler {
  name: string = "userFeesExceedClaimAmount";

  handleErrors(
    baseService: BaseService,
    error: CFError,
    url: string
  ): Observable<CFError> {
    let redirectUrl = '/dashboard/myclaims'
    this.raiseErrorModalAndRedirectToUrl(baseService, error.displayMessage, redirectUrl);
    error.expected = true;
    return throwError(error);
  }
}
