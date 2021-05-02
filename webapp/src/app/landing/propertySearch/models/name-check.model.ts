import {
  NameCheckApiArgs,
  StateNameSearchArgs,
} from "../../../global/api/interfaces/general/name-check.interface";
import { StateWiseSplit } from "./state-wise-split.model";

export class NameCheckModel {
  numberOfClaims: number;
  totalValue: number;
  referralToken: string;
  stateListUnsupported: string[] = [];
  stateListSupported: StateWiseSplit[];
  searchingForSelf: boolean = true;
  allStateResults: StateWiseSplit[];

  constructor(args: NameCheckApiArgs) {
    // assigning values of backend to our models

    this.numberOfClaims = args.number;
    this.totalValue = args.totalValue;
    this.referralToken = args.referralToken;
    this.stateListSupported = StateWiseSplit.arrayFromArgsArray(
      args.stateWiseSplit
    );
  }

  createStateObj(
    supportedStates: string[],
    stateCodeToState: { [stateCode: string]: string },
    searchingStates: string[]
  ) {
    for (let stateCode of searchingStates) {
      if (!supportedStates.includes(stateCode)) {
        let stateName = stateCodeToState[stateCode];
        this.stateListUnsupported.push(stateName);
      }
    }
  }
}
