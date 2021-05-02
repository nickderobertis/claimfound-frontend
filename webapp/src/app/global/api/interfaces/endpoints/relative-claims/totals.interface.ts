import { ClaimTotalsArgs } from "../../general/relative-claims/totals.interface";

export interface RelativeClaimsTotalsAPIArgs {
  relatives: RelativeClaimsTotalsArgs[];
}

export interface RelativeClaimsTotalsArgs {
  _id: number;
  claimInfo: ClaimTotalsArgs;
  deceased: boolean;
  deceased_confirmed: boolean;
  first_name: string;
  last_name: string;
  referralToken: string;
  relationship: string;
  user_is_heir: string;
}
