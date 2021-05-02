import { StateNameSearchArgs } from "src/app/global/api/interfaces/general/name-check.interface";

export class StateWiseSplit {
  state: string;
  stateNumberOfClaims: number;
  stateTotalValue: number;
  stateAverage: number;

  constructor(args?: StateNameSearchArgs) {
    if (!args) {
      return;
    }
    this.state = args.state;
    this.stateNumberOfClaims = args.number;
    this.stateTotalValue = args.value;
    this.stateAverage = this.getAverage(args.number, args.value);
  }

  getAverage(numberofClaims: number, totalValue: number): number {
    if (numberofClaims > 0) {
      return totalValue / numberofClaims;
    }

    return 0;
  }

  static arrayFromArgsArray(args: StateNameSearchArgs[]): StateWiseSplit[] {
    let models: StateWiseSplit[] = [];
    for (let arg of args) {
      let model = new StateWiseSplit(arg);
      models.push(model);
    }
    return models;
  }
}
