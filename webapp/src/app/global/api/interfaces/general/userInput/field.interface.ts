import {
  ValidatorFn,
  AbstractControlOptions,
  AsyncValidatorFn,
} from "@angular/forms";

export interface FormFieldAttr {
  id: string;
  backendKey: string;
  placeholder: string;
  divClass?: string;
  type?: string;
  validators: ValidatorFn | ValidatorFn[];
  updateOn: "change" | "blur" | "submit";
  formstate?: any; // initial value or object that defines initial value and disabled state
}

export interface FormGroupArgs {
  [key: string]: [
    any,
    AbstractControlOptions,
    (AsyncValidatorFn | AsyncValidatorFn[])?
  ];
}
