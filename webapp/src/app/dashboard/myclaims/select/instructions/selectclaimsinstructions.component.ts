import { Component, Output, EventEmitter } from "@angular/core";

/**
 * This component is just a small widget containing instructions for the user
 * about how to select their claims
 */
@Component({
  selector: "cf-select-claims-instructions",
  templateUrl: "./selectclaimsinstructions.component.html",
  styleUrls: [
    "../../../../global/css/normalize.scss",
    "../../../../global/css/webflow.scss",
    "./selectclaimsinstructions.component.scss",
  ],
})
export class SelectClaimsInstructionsComponent {
  @Output() sawInstructions: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  onViewClaimsClick(): void {
    this.sawInstructions.emit(true);
  }
}
