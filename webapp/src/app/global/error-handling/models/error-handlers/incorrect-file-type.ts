import { ErrorHandler } from "../error-handler";
import { BaseService } from "../../../base.service";
import { Observable, throwError } from "rxjs";
import { CFError } from "src/app/global/error.service";

export class IncorrectFileTypeHandler extends ErrorHandler {
  name: string = "incorrectFileUploadType";

  handleErrors(
    baseService: BaseService,
    error: CFError,
    url: string
  ): Observable<CFError> {
    return throwError(error);
  }
}
