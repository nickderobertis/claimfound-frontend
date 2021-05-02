import { Component, Input, Output, EventEmitter } from "@angular/core";

import { PropertySearchModel } from "./models/property-search.model";

/**
 * An input field for the names in the property search
 */
@Component({
  selector: "cf-search-div",
  templateUrl: "./searchdiv.component.html",
  styleUrls: [
    "../../global/css/normalize.scss",
    "../../global/css/webflow.scss",
    "./searchdiv.component.scss",
  ],
})
export class SearchDivComponent {
  @Input() field: string = "";
  @Input() placeHolder: string = "";
  @Input() editable: boolean = null;
  @Input() inputId: string = "";
  @Input() searchModel: PropertySearchModel;

  @Output() clicked = new EventEmitter();

  onClick(event: any) {
    this.clicked.emit(event);
  }
}
