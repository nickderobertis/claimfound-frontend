import { Component, Input, OnChanges } from "@angular/core";
import { MapService } from "./map.service";
import { DropDownModel } from "src/app/global/components/dropdown/dropdown.model";
import { OverviewModel } from "./models/overview.model";
import { LandingLocationsModel } from "./models/locations.model";
import { URLLocationsModel } from "./models/url-locations.model";
import { LocationConstants } from "./location.constants";

/**
 * The component on the location-specific landing pages which shows the overview
 * information about the location such as total clams, average claim value, etc.
 * It also holds the dropdown components to switch locations.
 *
 * Subcomponents:
 * * [LocationDropdownComponent]{@link LocationDropdownComponent}
 */
@Component({
  selector: "cf-location-overview",
  templateUrl: "./location-overview.component.html",
  styleUrls: [
    "../../global/css/normalize.scss",
    "../../global/css/webflow.scss",
    "./location-overview.component.scss",
  ],
})
export class LocationOverviewComponent implements OnChanges {
  @Input() model: OverviewModel = new OverviewModel();
  @Input() locationsModel: LandingLocationsModel = new LandingLocationsModel();
  @Input() urlLocationsModel: URLLocationsModel = new URLLocationsModel();
  locationTypeDropDownModel: DropDownModel = new DropDownModel(
    LocationConstants.locationTypesArr,
    this.locationsModel.locationType,
    false,
    true
  );
  locationDropDownModel: DropDownModel = new DropDownModel(
    this.locationsModel.locations
  );
  constructor(private mapService: MapService) {}

  ngOnChanges() {
    this.updateDropdownPlaceholders();
    this.updateDropdownItems();
  }

  updateDropdownPlaceholders() {
    this.locationTypeDropDownModel.defaultPlaceHolder = this.locationsModel.locationType;
    this.locationDropDownModel.defaultPlaceHolder = this.locationsModel.selectedLocation;
  }

  onLocationTypeDropDownSelectionChange() {
    let locationType: string = this.locationTypeDropDownModel.getSingleSelection();
    if (this.locationsModel.locationType !== locationType) { // Don't do anything if didn't change
      if (!this.model.locationTypeChanged) {
        // On first dropdown type change, record the location
        // which is currently displayed
        this.model.lastLocationType = this.locationsModel.locationType;
      }
      this.model.locationTypeChanged = true;
      this.locationsModel.locationType = locationType;
      this.locationDropDownModel.selectedItems = new Set([""]);
      this.updateDropdownItems();
    }
  }

  onLocationDropDownSelectionChange() {
    let location: string = this.locationDropDownModel.getSingleSelection();
    this.locationsModel.selectedLocation = location;
    if (this.locationsModel.selectedLocation) {
      this.updateUrl();
      this.model.locationTypeChanged = false;
    }
  }

  updateUrl() {
    this.urlLocationsModel.urlLocation = this.locationsModel.selectedLocation;
    // Actual update is done inside map service
    this.mapService.onLocationChange(this.locationsModel);
  }

  updateDropdownItems() {
    this.locationTypeDropDownModel.items = LocationConstants.locationTypesArr;
    this.locationDropDownModel.items = this.locationsModel.locations;
  }

  get locationTypeText(): string {
    // Don't update city of, county of, etc. until actually changing location
    if (this.model.locationTypeChanged) {
      return this.model.lastLocationType;
    }
    return this.locationsModel.locationType;
  }
}
