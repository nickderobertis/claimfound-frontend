import { PropertySearchModelArgs } from "../../../global/api/interfaces/general/property-search.interface";

export class PropertySearchModel {
  states: string[];
  firstName: string;
  lastName: string;
  searchingFor: boolean;
  constructor(args?: PropertySearchModelArgs) {
    if (!args) {
      return;
    }
    this.states = args.states;
    this.firstName = args.first_name;
    this.lastName = args.last_name;
  }

  toRequestArgs(): PropertySearchModelArgs {
    return {
      first_name: this.firstName,
      last_name: this.lastName,
      states: this.states,
    };
  }
}
