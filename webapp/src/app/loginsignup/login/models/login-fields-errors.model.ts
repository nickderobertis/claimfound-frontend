import {LoginFieldErrorsArgs} from "../../../global/api/interfaces/general/login.interface";
import {Constants} from "./Constants";
import { InputFieldsErrors } from "src/app/global/api/models/userInput/inputFieldsErrors.model";
import {
  InputFieldsErrorsArgs,
  InputFieldErrorsObjArgs,
} from "src/app/global/api/interfaces/general/userInput/fieldErrors.interface";

export class LoginFieldsErrors extends InputFieldsErrors{
  constructor(args?: LoginFieldErrorsArgs) {


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
