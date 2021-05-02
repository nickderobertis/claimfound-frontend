import { Component } from "@angular/core";
import { DropdownComponent } from "src/app/global/components/dropdown/dropdown.component";

/**
 * The dropdown for relatives and associates follow up questions.
 */
@Component({
  selector: "cf-relative-questions-dropdown",
  templateUrl:
    "../../../../../../../global/components/dropdown/dropdown.component.html",
  styleUrls: [
    "../../../../../../../global/css/normalize.scss",
    "../../../../../../../global/css/webflow.scss",
    "./relativequestionsdropdown.component.scss",
  ],
  host: {
    "(document:click)": "onClickOutside($event)",
  },
})
export class RelativeQuestionsDropdownComponent extends DropdownComponent {}
