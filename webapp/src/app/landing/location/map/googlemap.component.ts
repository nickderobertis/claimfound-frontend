/// <reference path="../../../../../node_modules/@types/googlemaps/index.d.ts" />
import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  OnDestroy,
} from "@angular/core";
import { Subscription } from "rxjs";
import { LoggerService } from "src/app/global/logger.service";
import { sleep } from "src/app/global/utils";
import { OverviewModel } from "../models/overview.model";
import { MapService } from "../map.service";
import { GoogleMapStyles } from "./googlemapstyles";
import { MapBoundsModel } from "../models/bounds.model";
import { PointModel } from "../models/point.model";
import { ClusterModel } from "../models/cluster.model";
import { MapModel } from "../models/map.model";

declare global {
  interface Window {
    googleMapsLoaded: boolean;
  }
}

/**
 * Displays a google map view
 */
@Component({
  selector: "cf-googlemap-view",
  templateUrl: "./googlemap.component.html",
  styleUrls: [
    "../../../global/css/normalize.scss",
    "../../../global/css/webflow.scss",
    "./googlemap.component.scss",
  ],
})
export class GoogleMapComponent implements OnDestroy {
  @Input() overviewModel: OverviewModel;

  gotOverviewEvent$: Subscription;

  getPoints$: Subscription;

  @ViewChild("mapContainer", { static: false }) gmap: ElementRef;
  @ViewChild("mapSearchBox", { static: true }) searchElement: ElementRef;

  map: google.maps.Map;

  searchBox: google.maps.places.SearchBox;

  markers: google.maps.Marker[] = [];

  clusterIconBig: string = "/images/CF-Cluster-green-large.svg";
  pointerIcon: string = "/images/CF-point-marker-green.svg";

  // Flag to suppress handling of on Zoom after user clicks cluster and on inital load.
  clusterZoomExpected: boolean = true;

  constructor(
    protected mapService: MapService,
    protected logger: LoggerService
  ) {}

  ngOnInit() {
    this.gotOverviewEvent$ = this.mapService.gotOverviewEvent.subscribe(
      (result: OverviewModel) => {
        this.overviewModel = result;
        this.fitBoundsForOverview(this.overviewModel);
        this.setMapIcons(
          this.map,
          this.overviewModel.map.points,
          this.overviewModel.map.clusters
        );
      }
    );
  }

  ngOnDestroy(): void {
    if (this.gotOverviewEvent$) {
      this.gotOverviewEvent$.unsubscribe();
    }
    if (this.getPoints$) {
      this.getPoints$.unsubscribe();
    }
  }

  mapInitializer() {
    let mapOptions: google.maps.MapOptions = {
      clickableIcons: true,
      disableDefaultUI: true,
      zoomControl: true,
      gestureHandling: "cooperative",
      styles: GoogleMapStyles.mapTypeStyles,
    };

    this.map = new google.maps.Map(this.gmap.nativeElement, mapOptions);
    this.fitBoundsForOverview(this.overviewModel);

    this.setMapIcons(
      this.map,
      this.overviewModel.map.points,
      this.overviewModel.map.clusters
    );

    let dragEndCallback = () => {
      this.onDragEnd();
    };
    this.map.addListener("dragend", dragEndCallback);

    let mapZoomCallback = () => {
      this.onZoomChange();
    };
    this.map.addListener("zoom_changed", mapZoomCallback);

    this.searchBox = new google.maps.places.SearchBox(
      this.searchElement.nativeElement
    );
    this.searchBox.setBounds(this.overviewModel.map.mapBounds.toGoogleBounds());

    this.map.controls[google.maps.ControlPosition.RIGHT_TOP].push(
      this.searchElement.nativeElement
    );

    let searchBoxCallback = () => {
      this.onSearchBoxPlacesChanged();
    };
    this.searchBox.addListener("places_changed", searchBoxCallback);
  }

  ngAfterViewInit() {
    this.initialize();
  }

  initialize() {
    // Google maps JS is loaded async as the URL is dynamically constructed with
    // the API key. window.googleMapsLoaded gets set to true once it loads.
    // Try every 50ms to initialize, and only do so once script is done loading
    // See /js/google_maps.js
    if (window.googleMapsLoaded) {
      this._initialize();
    } else {
      sleep(50).then(() => {
        this.initialize();
      });
    }
  }

  _initialize() {
    this.mapInitializer();
  }

  /**
   * On clicking a point, request and display the details for that point
   *
   * @param point The clicked point
   */
  onPointClick(point: PointModel) {
    this.mapService.runGetPointDetailsEvent(point);
  }

  onDragEnd() {
    this.onMapMoved(MapBoundsModel.fromGoogleMap(this.map));
  }

