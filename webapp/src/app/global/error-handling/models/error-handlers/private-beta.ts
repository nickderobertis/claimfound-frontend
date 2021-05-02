import { ErrorHandler } from "../error-handler";

import { Observable, throwError } from "rxjs";

import { BaseService } from "../../../base.service";
import { CFError } from "src/app/global/error.service";

export class PrivateBetaErrorHandler extends ErrorHandler {
  name: string = "unauthorizedBeta";

  handleErrors(
    baseService: BaseService,
    error: CFError,
    url: string
  ): Observable<CFError> {
    baseService.router.navigate(["/login/beta"]);

    return throwError(error);
  }
}
