import { NameArgs } from "./name.interface";

export interface ReferralArgs {
  referral_token: string;
}

export interface UserSignUpFieldArgs extends NameArgs {
  email?: string;
  password?: string;
}

export interface UserSignUpPOSTRequestArgs extends UserSignUpFieldArgs {
  additional_info?: ReferralArgs;
}

export interface SignUpFieldsErrorsArgs {
  fields_errors: UserSignUpFieldArgs;
}
