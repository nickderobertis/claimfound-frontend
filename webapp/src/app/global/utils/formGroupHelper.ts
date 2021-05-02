import { FormGroup } from '@angular/forms';

export class FormGroupHelper {

    static setFormErrors(
        backendKeyToFrontendKeyMap: { [key: string]: string },
        errorFields: { [key: string]: string },
        formGroup: FormGroup
      ): void {
        for (let field in errorFields) {
          let errorType = backendKeyToFrontendKeyMap[field];
          let errorObject: { [key: string]: string } = {};
          errorObject[errorType] = errorFields[field];
          if (formGroup.controls[errorType]) {
            formGroup.controls[errorType].setErrors(errorObject);
          }
        }
    }
}