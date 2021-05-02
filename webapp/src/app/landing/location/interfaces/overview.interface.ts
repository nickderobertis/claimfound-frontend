import { Map } from "./general.interface";

export interface MapsOverviewGETResponseAPIArgs {
  total_value: number;
  average_value: number;
  total_claims: number;
  largest_claim: number;
  number_of_people: number;
  number_of_businesses: number;
  top_lists: TopLists;
  map: Map;
}

export interface MapsOverviewGETRequestArgs {
  location: string;
  state: string;
  location_type: string;
  map_width: number;
}

export interface TopLists {
  companies: TopListValue[];
  up_types: TopListValue[];
}

export interface TopListValue {
  name: string;
  total_value: number;
  total_claims: number;
}
