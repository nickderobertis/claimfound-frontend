export interface StateNameSearchArgs {
  state: string;
  number: number;
  value: number;
}

export interface NameCheckApiArgs {
  stateWiseSplit: StateNameSearchArgs[];
  number: number;
  totalValue: number;
  referralToken: string;
}
