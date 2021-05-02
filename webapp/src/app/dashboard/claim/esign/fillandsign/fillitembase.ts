import { Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

/**
 * The base class for all the components in which the user fills
 * information for the forms on the e-sign forms page
 */
export class FillItemBaseComponent {
  @Input() fillAndSignForm: FormGroup;
  @Input() showError: boolean = false;

  textBoxErrorClass(field: string): string {
    if (this.showError && this.fillAndSignForm.controls[field].invalid) {
      return "error";
    } else {
      return "";
    }
  }

  anyFieldInvalid(formConstants: { [key: string]: string }): boolean {
    for (let key in formConstants) {
      if (this.fillAndSignForm.controls[key].invalid) {
        return true;
      }
    }
    return false;
  }
}
