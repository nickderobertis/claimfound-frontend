import { FormFieldAttr } from "../../interfaces/general/userInput/field.interface";
import { ValidatorFn } from "@angular/forms";

export class InputFieldModel implements FormFieldAttr {
  id: string;
  backendKey: string;
  placeholder: string;
  divClass: string;
  type: string;
  validators: ValidatorFn | ValidatorFn[];
  updateOn: "change" | "blur" | "submit";
  formstate?: any; // initial value or object that defines initial value and disabled state

  constructor(args: FormFieldAttr) {
    this.id = args.id;
    this.backendKey = args.backendKey;
    this.placeholder = args.placeholder;
    this.divClass = args.divClass || "";
    this.type = args.type || "";
    this.validators = args.validators;
    this.updateOn = args.updateOn;
    this.formstate = args.formstate || "";
  }

  getFullErrorMessage(message: string): string {
    return this.placeholder + ": " + message;
  }

  static arrayFromArgsArray(fields: FormFieldAttr[]): InputFieldModel[] {
    let fieldModels: InputFieldModel[] = [];
    for (let field of fields) {
      fieldModels.push(new InputFieldModel(field));
    }
    return fieldModels;
  }
}
