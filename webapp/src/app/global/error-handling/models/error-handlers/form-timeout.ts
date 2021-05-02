import { ErrorHandler } from "../error-handler";
import { BaseService } from "../../../base.service";
import { Observable, throwError } from "rxjs";
import { CFError } from "src/app/global/error.service";

export class FormTimeoutErrorHandler extends ErrorHandler {
  name: string = "formTimeout";

  handleErrors(
    baseService: BaseService,
    error: CFError,
    url: string
  ): Observable<CFError> {
    error.expected = true;
    return throwError(error);
  }
}
