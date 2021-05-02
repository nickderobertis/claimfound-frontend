import { Observable, throwError } from "rxjs";

import { ErrorHandler } from "../error-handler";

import { BaseService } from "../../../base.service";

import { unsecuredRoutes } from "../../../global";

import { expectedException, noErrorModalRoutes } from "../../../global";
import { CFError } from "src/app/global/error.service";

export class DefaultErrorHandler extends ErrorHandler {
  name: string = "default";

  handleErrors(
    baseService: BaseService,
    error: CFError,
    url: string
  ): Observable<CFError> {
    let responseType = this.getResponseType(error.name);
    if (expectedException.indexOf(error.name) >= 0) {
      error.expected = true;
      baseService.logger.debug("current exception is expected");
    } else if (error.statusCode >= 500) {
      baseService.logger.debug("Handling unknown error >= 500");
      if (!unsecuredRoutes.some(x => x == url)) {
        // if not in unsecured routes
        baseService.logger.debug("Handling secured path for unknown error");
        this.raiseErrorModalAndRedirectToUrl(
          baseService,
          "Sorry, an error has occurred. Please log in again"
        );
      } else {
        // if in secured routes
        baseService.logger.debug("Handling unsecured path for unknown error");
        this.raiseErrorModalAndRedirectToUrl(
          baseService,
          "Sorry, an error has occurred.",
          ""
        );
      }
    } else if (responseType) {
      this.raiseErrorModalAndRedirectToUrl(
        baseService,
        responseType.message,
        null
      );
    } else {
      this.raiseErrorModalAndRedirectToUrl(
        baseService,
        "Sorry, an error has occurred. Please try again or contact support.",
        null
      );
    }
    return throwError(error);
  }
}
