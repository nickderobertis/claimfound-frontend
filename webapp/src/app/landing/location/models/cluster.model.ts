import { Cluster, MapBounds } from "../interfaces/general.interface";
import { MapBoundsModel } from "./bounds.model";

export class ClusterModel implements Cluster {
  lat: number;
  lng: number;
  count: number;
  area: MapBoundsModel;
  state: string;

  constructor(args: Cluster) {
    this.lat = args.lat;
    this.lng = args.lng;
    this.count = args.count;
    this.area = new MapBoundsModel(args.area);
    this.state = args.state;
  }
}
