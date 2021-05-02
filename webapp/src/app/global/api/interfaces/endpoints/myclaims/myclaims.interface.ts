import { ClaimArgs, ClaimArgsObj } from "../../general/claim.interface";

export interface MyClaimsAPIArgs {
  claims_info: MyClaimsTotalsArgs;
  details: ClaimArgsObj;
}

export interface MyClaimsTotalsArgs {
  claims_amount: number;
  claims_avg_amount: number;
  claims_count: number;
}
