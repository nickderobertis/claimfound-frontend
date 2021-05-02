import { SignUpFieldsErrorsArgs } from "../../../global/api/interfaces/general/signup.interface";
import { Constants } from "./constants.model";
import { InputFieldsErrors } from "src/app/global/api/models/userInput/inputFieldsErrors.model";
import {
  InputFieldsErrorsArgs,
  InputFieldErrorsObjArgs,
} from "src/app/global/api/interfaces/general/userInput/fieldErrors.interface";

export class SignUpFieldsErrors extends InputFieldsErrors {
  constructor(args?: SignUpFieldsErrorsArgs) {
    let superArgs: InputFieldsErrorsArgs = {
      fields_errors: {},
      fieldAttrs: Constants.formFieldsAttr,
      validationErrrorMessages: Constants.validationErrorMessages,
    };
    if (args) {
      superArgs.fields_errors = args.fields_errors as InputFieldErrorsObjArgs;
    }
    super(superArgs);
  }
}
