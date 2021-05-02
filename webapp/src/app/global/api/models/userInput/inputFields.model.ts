import { FormBuilder, FormGroup } from "@angular/forms";

import {
  FormFieldAttr,
  FormGroupArgs,
} from "../../interfaces/general/userInput/field.interface";

export class InputFieldsModel {
  createFormGroup(
    fb: FormBuilder,
    formFieldsAttrs: FormFieldAttr[]
  ): FormGroup {
    let groupArgs: FormGroupArgs = {};
    for (let formAttrs of formFieldsAttrs) {
      groupArgs[formAttrs.id] = [
        formAttrs.formstate || "",
        { validators: formAttrs.validators, updateOn: formAttrs.updateOn },
      ];
    }
    return fb.group(groupArgs);
  }

  disableFormControl(form: FormGroup, controlName: string) {
    form.controls[controlName].disable();
  }

  enableFormControl(form: FormGroup, controlName: string) {
    form.controls[controlName].enable();
  }
}
