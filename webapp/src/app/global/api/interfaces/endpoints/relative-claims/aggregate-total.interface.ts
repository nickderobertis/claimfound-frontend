export interface AggregateTotalsAPIArgs {
  deceasedTotals: AggregateClaimTotalsModelArgs;
  familyTotals: AggregateClaimTotalsModelArgs;
  hasRelatives: boolean;
  hasDeadRelatives: boolean;
  searchInProgress: boolean;
  all_deceased_questions_answered: boolean;
}

export interface AggregateClaimTotalsModelArgs {
  numberPeople: number;
  numberClaims: number;
  totalValue: number;
}
