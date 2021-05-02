export class StateStepModel {
  step: string;
  helpText: string;

  constructor(args: StateStepArgs) {
    this.step = args.step;
    this.helpText = args.helpText;
  }
}

export interface StateStepArgs {
  step: string;
  helpText: string;
}
