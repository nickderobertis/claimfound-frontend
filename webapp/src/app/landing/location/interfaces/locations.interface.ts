export interface MapsStateLocations {
  cities: string[];
  counties: string[];
}

export interface MapsLocationsGETResponseAPIArgs {
  supported_states: string[];
  state_data: MapsStateLocations;
}

export interface MapsLocationsGETRequestAPIArgs {
  state: string;
}
