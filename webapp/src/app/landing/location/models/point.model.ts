import { Point } from "../interfaces/general.interface";

export class PointModel implements Point {
  lat: number;
  lng: number;
  state: string;

  constructor(args: Point) {
    this.lat = args.lat;
    this.lng = args.lng;
    this.state = args.state;
  }

  toArgs(): Point {
    return {
      lat: this.lat,
      lng: this.lng,
      state: this.state
    };
  }
}
