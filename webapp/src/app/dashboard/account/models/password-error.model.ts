import { Constants } from "./constants.model";
import { InputFieldsErrors } from "src/app/global/api/models/userInput/inputFieldsErrors.model";

import { PasswordFieldsErrorsArgs } from "./account-page.interface";
import {
  InputFieldsErrorsArgs,
  InputFieldErrorsObjArgs,
} from "src/app/global/api/interfaces/general/userInput/fieldErrors.interface";

export class PasswordErrorModel extends InputFieldsErrors {
  constructor(args?: PasswordFieldsErrorsArgs) {
    let superArgs: InputFieldsErrorsArgs = {
      fields_errors: {},
      fieldAttrs: Constants.passwordFormFieldsAttr,
      validationErrrorMessages: Constants.validationErrorMessages,
    };
    if (args) {
      superArgs.fields_errors = args.fields_errors as InputFieldErrorsObjArgs;
    }
    super(superArgs);
  }
}
