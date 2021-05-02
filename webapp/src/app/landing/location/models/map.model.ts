import { ClusterModel } from "./cluster.model";
import { PointModel } from "./point.model";
import { MapBoundsModel } from "./bounds.model";
import { Map } from "../interfaces/general.interface";

export class MapModel {
  clusters: ClusterModel[] = [];
  points: PointModel[] = [];
  mapBounds: MapBoundsModel;
  zoomLevel: number;

  constructor(args?: Map) {
    if (!args) {
      return;
    }

    this.mapBounds = new MapBoundsModel(args.area);

    let clusters: ClusterModel[] = [];
    for (let clusterArgs of args.clusters) {
      let cluster: ClusterModel = new ClusterModel(clusterArgs);
      clusters.push(cluster);
    }
    this.clusters = clusters;

    let points: PointModel[] = [];
    for (let pointArgs of args.points) {
      let point: PointModel = new PointModel(pointArgs);
      points.push(point);
    }
    this.points = points;
    this.zoomLevel = args.zoom_level;
  }
}
