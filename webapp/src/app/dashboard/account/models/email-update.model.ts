import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import {
  EmailUpdatePATCHRequestArgs,
  AccountDetailsGETAPIArgs,
} from "./account-page.interface";

import { Constants } from "./constants.model";
import { InputFieldsModel } from "src/app/global/api/models/userInput/inputFields.model";

import { FormFieldAttr } from "src/app/global/api/interfaces/general/userInput/field.interface";

/**
 * The model used by the account page to update the user's email
 *
 * ## Examples:
 * ```typescript
 let emailModel: EmailUpdateModel = EmailUpdateModel({ unformatted_email: "abc@123.com" });```
 */
export class EmailUpdateModel extends InputFieldsModel {
  /**
   * The current email for the user before any updates
   */
  currentEmail: string;
  /**
   * The new email which the user is trying to change to
   */
  newEmail: string;
  /**
   * The user's password
   */
  password: string;

  constructor(arg?: AccountDetailsGETAPIArgs) {
    super();
    if (!arg) {
      return;
    }
    this.currentEmail = arg.unformatted_email;
  }

  /**
   * Creates the email update form group for an existing form builder
   * @param fb A form builder instance to be created by the component
   */
  createFormGroup(fb: FormBuilder): FormGroup {
    return super.createFormGroup(fb, Constants.formFieldsAttr);
  }

  /**
   * Serializes the information in the model to be sent to the backend
   */
  toRequestArgs(): EmailUpdatePATCHRequestArgs {
    return {
      email: this.newEmail,
      password: this.password,
    };
  }

  /**
   * Used to set model attributes from form group created with [createFormGroup]{@link EmailUpdateModel#createFormGroup}
   * @param form A form group that was created from createFormGroup
   */
  setFromFormModel(form: FormGroup): void {
    this.newEmail = form.value.email;
    this.password = form.value.password;
  }
}
