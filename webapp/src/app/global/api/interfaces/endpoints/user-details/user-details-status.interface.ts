export interface UserDetailsStatusAPIArgs {
  data_types: UserDetailsStatusArgs;
  user_can_upload_docs: boolean;
}

export interface UserDetailsStatusArgs {
  birth_day: UserDetailsSummaryArgs;
  gender: UserDetailsSummaryArgs;
  name: UserDetailsSummaryArgs;
  address: UserDetailsSummaryArgs;
  relative: UserDetailsSummaryArgs;
  phone: UserDetailsSummaryArgs;
  relative_questions: UserDetailsHasViewedArgs;
  phone_questions: UserDetailsHasViewedArgs;
  address_questions: UserDetailsHasViewedArgs;
}

export interface UserDetailsSummaryArgs {
  user_has_viewed: boolean;
  has_primary: boolean;
  count: number;
}

export interface UserDetailsHasViewedArgs {
  user_has_viewed: boolean;
}
