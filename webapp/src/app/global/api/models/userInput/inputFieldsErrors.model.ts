import { FormGroup } from "@angular/forms";
import { InputFieldModel } from "./inputfield.model";
import {
  InputFieldErrorsObjArgs,
  ValidationMessages,
  InputFieldsErrorsArgs,
} from "../../interfaces/general/userInput/fieldErrors.interface";

export class InputFieldsErrors {
  errorMessages: string[] = [];
  errors: InputFieldErrorsObjArgs = {};
  formFields: InputFieldModel[] = [];
  validationErrorMessages: ValidationMessages = {};

  constructor(args?: InputFieldsErrorsArgs) {
    if (!args) {
      return;
    }
    this.errors = args.fields_errors;
    this.formFields = InputFieldModel.arrayFromArgsArray(args.fieldAttrs);
    this.validationErrorMessages = args.validationErrrorMessages || {};

    for (let field of this.formFields) {
      // Gets only non null fields from model
      if (this.errors[field.backendKey]) {
        this.errorMessages.push(
          field.getFullErrorMessage(this.errors[field.backendKey])
        );
      }
    }
  }

  setFormErrors(form: FormGroup) {
    for (let field of this.formFields) {
      if (this.errors[field.backendKey]) {
        form.controls[field.id].setErrors({
          userInfoForm: this.errors[field.backendKey],
        });
      }
    }
  }

  getOrderedFormValidationErrors(form: FormGroup): string[] {
    this.errorMessages = [];
    for (let field of this.formFields) {
      if (form.controls[field.id].errors) {
        for (let errorType of Object.keys(form.controls[field.id].errors)) {
          if (
            (form.controls[field.id].dirty || form.controls[field.id].touched) && // Added dirty condition to display errors immediately
            form.controls[field.id].errors[errorType]
          ) {
            let errMsg: string;
            if (this.validationErrorMessages.hasOwnProperty(errorType)) {
              // Example: First Name: Required.
              errMsg = this.validationErrorMessages[errorType];
            } else {
              // if errorType not part of validtionErrorMessages then use the
              // text from validation error. Used for userInfoForm errors
              errMsg = form.controls[field.id].errors[errorType];
            }
            this.errorMessages.push(field.getFullErrorMessage(errMsg));
          }
        }
      }
    }
    return this.errorMessages;
  }
}
