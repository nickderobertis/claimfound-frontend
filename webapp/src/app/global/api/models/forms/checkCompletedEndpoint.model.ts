export class CheckFormCompletedEndpointModel {
  isCompleted: boolean;
  selectedForm: number;

  constructor(args: CheckFormCompletedAPIResponseArgs) {
    this.isCompleted = args.isCompleted;
    this.selectedForm = args.selectedForm;
  }
}

export interface CheckFormCompletedAPIResponseArgs {
  isCompleted: boolean;
  selectedForm: number;
}

export interface CheckFormCompletedAPIRequestArgs {
  signerToken: string;
  selectedForm: number;
}
