import { NameArrayArgs } from "./name.interface";
import { AddressArrayArgs } from "./address.interface";

export interface ClaimArgs {
  state_claim_people: StateClaimPeopleArgs;
  all_claims: AllClaimsArgs;
  state_claims: StateClaimsArgs;
  user_claims: UserClaimsArgs;
}

export interface ClaimArgsObj {
  [index: string]: ClaimArgs;
}

export interface AllClaimsArgs {
  claim_id: string;
  state: string;
  status: string;
  status_in_progress: boolean;
}

export interface StateClaimPeopleArgs extends NameArrayArgs, AddressArrayArgs {}

export interface StateClaimsArgs {
  amount: number;
  property_type: string;
  reporting_company: string;
}

export interface ClaimStepArgs {
  [step: string]: ClaimStepsEntryArgs;
}

export interface ClaimStepsEntryArgs {
  claim_id: StringStringDictArgs;
  score: StringNumberDictArgs;
  state: StringStringDictArgs;
  step: StringStringDictArgs;
}

export interface StringStringDictArgs {
  [key: string]: string;
}

export interface StringNumberDictArgs {
  [key: string]: number;
}

export interface UserClaimsArgs {
  state: string;
  step: string;
  score: number;
  claim_id: string;
}
