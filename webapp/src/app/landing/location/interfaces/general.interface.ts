export interface Cluster {
  lat: number;
  lng: number;
  count: number;
  area: MapBounds;
  state: string;
}

export interface Point {
  lat: number;
  lng: number;
  state: string;
}

export interface Map {
  area: MapBounds;
  clusters: Cluster[];
  points: Point[];
  zoom_level: number;
}

export interface MapBounds {
  southwest: number[];
  northeast: number[];
}

export interface MapBoundsWithZoom extends MapBounds {
  zoom_level: number;
}
