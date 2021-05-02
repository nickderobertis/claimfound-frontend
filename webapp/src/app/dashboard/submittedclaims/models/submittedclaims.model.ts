import {
  StateSubmissionsModel,
  StateSubmissionArgs,
} from "./statesubmissions.model";

export class SubmittedClaimsModel {
  _id: number;
  date: string;
  numClaims: number;
  totalValueClaims: number;
  userFees: number;
  stateSubmissions: StateSubmissionsModel[];

  constructor(args: ClaimSubmissionArgs) {
    this._id = args._id;
    this.date = args.date;
    this.numClaims = args.numClaims;
    this.totalValueClaims = args.totalValueClaims;
    this.userFees = args.userFees;
    let statesubmissions = [];
    for (let i = 0; i < args.stateSubmissions.length; i++) {
      statesubmissions[i] = new StateSubmissionsModel(args.stateSubmissions[i]);
    }
    this.stateSubmissions = statesubmissions;
  }
}

export interface ClaimSubmissionArgs {
  _id: number;
  date: string;
  numClaims: number;
  totalValueClaims: number;
  userFees: number;
  stateSubmissions: StateSubmissionArgs[];
}
