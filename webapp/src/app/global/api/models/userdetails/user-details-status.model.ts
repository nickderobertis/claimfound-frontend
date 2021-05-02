import {
  UserDetailsStatusAPIArgs,
  UserDetailsSummaryArgs,
} from "../../interfaces/endpoints/user-details/user-details-status.interface";
export class UserDetailsSummary {
  userHasViewed: boolean;
  hasPrimary: boolean;
  count: number;

  constructor(args: UserDetailsSummaryArgs) {
    this.userHasViewed = args.user_has_viewed;
    this.hasPrimary = args.has_primary;
    this.count = args.count;
  }
}

export class UserDetailsStatusModel {
  canUploadDocs: boolean;
  birthDay: UserDetailsSummary;
  gender: UserDetailsSummary;
  name: UserDetailsSummary;
  address: UserDetailsSummary;
  relative: UserDetailsSummary;
  phone: UserDetailsSummary;
  hasViewedRelativeQuestions: boolean;
  hasViewedPhoneQuestions: boolean;
  hasViewedAddressQuestions: boolean;

  constructor(args: UserDetailsStatusAPIArgs) {
    this.canUploadDocs = args.user_can_upload_docs;
    this.birthDay = new UserDetailsSummary(args.data_types.birth_day);
    this.gender = new UserDetailsSummary(args.data_types.gender);
    this.name = new UserDetailsSummary(args.data_types.name);
    this.address = new UserDetailsSummary(args.data_types.address);
    this.relative = new UserDetailsSummary(args.data_types.relative);
    this.phone = new UserDetailsSummary(args.data_types.phone);
    this.hasViewedRelativeQuestions =
      args.data_types.relative_questions.user_has_viewed;
    this.hasViewedPhoneQuestions =
      args.data_types.phone_questions.user_has_viewed;
    this.hasViewedAddressQuestions =
      args.data_types.address_questions.user_has_viewed;
  }
}
