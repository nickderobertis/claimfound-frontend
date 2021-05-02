import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MapService } from "./map.service";
import { LandingLocationsModel } from "./models/locations.model";
import { URLLocationsModel } from "./models/url-locations.model";
import { Subscription } from "rxjs";
import { OverviewModel } from "./models/overview.model";
import { LoggerService } from "src/app/global/logger.service";
import { GoogleMapComponent } from "./map/googlemap.component";
import { getScrollbarWidth } from "src/app/global/utils/scroll-bar";

/**
 * The page component which shows has the location-specific landing page with the maps.
 *
 * Subcomponents:
 * * [LocationOverviewComponent]{@link LocationOverviewComponent}
 *     * [LocationDropdownComponent]{@link LocationDropdownComponent}
 * * [GoogleMapComponent]{@link GoogleMapComponent}
 * * [LocationTableComponent]{@link LocationTableComponent}
 */
@Component({
  selector: "cf-location-landing",
  templateUrl: "./location-landing.component.html",
  styleUrls: [
    "../../global/css/normalize.scss",
    "../../global/css/webflow.scss",
    "./location-landing.component.scss",
  ],
})
export class LocationLandingComponent implements OnInit, OnDestroy {
  model: OverviewModel;
  locationsModel: LandingLocationsModel;
  urlLocationsModel: URLLocationsModel;
  locationChanged$: Subscription;
  gotOverviewEvent$: Subscription;
  loading: boolean = true;

  @ViewChild(GoogleMapComponent, { static: false })
  mapComponent: GoogleMapComponent;

  constructor(
    route: ActivatedRoute,
    private mapService: MapService,
    protected logger: LoggerService
  ) {
    route.params.subscribe((params) => {
      this.urlLocationsModel = new URLLocationsModel({
        state: params.state,
        urlLocation: params.location,
      });
    });
  }

  ngOnInit() {
    // Get location data based on the URL
    this.mapService
      .getLocationsForState(this.urlLocationsModel.state)
      .subscribe((result: LandingLocationsModel) => {
        this.locationsModel = result;
        this.locationsModel.selectedLocation = this.urlLocationsModel.titleCaseLocation;
        this.locationsModel.locationType = this.urlLocationsModel.locationType;
        this.getOverview();
      });

    // When the user changes a dropdown, display the new location data
    this.locationChanged$ = this.mapService.locationChangedEvent.subscribe(
      (locationsModel: LandingLocationsModel) => {
        this.locationsModel = locationsModel;
        this.getOverview();
      }
    );

    // When overview statistics come from the service, display them
    this.gotOverviewEvent$ = this.mapService.gotOverviewEvent.subscribe(
      (result: OverviewModel) => {
        this.model = result;
        this.loading = false;
      }
    );
  }

  getOverview() {
    this.mapService.runGetOverviewEvent(
      this.locationsModel.selectedLocation,
      this.locationsModel.state,
      this.locationsModel.locationType,
      this.mapWidth
    );
  }

  get mapWidth(): number {
    if (!this.mapComponent || !this.mapComponent.map) {
      // Estimate map width based off CSS properties
      // If CSS properties change, update them here
      const cssWidthPct = 0.95;
      const maxWidth = 1301;

      // Scale by css width.
      let width = cssWidthPct * window.innerWidth - getScrollbarWidth();
      width = Math.min(width, maxWidth); // max-width = 1301px
      return width;
    }
    return this.mapComponent.map.getDiv().clientWidth;
  }

  ngOnDestroy() {
    if (this.locationChanged$) {
      this.locationChanged$.unsubscribe();
    }
    if (this.gotOverviewEvent$) {
      this.gotOverviewEvent$.unsubscribe();
    }
  }
}
