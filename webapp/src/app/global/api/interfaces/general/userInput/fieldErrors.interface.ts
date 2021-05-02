import { FormFieldAttr } from "./field.interface";

export interface InputFieldErrorsObjArgs {
  [keyName: string]: string;
}

export interface InputFieldsErrorsArgs {
  fields_errors: InputFieldErrorsObjArgs;
  fieldAttrs: FormFieldAttr[];
  validationErrrorMessages?: ValidationMessages;
}

export interface ValidationMessages {
  [keyName: string]: string;
}
