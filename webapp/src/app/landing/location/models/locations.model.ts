import { MapsLocationsGETResponseAPIArgs } from "../interfaces/locations.interface";
import { StateStringMap } from "src/app/global/constants/statestringmap";
import { LocationConstants } from "../location.constants";

export class LandingLocationsModel {
  cities: string[] = [];
  counties: string[] = [];
  states: string[] = [];
  locationType: string;
  selectedLocation: string = "";
  state: string = "FL";

  constructor(args?: MapsLocationsGETResponseAPIArgs) {
    if (!args) {
      return;
    }

    this.cities = args.state_data.cities;
    this.counties = args.state_data.counties;
    this.states = args.supported_states;
  }

  get locations(): string[] {
    if (this.locationType === LocationConstants.locationTypes.state) {
      return this.states;
    }
    if (this.locationType === LocationConstants.locationTypes.county) {
      return this.counties;
    } else {
      return this.cities;
    }
  }

  matches(locationsModel: LandingLocationsModel): boolean {
    return (
      this.selectedLocation === locationsModel.selectedLocation &&
      this.locationType === locationsModel.locationType &&
      this.state === locationsModel.state
    );
  }

  copy(): LandingLocationsModel {
    let newModel: LandingLocationsModel = new LandingLocationsModel({
      supported_states: this.states,
      state_data: {
        cities: this.cities,
        counties: this.counties,
      },
    });
    newModel.selectedLocation = this.selectedLocation;
    newModel.locationType = this.locationType;
    newModel.state = this.state;
    return newModel;
  }
}
