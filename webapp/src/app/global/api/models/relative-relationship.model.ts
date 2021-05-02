import { invert } from "../../utils/objects/invert";

export enum RelativeRelationships {
  grandParents = "Grandparents",
  parents = "Parents",
  siblings = "Siblings",
  children = "Children",
  spouse = "Spouse / Partner",
  other = "Other",
}

let backendKeyToDisplayNameObj: { [key: string]: string } = {
  grandparents: RelativeRelationships.grandParents,
  siblings: RelativeRelationships.siblings,
  children: RelativeRelationships.children,
  parents: RelativeRelationships.parents,
  "spouse/partner": RelativeRelationships.spouse,
  other: RelativeRelationships.other,
};

let displayNameToBackendKeyObj: { [key: string]: string } = invert(
  backendKeyToDisplayNameObj
);

export interface RelativeRelationshipArgs {
  displayName: string;
  backendKey: string;
}

export class RelativeRelationshipModel implements RelativeRelationshipArgs {
  displayName: string;
  backendKey: string;

  constructor(args: RelativeRelationshipArgs) {
    this.displayName = args.displayName;
    this.backendKey = args.backendKey;
  }

  static fromDisplayName(name: string): RelativeRelationshipModel {
    let backendKey: string = displayNameToBackendKeyObj[name];
    return new RelativeRelationshipModel({
      displayName: name,
      backendKey: backendKey,
    });
  }

  static fromBackendKey(key: string): RelativeRelationshipModel {
    let displayName: string = backendKeyToDisplayNameObj[key];
    return new RelativeRelationshipModel({
      displayName: displayName,
      backendKey: key,
    });
  }
}
