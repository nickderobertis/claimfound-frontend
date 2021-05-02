import { ClaimTotalsArgs } from "../api/interfaces/general/relative-claims/totals.interface";

export class ClaimTotalsModel {
  numberOfClaims: number;
  totalValue: number;
  averageValue: number;

  constructor(args?: ClaimTotalsArgs) {
    if (!args) {
      return;
    }

    this.numberOfClaims = args.number;
    this.averageValue = args.averageValue;
    this.totalValue = args.totalValue;
  }

  get formattedTotalValue(): string {
    return this.totalValue.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  }

  get formattedAverageValue(): string {
    return this.averageValue.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  }
}
