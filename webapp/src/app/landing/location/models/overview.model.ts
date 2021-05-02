import { MapsOverviewGETResponseAPIArgs } from "../interfaces/overview.interface";
import { MapModel } from "./map.model";
import { TopListsModel } from "./top-list.model";

export class OverviewModel {
  totalValue: number = 0;
  averageValue: number = 0;
  totalClaims: number = 0;
  largestClaim: number = 0;
  numberOfPeople: number = 0;
  numberOfBusinesses: number = 0;
  topLists: TopListsModel;
  map: MapModel;
  locationTypeChanged: boolean = false;
  lastLocationType: string;

  constructor(args?: MapsOverviewGETResponseAPIArgs) {
    if (!args) {
      return;
    }

    this.totalValue = args.total_value;
    this.averageValue = args.average_value;
    this.totalClaims = args.total_claims;
    this.largestClaim = args.largest_claim;
    this.numberOfPeople = args.number_of_people;
    this.numberOfBusinesses = args.number_of_businesses;
    this.map = new MapModel(args.map);
    this.topLists = new TopListsModel(args.top_lists);
  }
}
