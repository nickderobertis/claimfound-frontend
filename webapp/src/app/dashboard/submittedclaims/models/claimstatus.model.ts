export class ClaimStatusModel {
  claimId: string;
  currentStepIndex: number;
  stepDates: string[];

  constructor(args: ClaimStatusArgs) {
    this.claimId = args.claimId;
    this.currentStepIndex = args.currentStepIndex;
    this.stepDates = args.stepDates;
  }
}

export interface ClaimStatusArgs {
  claimId: string;
  currentStepIndex: number;
  stepDates: string[];
}
