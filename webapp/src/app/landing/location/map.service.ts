import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

import {
  BaseService,
  TokenServiceRequestOptions,
  ServiceRequestOptions,
} from "../../global/base.service";
import { StorageService } from "src/app/global/storage.service";
import { LoggerService } from "src/app/global/logger.service";
import { ErrorModalService } from "src/app/error-modal/errormodal.service";
import {
  MapsLocationsGETRequestAPIArgs,
  MapsLocationsGETResponseAPIArgs,
} from "./interfaces/locations.interface";
import {
  MapsOverviewGETRequestArgs,
  MapsOverviewGETResponseAPIArgs,
} from "./interfaces/overview.interface";
import { LandingLocationsModel } from "./models/locations.model";
import { PointDetailsModel } from "./models/point-details.model";
import { URLLocationsModel } from "./models/url-locations.model";
import { OverviewModel } from "./models/overview.model";
import { Observable } from "rxjs";
import { CFError } from "src/app/global/error.service";
import { MapBounds, Point, Map } from "./interfaces/general.interface";
import { MapModel } from "./models/map.model";
import { MapPointGETResponseAPIArgs } from "./interfaces/point-details.interface";
import { MapBoundsModel } from "./models/bounds.model";
import { PointModel } from "./models/point.model";

/**
 * The service which provides data for the location-specific landing pages
 * with interactive maps
 */
@Injectable()
export class MapService extends BaseService {
  // Fired when user changes dropdown location
  locationChangedEvent: EventEmitter<LandingLocationsModel> = new EventEmitter<LandingLocationsModel>();

  // Fired when new overview data has come in from the backend
  gotOverviewEvent: EventEmitter<OverviewModel> = new EventEmitter<OverviewModel>();

  // Fired when point details data has come in from the backend
  gotPointDetailsEvent: EventEmitter<PointDetailsModel> = new EventEmitter<PointDetailsModel>();

  // Previous location model is stored to know whether location has changed
  lastLocationModel: LandingLocationsModel;

  constructor(
    http: HttpClient,
    logger: LoggerService,
    storage: StorageService,
    router: Router,
    errorModService: ErrorModalService,
    private location: Location
  ) {
    super(http, logger, storage, router, errorModService);
  }

  /**
   * Get supported states and supported cities and counties in state
   *
   * @param state Two character state code
   */
  getLocationsForState(state: string): Observable<LandingLocationsModel> {
    let data: MapsLocationsGETRequestAPIArgs = { state };

    let options = new ServiceRequestOptions({
      url: "maps/locations",
      data: data,
    });
    return this.postInject(
      this.get(options),
      (res: MapsLocationsGETResponseAPIArgs) => {
        return new LandingLocationsModel(res);
      }
    );
  }

  /**
   * Get map points and clusters within an area
   *
   * @param clusterBounds Area to get data within
   */
  getZoomedClusterPoints(clusterBounds: MapBoundsModel): Observable<MapModel> {
    let options = new TokenServiceRequestOptions({
      url: "map/points",
      data: clusterBounds.toArgs(),
    });
    return this.postInject(this.post(options), (res: Map) => {
      return new MapModel(res);
    });
  }

  /**
   * Get claim details for a particular point
   *
   * @param point Point to get details for
   */
  getPointDetails(point: PointModel): Observable<PointDetailsModel> {
    let options = new TokenServiceRequestOptions({
      url: "map/point",
      data: point.toArgs(),
    });
    return this.postInject(
      this.get(options),
      (res: MapPointGETResponseAPIArgs) => {
        return new PointDetailsModel(res);
      }
    );
  }

  /**
   * Get claim details for a particular point and fire gotPointDetailsEvent
   * @param point Point to get details for
   */
  runGetPointDetailsEvent(point: PointModel): void {
    this.getPointDetails(point).subscribe(
      (result: PointDetailsModel) => {
        this.gotPointDetailsEvent.emit(result);
      },
      (error: CFError) => this.onGetPointDetailsError(error)
    );
  }

  onGetPointDetailsError(error: CFError): void {
    this.logger.error("error getting point details", error);
  }

  /**
   * Get overview statistics and map data for a location
   *
   * @param selectedLocation City, county, or state name
   * @param rawState Two character state code
   * @param locationType "City of", "County of", or "State of"
   * @param mapWidth Width of displayed map in pixels
   */
  getOverview(
    selectedLocation: string,
    rawState: string,
    locationType: string,
    mapWidth: number
  ): Observable<OverviewModel> {
    let data: MapsOverviewGETRequestArgs = {
      location: selectedLocation,
      state: rawState,
      location_type: locationType,
      map_width: mapWidth,
    };

    let options = new ServiceRequestOptions({
      url: "map/overview",
      data: data,
    });
    return this.postInject(
      this.get(options),
      (res: MapsOverviewGETResponseAPIArgs) => {
        return new OverviewModel(res);
      }
    );
  }

  /**
   * Get overview statistics and map data for a location and fire gotOverviewEvent
   *
   * @param selectedLocation City, county, or state name
   * @param rawState Two character state code
   * @param locationType "City of", "County of", or "State of"
   * @param mapWidth Width of displayed map in pixels
   */
  runGetOverviewEvent(
    selectedLocation: string,
    rawState: string,
    locationType: string,
    mapWidth: number
  ): void {
    this.getOverview(
      selectedLocation,
      rawState,
      locationType,
      mapWidth
    ).subscribe(
      (result: OverviewModel) => {
        this.gotOverviewEvent.emit(result);
      },
      (error: CFError) => this.onGetOverviewError(error)
    );
  }

  onGetOverviewError(error: CFError): void {
    this.logger.error("error getting map page overview", error);
    if (error.name == "locationNotSupported") {
      this.router.navigate([""]);
    }
  }

  /**
   * Called on new location selected from dropdowns, sets URL to that location
   * and fires locationChangedEvent
   *
   * @param locationsModel New location to change to
   */
  onLocationChange(locationsModel: LandingLocationsModel): void {
    if (
      this.lastLocationModel &&
      this.lastLocationModel.matches(locationsModel)
    ) {
      // User selected same location in dropdown which was already there. No need
      // to emit event to trigger another request
      return;
    }

    let url: string = URLLocationsModel.urlFromLocation(
      locationsModel.selectedLocation,
      locationsModel.locationType,
      locationsModel.state
    );
    this.location.go(url);
    this.lastLocationModel = locationsModel.copy();
    this.locationChangedEvent.emit(locationsModel);
  }
}
