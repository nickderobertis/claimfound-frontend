import { FormGroup } from "@angular/forms";
import { ValidationMessages } from "src/app/global/api/interfaces/general/userInput/fieldErrors.interface";
import { ResetPasswordModel } from "./resetpassword.model";

export class ResetPassErrors {
  errorMessages: string[] = [];
  validationErrorMessages: ValidationMessages =
    ResetPasswordModel.validationErrorMessages;

  constructor() {}

}
