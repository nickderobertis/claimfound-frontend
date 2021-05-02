export interface LocationTypes {
  county: string;
  city: string;
  state: string;
}

export class LocationConstants {
  static locationTypes: LocationTypes = {
    county: "County of",
    city: "City of",
    state: "State of",
  };
  static locationTypesArr: string[] = ["County of", "City of", "State of"];
}
