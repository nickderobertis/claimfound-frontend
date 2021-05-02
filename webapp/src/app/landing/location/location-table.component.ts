import { Component, Input } from "@angular/core";
import { TopListModel } from "./models/top-list.model";
import { LandingLocationsModel } from "./models/locations.model";

/**
 * The component which represents a table on the location-specific landing pages
 */
@Component({
  selector: "cf-location-table",
  templateUrl: "./location-table.component.html",
  styleUrls: [
    "../../global/css/normalize.scss",
    "../../global/css/webflow.scss",
    "./location-table.component.scss",
  ],
})
export class LocationTableComponent {
  @Input() model: TopListModel = new TopListModel("", "", []);
  @Input() locationsModel: LandingLocationsModel = new LandingLocationsModel();
  constructor() {}
}
