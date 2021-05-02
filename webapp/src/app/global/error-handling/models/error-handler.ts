import { Observable, throwError } from "rxjs";

import { BaseService } from "../../base.service";

import { ERROR_RESPONSE_TYPES } from "../../api/error-responses/error-response-types";

import { noErrorModalRoutes } from "../../global";
import { CFError } from "../../error.service";

export class ErrorHandler {
  name: string;
  buttonText: string = "Close";

  getResponseType(name: string) {
    let responseType = ERROR_RESPONSE_TYPES[name];

    if (responseType && !responseType.logLevel) {
      responseType.logLevel = "error";
    }

    return responseType;
  }

  handleErrors(
    baseService: BaseService,
    error: CFError,
    url: string
  ): Observable<CFError> {
    baseService.logger.error(
      this.constructor.name + ".handleErrors has not been implemented"
    );
    return throwError(error);
  }

  raiseErrorModalAndRedirectToUrl(
    baseService: BaseService,
    message: string,
    redirectUrl: string = "/login/login"
  ) {
    if (noErrorModalRoutes.indexOf(baseService.router.url) >= 0) {
      baseService.logger.debug(
        `not showing error modal as ${baseService.router.url} is in noErrorModalRoutes`
      );
      return;
    }
    baseService.errorModalService.showModal({
      message: message,
      buttonText: this.buttonText,
      redirectUrl: redirectUrl,
    });
  }
}
