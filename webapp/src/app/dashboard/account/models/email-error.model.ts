import { Constants } from "./constants.model";
import { InputFieldsErrors } from "src/app/global/api/models/userInput/inputFieldsErrors.model";

import { EmailFieldsErrorsArgs } from "./account-page.interface";
import {
  InputFieldsErrorsArgs,
  InputFieldErrorsObjArgs,
} from "src/app/global/api/interfaces/general/userInput/fieldErrors.interface";

export class EmailErrorModel extends InputFieldsErrors {
  constructor(args?: EmailFieldsErrorsArgs) {
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
