import { Name } from "../../../global/models/name.model";
import { ClaimTotalsModel } from "../../../global/models/claim-totals";
import { ReferralLandingAPIArgs } from "../../../global/api/interfaces/endpoints/referral/referral-landing.interface";
import { NameArgs } from "../../../global/api/interfaces/general/name.interface";

export class ReferralLandingModel {
  name: Name;
  claimTotals: ClaimTotalsModel;

  constructor(args: ReferralLandingAPIArgs) {
    this.claimTotals = new ClaimTotalsModel(args.claimInfo);
    let nameArgs: NameArgs = {
      first_name: args.firstName,
      last_name: args.lastName,
    };
    this.name = new Name(nameArgs);
  }
}
