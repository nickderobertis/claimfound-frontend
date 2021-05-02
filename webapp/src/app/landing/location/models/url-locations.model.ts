import { URLLocationArgs } from "../interfaces/url-locations.interface";
import { StateStringMap } from "src/app/global/constants/statestringmap";
import { toTitleCase } from "src/app/global/utils/strings/title-case";
import { LocationConstants } from "../location.constants";

/**
 * Manages conversions between URL and locations for map landing page
 */
export class URLLocationsModel implements URLLocationArgs {
  state: string;
  urlLocation: string;

  constructor(args?: URLLocationArgs) {
    if (!args) {
      return;
    }
    this.state = args.state;
    if (args.urlLocation) {
      this.urlLocation = args.urlLocation;
    }
  }

  get locationType(): string {
    if (
      !this.urlLocation || // e.g. /map/fl
      // e.g. /map/fl/florida-unclaimed-money
      URLLocationsModel.urlIsForState(this.urlLocation, this.state)
    ) {
      return LocationConstants.locationTypes.state;
    }

    if (this.urlLocation.search("county") === -1) {
      return LocationConstants.locationTypes.city;
    }

    return LocationConstants.locationTypes.county;
  }

  get url(): string {
    return URLLocationsModel.urlFromLocation(
      this.location,
      this.locationType,
      this.state
    );
  }

  static urlFromLocation(
    location: string,
    locationType: string,
    state: string
  ): string {
    let nextLocation: string;
    if (location.split(" ").length > 1) {
      location = location.replace(/ /g, "-");
    }
    if (locationType === LocationConstants.locationTypes.county) {
      nextLocation = location.toLowerCase() + "-county";
    } else {
      nextLocation = location.toLowerCase();
    }

    let url = "map/" + state + "/" + nextLocation + "-unclaimed-money";
    return url;
  }

  static urlIsForState(locationUrl: string, state: string): boolean {
    const location = getUntilWord(locationUrl, "unclaimed");
    if (!StateStringMap.isValidStateName(location)) {
      return false;
    }
    const fullStateName = StateStringMap.fullNameFromStateCode(state);
    const locationTitle = toTitleCase(location);
    return locationTitle === fullStateName;
  }

  get location(): string {
    if (this.locationType === LocationConstants.locationTypes.state) {
      return StateStringMap.fullNameFromStateCode(this.state);
    }

    if (this.locationType === LocationConstants.locationTypes.county) {
      return getUntilWord(this.urlLocation, "county");
    } else {
      return getUntilWord(this.urlLocation, "unclaimed");
    }
  }

  get titleCaseLocation(): string {
    return toTitleCase(this.location);
  }
}

function getAllIndicies(word: string, toSearch: string): number[] {
  let indices = [];
  for (
    let pos = word.indexOf(toSearch);
    pos !== -1;
    pos = word.indexOf(toSearch, pos + 1)
  ) {
    indices.push(pos);
  }
  return indices;
}

function getUntilWord(orig: string, word: string): string {
  let index = getAllIndicies(orig, word)[0] - 1;
  let substring = orig.slice(0, index);
  return substring;
}
