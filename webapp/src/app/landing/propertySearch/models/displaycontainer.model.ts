import { SearchWrapperModel } from "./search-wrapper.model";
import { StateWiseSplit } from "./state-wise-split.model";

export class DisplayContainerModel {
  stateListSupported: StateWiseSplit[];
  referralToken: string;
  searchingForSelf: boolean;
  stateListUnsupported: string[];
  firstName: string;
  lastName: string;
  numberOfClaims: number;
  loading: boolean = true;

  constructor(args?: SearchWrapperModel) {
    if (args !== undefined) {
      this.stateListSupported = args.nameCheckRes.stateListSupported;
      this.stateListUnsupported = args.nameCheckRes.stateListUnsupported;
      this.firstName = args.searchModel.firstName;
      this.lastName = args.searchModel.lastName;
      this.referralToken = args.nameCheckRes.referralToken;
      this.searchingForSelf = args.nameCheckRes.searchingForSelf;
      this.loading = false;
      this.numberOfClaims = args.nameCheckRes.numberOfClaims;
    }
  }

  get formattedUnsupportedStates(): string[] {
    const beforeLast = this.stateListUnsupported.slice(0, -1);
    const last = this.stateListUnsupported.slice(-1);
    const formattedBeforeLast = beforeLast.map((x) => x + ", ");
    const formatted = formattedBeforeLast.concat(last);
    return formatted;
  }
}
