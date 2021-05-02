import { ReviewTabArgs } from "../../general/review-tab.interface";

export interface ReviewTabUnderFormIDArgs {
  [formId: string]: ReviewTabArgs;
}

export interface ReviewPayAPIArgs {
  currentClaims: ReviewTabUnderFormIDArgs;
  userFees: number;
  statusSubmit: boolean;
}
