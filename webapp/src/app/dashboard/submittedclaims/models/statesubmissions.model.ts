import { ReviewTabArgs } from "../../../global/api/interfaces/general/review-tab.interface";
import { ReviewSubmissionModel } from "../../../global/models/review-submission";
import { ClaimStatusModel, ClaimStatusArgs } from "./claimstatus.model";
import { StateStepModel, StateStepArgs } from "./statestep.model";

export class StateSubmissionsModel {
  state: string;
  stateSubmissionId: string;
  stateSteps: StateStepModel[];
  numClaims: number;
  totalValueClaims: number;
  userFees: number;
  details: ReviewSubmissionModel;
  status: ClaimStatusModel[];

  constructor(args: StateSubmissionArgs) {
    this.state = args.state;
    this.stateSubmissionId = args.stateSubmissionId;
    this.stateSteps = args.stateSteps;
    this.numClaims = args.numClaims;
    this.totalValueClaims = args.totalValue;
    this.userFees = args.userFees;
    this.details = new ReviewSubmissionModel(args.details);
    let claimstatusmodel = [];
    for (let i = 0; i < args.status.length; i++) {
      claimstatusmodel[i] = new ClaimStatusModel(args.status[i]);
    }
    this.status = claimstatusmodel;
  }
}

export interface StateSubmissionArgs {
  state: string;
  stateSubmissionId: string;
  stateSteps: StateStepArgs[];
  numClaims: number;
  totalValue: number;
  userFees: number;
  details: ReviewTabArgs;
  status: ClaimStatusArgs[];
}
