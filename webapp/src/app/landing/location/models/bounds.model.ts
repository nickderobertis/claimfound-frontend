/// <reference path="../../../../../node_modules/@types/googlemaps/index.d.ts" />
import { MapBounds, MapBoundsWithZoom } from "../interfaces/general.interface";

export class MapBoundsModel implements MapBounds {
  southwest: number[];
  northeast: number[];
  zoomLevel: number;

  constructor(args?: MapBounds, zoomLevel?: number) {
    if (!args) {
      return;
    }
    this.southwest = args.southwest;
    this.northeast = args.northeast;
    if (zoomLevel) {
      this.zoomLevel = zoomLevel;
    }
  }

  toGoogleBounds(): google.maps.LatLngBounds {
    let southWest = new google.maps.LatLng(
      this.southwest[0],
      this.southwest[1]
    );
    let northEast = new google.maps.LatLng(
      this.northeast[0],
      this.northeast[1]
    );
    return new google.maps.LatLngBounds(southWest, northEast);
  }

  toArgs(): MapBoundsWithZoom {
    return {
      southwest: this.southwest,
      northeast: this.northeast,
      zoom_level: this.zoomLevel,
    };
  }

  setZoomLevelfromMap(map: google.maps.Map) {
    this.zoomLevel = map.getZoom();
  }

  static fromGoogleMap(map: google.maps.Map) {
    const latLng = map.getBounds();
    const zoomLevel = map.getZoom();
    return MapBoundsModel.fromGoogleLatLng(latLng, zoomLevel);
  }

  static fromGoogleLatLng(
    latLng: google.maps.LatLngBounds,
    zoomLevel?: number
  ) {
    let bounds: MapBounds = {
      southwest: [latLng.getSouthWest().lat(), latLng.getSouthWest().lng()],
      northeast: [latLng.getNorthEast().lat(), latLng.getNorthEast().lng()],
    };
    return new MapBoundsModel(bounds, zoomLevel);
  }
}
