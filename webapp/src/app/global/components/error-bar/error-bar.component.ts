import { Component, OnDestroy, ElementRef, Input, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { ErrorBarService } from "../../services/error-bar.service";
import { FormGroup, ValidationErrors } from "@angular/forms";
import { CFError } from "../../error.service";
import { FormGroupHelper } from "../../utils/formGroupHelper";
import {
  ErrorMessagesArgs,
  ErrorBarCFErrorArgs,
} from "../../api/interfaces/general/error-bar.interface";

/**
 * A component for displaying errors.
 *
 * ## Usage:
 *
 * Add the component to the html and set the ID which is used to prevent
 * service calls from affecting other error bars.
 *
 * Optionally add a form to have form errors instantly reflected in the error bar.
 *
 * The showErrors input can be used to toggle the visiblity of the error bar.
 *
 * backendErrorKeysToFrontendFormMap is an object used to allow backend userInfoForm
 * errors to be mapped to the form that you input.
 *
 */
@Component({
  selector: "cf-error-bar",
  templateUrl: "./error-bar.component.html",
  styleUrls: ["./error-bar.component.scss"],
})
export class ErrorBarComponent implements OnInit, OnDestroy {
  @Input() form: FormGroup = new FormGroup({});
  @Input() showErrors: boolean = true;
  // Used to map userInfoForm errors to specific form input elements
  @Input() backendErrorKeysToFrontendFormMap: { [key: string]: string } = {};

  errorBarId: string;

  get errorMessages(): string[] {
    return this.formErrorMessages.concat(this.otherErrorMessages);
  }
  formErrorMessages: string[] = [];
  otherErrorMessages: string[] = [];

  formValueChangedEvent$: Subscription;
  gotCFErrorEvent$: Subscription;
  gotErrorMessageEvent$: Subscription;
  clearNonFormErrorsEvent$: Subscription;
  /**
   * Used as key for validation errors when setting them on input forms.
   * Message will show whatever string is provided as the value for the key.
   * Default is just there so you don't think this doesn't allow a default error message.
   */
  static ERROR_BAR_ERROR_TYPES = {
    REQUIRED: "required",
    PATTERN: "pattern",
    NOSELECTION: "noSelection",
    DUPLICATE: "duplicate",
    MINLENGTH: "minlength",
    MESSAGE: "message",
    DEFAULT: "default",
  };

  constructor(
    private errorBarService: ErrorBarService,
    private el: ElementRef
  ) {
    this.errorBarId = el.nativeElement.attributes.id.nodeValue;
  }

  ngOnInit() {
    this.formValueChangedEvent$ = this.form.statusChanges.subscribe(
      (status: any) => {
        if (this.anyFieldInvalid) {
          this.formErrorMessages = this.getFormValidationErrors();
        } else {
          this.formErrorMessages = [];
        }
      }
    );
    this.gotCFErrorEvent$ = this.errorBarService.onCFErrorEvent.subscribe(
      (error: ErrorBarCFErrorArgs) => {
        if (error.hasOwnProperty(this.errorBarId)) {
          this.getCFErrorMessages(error[this.errorBarId]);
        }
      }
    );
    this.gotErrorMessageEvent$ = this.errorBarService.pushErrorMessageEvent.subscribe(
      (messages: ErrorMessagesArgs) => {
        if (messages.hasOwnProperty(this.errorBarId)) {
          this.otherErrorMessages = this.otherErrorMessages.concat(
            messages[this.errorBarId]
          );
        }
      }
    );
    this.clearNonFormErrorsEvent$ = this.errorBarService.clearNonFormErrorsEvent.subscribe(
      (id: string) => {
        if (id == this.errorBarId) {
          this.clearNonFormErrors();
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.formValueChangedEvent$.unsubscribe();
    this.gotCFErrorEvent$.unsubscribe();
    this.gotErrorMessageEvent$.unsubscribe();
    this.clearNonFormErrorsEvent$.unsubscribe();
  }

  get displayErrors(): boolean {
    return this.showErrors && this.errorMessages.length > 0;
  }

  get anyFieldInvalid(): boolean {
    return this.form.invalid;
  }

  clearNonFormErrors() {
    this.otherErrorMessages = [];
  }

  getFormValidationErrors(): string[] {
    let errors: string[] = [];
    Object.keys(this.form.controls).forEach((key) => {
      const controlErrors: ValidationErrors = this.form.get(key).errors;

      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          let text: string;
          switch (keyError) {
            case ErrorBarComponent.ERROR_BAR_ERROR_TYPES.REQUIRED:
              text = `${key} is required!`;
              break;
            case ErrorBarComponent.ERROR_BAR_ERROR_TYPES.PATTERN:
              text = `${key} has invalid characters!`;
              break;
            case ErrorBarComponent.ERROR_BAR_ERROR_TYPES.DUPLICATE:
              text = `You have already added this item!`;
              break;
            case ErrorBarComponent.ERROR_BAR_ERROR_TYPES.MINLENGTH:
              text = `${key} has wrong length! Required length: ${controlErrors[keyError].requiredLength}`;
              break;
            case ErrorBarComponent.ERROR_BAR_ERROR_TYPES.NOSELECTION:
              text = `Please select an answer for ${key}.`;
              break;
            case ErrorBarComponent.ERROR_BAR_ERROR_TYPES.MESSAGE:
              text = `${controlErrors[keyError]}`;
              break;
            default:
              if (typeof controlErrors[keyError] === "string") {
                text = `${key}: ${controlErrors[keyError]}`;
              } else {
                text = `${key}: Please re-enter your answer!`;
              }
          }
          errors.push(text);
        });
      }
    });
    return errors;
  }

  getCFErrorMessages(error: CFError) {
    if (error.name === "userInfoForm") {
      FormGroupHelper.setFormErrors(
        this.backendErrorKeysToFrontendFormMap,
        error.data.fields_errors,
        this.form
      );
    } else {
      if (error.displayMessage) {
        this.otherErrorMessages.push(error.displayMessage);
      } else if (error.message) {
        this.otherErrorMessages.push(error.message);
      }
    }
  }
}
