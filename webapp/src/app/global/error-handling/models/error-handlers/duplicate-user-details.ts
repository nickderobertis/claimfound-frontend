import {
    ErrorHandler
} from '../error-handler';

import { Observable, throwError } from 'rxjs';

import {
    BaseService
} from '../../../base.service';
import { CFError } from 'src/app/global/error.service';

export class DuplicateUserDetailsErrorHandler extends ErrorHandler {
    name: string = 'duplicateUserDetails';

    handleErrors(baseService: BaseService, error: CFError, url: string) : Observable<CFError> {
        error.expected = true;
        return throwError(error);
    }
}