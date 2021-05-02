import { RelativeClaimsQuestionsArgs } from "../../../global/api/interfaces/general/relative-claims/question.interface";
import { RelativeClaimsArgs } from "../../../global/api/interfaces/general/relative-claims/model.interface";
import { ClaimTotalsModel } from "../../../global/models/claim-totals";
import {
  UpdateRelativeDeceasedHeirAPIArgs,
  UserRelativeDeceasedHeirRowArgs,
  UserRelativeDeceasedHeirTableArgs,
} from "../../../global/api/interfaces/endpoints/user-details-update/relatives-deceased-heir.interface";
import { Name } from "../../../global/models/name.model";
import { NameArgs } from "../../../global/api/interfaces/general/name.interface";

export class RelativeClaimsModel {
  relativeId: number;
  name: Name;
  referralToken: string;
  relationship: string;
  relativeClaimsQuestions: RelativeClaimsQuestionsModel;
  claimTotals: ClaimTotalsModel;

  constructor(args: RelativeClaimsArgs) {
    if (!args) {
      return;
    }

    this.referralToken = args.referralToken;
    let nameArgs: NameArgs = {
      first_name: args.firstName,
      last_name: args.lastName,
    };
    this.name = new Name(nameArgs);
    this.relativeId = args.relativeId;
    this.relationship = args.relationship;
    this.claimTotals = args.claimTotals;
    this.relativeClaimsQuestions = args.relativeClaimsQuestions;
  }
}

export class RelativeClaimsQuestionsModel {
  deceased: boolean;
  deceasedConfirmed: boolean;
  userIsHeir: string;
  relativeId: number;
  firstName: string;
  lastName: string;
  relationship: string;

  constructor(args?: RelativeClaimsQuestionsArgs) {
    if (!args) {
      return;
    }

    this.deceased = args.deceased;
    this.deceasedConfirmed = args.deceasedConfirmed;
    this.userIsHeir = args.userIsHeir;
    this.relativeId = args.relativeId;
    this.firstName = args.firstName;
    this.lastName = args.lastName;
    this.relationship = args.relationship;
  }

  toAPIUpdateRequest(): UpdateRelativeDeceasedHeirAPIArgs {
    let rowUpdate: UserRelativeDeceasedHeirRowArgs = {
      deceased: this.deceased,
      deceased_confirmed: this.deceasedConfirmed,
      user_is_heir: this.userIsHeir,
      _id: this.relativeId,
      relationship: this.relationship,
    };
    let tableUpdate: UserRelativeDeceasedHeirTableArgs = {};
    tableUpdate["relatives"] = rowUpdate;
    let request: UpdateRelativeDeceasedHeirAPIArgs = { updates: tableUpdate };
    return request;
  }
}
