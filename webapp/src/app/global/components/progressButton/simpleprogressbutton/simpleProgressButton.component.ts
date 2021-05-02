import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
  Output,
  EventEmitter,
} from "@angular/core";

import { LoggerService } from "../../../logger.service";
import { SimpleProgressButtonModel } from "./simpleProgressButton.model";

/**
 * A simple progress button
 */
@Component({
  selector: "cf-simple-progress-button",
  templateUrl: "./simpleProgressButton.component.html",
  styleUrls: [
    "../../../../global/css/normalize.scss",
    "../../../../global/css/webflow.scss",
    "./simpleProgressButton.component.scss",
  ],
})
export class SimpleProgressButtonComponent {
  @Input() model: SimpleProgressButtonModel;
  @Output() submitEvent: EventEmitter<any> = new EventEmitter();

  constructor(private logger: LoggerService) {}

  get accountButtonClass(): string {
    if (this.model.disabled) {
      return "disabled";
    } else if (this.model.showSpinner) {
      return "spinning";
    } else {
      return "";
    }
  }

  onButtonClicked() {
    if (!this.model.showSpinner) {
      this.model.showSpinner = true;
      this.submitEvent.emit();
    }
  }
}
