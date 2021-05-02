import { ClaimTotalsModel } from "../../../global/models/claim-totals";
import {
  RelativeClaimsModel,
  RelativeClaimsQuestionsModel,
} from "./relative-claims.model";
import { RelativeClaimsTotalsAPIArgs } from "../../../global/api/interfaces/endpoints/relative-claims/totals.interface";
import { RelativeClaimsArgs } from "../../../global/api/interfaces/general/relative-claims/model.interface";
import { RelativeClaimsQuestionsArgs } from "../../../global/api/interfaces/general/relative-claims/question.interface";

export class RelativeClaimsEndpointModel {
  relativeClaims: RelativeClaimsModel[] = [];

  constructor(args: RelativeClaimsTotalsAPIArgs) {
    let claimsModels: RelativeClaimsModel[] = [];

    for (let relative of args.relatives) {
      let questionsArgs: RelativeClaimsQuestionsArgs = {
        deceased: relative.deceased,
        deceasedConfirmed: relative.deceased_confirmed,
        firstName: relative.first_name,
        lastName: relative.last_name,
        relativeId: relative._id,
        userIsHeir: relative.user_is_heir,
        relationship: relative.relationship,
      };

      let questionModel: RelativeClaimsQuestionsModel = new RelativeClaimsQuestionsModel(
        questionsArgs
      );

      let claimsModel = new ClaimTotalsModel(relative.claimInfo);

      let relativeClaimsArgs: RelativeClaimsArgs = {
        relativeId: relative._id,
        relationship: relative.relationship,
        referralToken: relative.referralToken,
        firstName: relative.first_name,
        lastName: relative.last_name,
        relativeClaimsQuestions: questionModel,
        claimTotals: claimsModel,
      };

      let relativeClaimModel = new RelativeClaimsModel(relativeClaimsArgs);

      claimsModels.push(relativeClaimModel);
    }
    this.relativeClaims = claimsModels;
  }
}
