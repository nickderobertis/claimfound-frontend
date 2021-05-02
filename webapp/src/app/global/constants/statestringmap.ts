import { invert } from "../utils/objects/invert";
import { toTitleCase } from "../utils/strings/title-case";

/**
 * A class which enables converting state codes or claim IDs to full state names.
 */
export class StateStringMap {
  // TODO: add other states
  static prefixToFullStateStringObj: { [prefix: string]: string } = {
    fl: "Florida",
    wy: "Wyoming",
  };

  static fullStateStringToPrefixObj: { [stateName: string]: string } = invert(
    StateStringMap.prefixToFullStateStringObj
  );

  static getStateStringFromClaimId(claimId: string): string {
    let prefix = claimId.substr(0, 2);
    return this.prefixToFullStateStringObj[prefix.toLowerCase()];
  }

  static fullNameFromStateCode(state: string): string {
    return StateStringMap.prefixToFullStateStringObj[state.toLowerCase()];
  }

  static stateCodeFromFullName(state: string): string {
    let stateCode: string =
      StateStringMap.fullStateStringToPrefixObj[toTitleCase(state)];
    return stateCode.toUpperCase();
  }

  static isValidStateName(state: string): boolean {
    return toTitleCase(state) in StateStringMap.fullStateStringToPrefixObj;
  }

  static isValidStateCode(state: string): boolean {
    return state.toLowerCase() in StateStringMap.prefixToFullStateStringObj;
  }
}
