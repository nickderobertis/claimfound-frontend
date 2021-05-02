import { Component, Input, Output, EventEmitter } from "@angular/core";
import { RadioButtonModel } from "./radiobutton.model";

/**
 * A styled version of a radio button input.
 */
@Component({
  selector: "cf-radio-button",
  templateUrl: "./radiobutton.component.html",
  styleUrls: [
    "./radiobutton.component.scss",
    "../../../global/css/normalize.scss",
    "../../../global/css/webflow.scss",
  ],
})
export class RadioButtonComponent {
  @Input() model: RadioButtonModel;
  @Input() prefix: string;
  @Output() select = new EventEmitter<string>();

  isOptionSelected(option: string) {
    if (option === this.model.selectedOption) {
      return "active";
    }
    return "";
  }

  onOptionSelect(option: string) {
    this.model.selectedOption = option;
    this.select.emit(option);
  }
}
