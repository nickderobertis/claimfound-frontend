import { ReviewPayAPIArgs } from "../../../global/api/interfaces/endpoints/review/pay.interface";
import { ReviewSubmissionModel } from "../../../global/models/review-submission";

export class FinalReviewPageModel {
  formTabModels: ReviewSubmissionModel[];
  amount: number;
  userFees: number;
  statusSubmit: boolean;

  constructor(args: ReviewPayAPIArgs) {
    let formTabModels = [];
    let formIdDicts: {} = args.currentClaims;
    let index = 0;
    for (let key in formIdDicts) {
      formTabModels[index] = new ReviewSubmissionModel(formIdDicts[key]);
      index++;
    }
    this.formTabModels = formTabModels;
    this.amount = this.getClaimAmount(formTabModels);
    this.userFees = args.userFees;
    this.statusSubmit = args.statusSubmit;
  }

  // returns an amount totalled across all the claims and states
  getClaimAmount(claimsTabs: ReviewSubmissionModel[]): number {
    let total = 0;
    claimsTabs.forEach((claimsTab) => {
      total = total + claimsTab.totalValue;
    });
    return total;
  }
}
