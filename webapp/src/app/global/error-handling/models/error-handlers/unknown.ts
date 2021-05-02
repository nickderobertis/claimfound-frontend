import { Observable, throwError } from "rxjs";

import { ErrorHandler } from "../error-handler";

import { BaseService } from "../../../base.service";

import { unsecuredRoutes, noErrorModalRoutes } from "../../../global";
import { CFError } from "src/app/global/error.service";

export class UnknownErrorHandler extends ErrorHandler {
  name: string = "unknown";

  handleErrors(
    baseService: BaseService,
    error: CFError,
    url: string
  ): Observable<CFError> {
    if (error.statusCode == 504) {
      this.raiseErrorModalAndRedirectToUrl(
        baseService,
        "Sorry, we're currently experiencing high volume. Please click Close to reload the page or try again later.",
        window.location.href
      );
    } else if (error.statusCode >= 500) {
      baseService.logger.debug("Handling unknown error");

      if (!unsecuredRoutes.some(x => x == url)) {
        // if not in unsecured routes
        baseService.logger.debug("Handling secured path for unknown error");
        this.raiseErrorModalAndRedirectToUrl(
          baseService,
          "Sorry, an error has occurred. Please log in again",
          "/login/login"
        );
      } else {
        // if in secured routes
        baseService.logger.debug("Handling unsecured path for unknown error");
        this.raiseErrorModalAndRedirectToUrl(
          baseService,
          "Sorry, an error has occurred. Please try again or contact support.",
          null
        );
      }
    }
    return throwError(error);
  }
}
