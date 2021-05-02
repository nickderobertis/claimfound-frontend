import { AggregateClaimTotalsModelArgs } from "../api/interfaces/endpoints/relative-claims/aggregate-total.interface";

export class ClaimPersonTotalsModel {
  numberOfPeople: number = 0;
  numberOfClaims: number = 0;
  totalValue: number = 0;

  constructor(args?: AggregateClaimTotalsModelArgs) {
    if (!args) {
      return;
    }

    this.numberOfPeople = args.numberPeople;
    this.numberOfClaims = args.numberClaims;
    this.totalValue = args.totalValue;
  }

  get formattedTotalValue(): string {
    return this.totalValue.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  }
}
