import { RelativeClaimsQuestionsModel } from "../../../../../dashboard/relativeclaims/models/relative-claims.model";
import { ClaimTotalsModel } from "../../../../models/claim-totals";

export interface RelativeClaimsArgs {
  relativeId: number;
  firstName: string;
  lastName: string;
  referralToken: string;
  relationship: string;
  relativeClaimsQuestions: RelativeClaimsQuestionsModel;
  claimTotals: ClaimTotalsModel;
}
