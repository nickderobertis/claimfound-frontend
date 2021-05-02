import { SupportedStatesModelsArgs } from "../../../global/api/interfaces/general/supported-states.interface";

export class SupportedStatesModel {
  allStates: string[];
  supportedStates: string[];
  statCodeToState: { [stateCode: string]: string } = {};

  constructor(args: SupportedStatesModelsArgs) {
    this.allStates = args.allStates;
    this.supportedStates = args.supportedStates;
    this.statCodeToState = args.state_code_to_state;
  }
}
