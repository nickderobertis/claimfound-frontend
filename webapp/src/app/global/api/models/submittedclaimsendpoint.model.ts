import {
  SubmittedClaimsModel,
  ClaimSubmissionArgs,
} from "../../../dashboard/submittedclaims/models/submittedclaims.model";

export class SubmittedClaimsEndpointModel {
  submittedClaims: SubmittedClaimsModel[];
  totalProcessedClaims: number;
  totalValueProcessed: number;

  constructor(args: ReviewSubmittedAPIArgs) {
    let submittedclaims = [];
    for (let i = 0; i < args.cfClaimSubmissions.length; i++) {
      submittedclaims[i] = new SubmittedClaimsModel(args.cfClaimSubmissions[i]);
    }
    this.submittedClaims = submittedclaims;
    this.totalProcessedClaims = args.totalProcessedClaims;
    this.totalValueProcessed = args.totalValueProcessed;
  }
}

export interface ReviewSubmittedAPIArgs {
  cfClaimSubmissions: ClaimSubmissionArgs[];
  totalProcessedClaims: number;
  totalValueProcessed: number;
}
