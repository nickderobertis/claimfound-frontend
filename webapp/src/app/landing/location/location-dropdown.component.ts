import { Component } from "@angular/core";
import { DropdownComponent } from "src/app/global/components/dropdown/dropdown.component";
/**
 * The component for the dropdowns on the location-specific landing pages with the maps.
 * Allows selecting City Of/County Of, and then the location
 */
@Component({
  selector: "cf-location-dropdown",
  templateUrl: "../../global/components/dropdown/dropdown.component.html",
  styleUrls: [
    "../../global/css/normalize.scss",
    "../../global/css/webflow.scss",
    "./location-dropdown.component.scss",
  ],
  host: {
    "(document:click)": "onClickOutside($event)",
  },
})
export class LocationDropdownComponent extends DropdownComponent {}