  onZoomChange() {
    if (!this.clusterZoomExpected) {
      this.onMapMoved(MapBoundsModel.fromGoogleMap(this.map));
    } else {
      this.clusterZoomExpected = false;
    }
  }

  /**
   * On clicking a cluster, zoom to its area
   *
   * @param cluster The clicked cluster
   */
  onClusterClick(cluster: ClusterModel) {
    this.clusterZoomExpected = true;
    this.fitBounds(cluster.area);
    const newBounds = MapBoundsModel.fromGoogleMap(this.map);
    this.onMapMoved(newBounds);
  }

  /**
   * After the user moves the map, request the points and clusters
   *
   * @param newBounds New bounds of the map after move
   */
  onMapMoved(newBounds: MapBoundsModel) {
    if (this.getPoints$) {
      this.getPoints$.unsubscribe();
    }
    this.getPoints$ = this.mapService
      .getZoomedClusterPoints(newBounds)
      .subscribe((result: MapModel) => {
        this.setMapIcons(this.map, result.points, result.clusters);
      });
  }

  onSearchBoxPlacesChanged() {
    let places = this.searchBox.getPlaces();

    if (places.length === 1 && places[0].geometry) {
      // Single result, fit map to its bounds
      this.fitBounds(
        MapBoundsModel.fromGoogleLatLng(places[0].geometry.viewport)
      );
    } else if (places.length > 1) {
      // Multiple results. Create bounds that will cover all results
      let bounds = new google.maps.LatLngBounds();
      let foundLocation: boolean = false;
      for (const place of places) {
        if (place.geometry) {
          foundLocation = true;
          bounds.extend(place.geometry.location);
        }
      }
      if (foundLocation) {
        this.fitBounds(MapBoundsModel.fromGoogleLatLng(bounds));
      }
    }
  }

  /**
   * Fits bounds of google map to a bounds model
   *
   * @param bounds Desired new bounds of the map
   * @param zoomLevel Desired new zoom level for the map. Will force
   * the map to this zoom level if it is passed
   */
  fitBounds(bounds: MapBoundsModel, zoomLevel?: number) {
    const googleBounds = bounds.toGoogleBounds();

    if (zoomLevel) {
      // Add a one time event listener to change the zoom to the desired
      // level after fitting map bounds
      let adjustZoomCallback = (event) => {
        this.clusterZoomExpected = true;
        this.map.setZoom(zoomLevel);
      };
      google.maps.event.addListenerOnce(
        this.map,
        "bounds_changed",
        adjustZoomCallback
      );
    }

    this.map.fitBounds(googleBounds);
  }

  fitBoundsForOverview(overviewModel: OverviewModel) {
    this.fitBounds(overviewModel.map.mapBounds, overviewModel.map.zoomLevel);
  }

  setMapIcons(
    map: google.maps.Map,
    points: PointModel[],
    clusters: ClusterModel[]
  ) {
    this.clearMarkers();
    this.markers = [];

    // Add points to map
    for (let point of points) {
      let coordinate = new google.maps.LatLng(point.lat, point.lng);

      let marker = new google.maps.Marker({
        position: coordinate,
        map: map,
        icon: this.pointerIcon,
      });

      // Using an arrow function because otherwise component variables can't be referenced
      // from a javascript call back.
      let pointClickCallback = () => {
        this.onPointClick(point);
      };

      this.markers.push(marker);
      marker.setMap(map);
      marker.addListener("click", pointClickCallback);
    }

    // Add clusters to map
    for (let cluster of clusters) {
      let coordinate = new google.maps.LatLng(cluster.lat, cluster.lng);

      let iconPath: string = this.clusterIconBig;

      let marker = new google.maps.Marker({
        position: coordinate,
        map: map,
        icon: iconPath,
        label: this.clusterTotalToClusterString(cluster.count),
      });

      // Using an arrow function because otherwise component variables can't be referenced
      // from a javascript call back.
      let clusterClickCallback = () => {
        this.onClusterClick(cluster);
      };

      this.markers.push(marker);
      marker.setMap(map);
      marker.addListener("click", clusterClickCallback);
    }
  }

  clearMarkers() {
    for (let marker of this.markers) {
      marker.setMap(null);
    }
  }

  clusterTotalToClusterString(total: number): string {
    // TODO: Perhaps move cluster count display conversion to the backend
    if (total >= 1000000000) {
      return Math.floor(total / 1000000000).toString() + "B";
    } else if (total >= 1000000) {
      return Math.floor(total / 1000000).toString() + "M";
    } else if (total >= 1000) {
      return Math.floor(total / 1000).toString() + "K";
    } else {
      return total.toString();
    }
  }
}
