import { SupportedStatesModel } from "../models/supported-states.model";
import { PropertySearchModel } from "../models/property-search.model";
import { DropDownModel } from "src/app/global/components/dropdown/dropdown.model";
import { NameCheckModel } from "./name-check.model";

export class SearchWrapperModel {
  model: SupportedStatesModel;
  searchModel: PropertySearchModel = new PropertySearchModel();
  searchingForDropDownModel: DropDownModel;
  stateDropDownModel: DropDownModel;
  nameCheckRes: NameCheckModel;
  placeHolders: string[] = ["First Name", "Last Name"];
  errorMessage: string;
  editable: boolean[] = [true, true];

  intializeDropDownModels() {
    this.searchingForDropDownModel = new DropDownModel(
      ["Myself", "Family", "Friends", "Coworkers"],
      "Searching For?",
      false
    );
    this.stateDropDownModel = new DropDownModel(
      this.model.allStates,
      "States",
      true,
      true
    );
  }

  populateSupportedStates(result: SupportedStatesModel) {
    this.model = result;
    this.intializeDropDownModels();
  }

  initializeNameCheckModel(result: NameCheckModel) {
    this.nameCheckRes = result;
    result.searchingForSelf = this.searchModel.searchingFor;
    this.nameCheckRes.createStateObj(
      this.model.supportedStates,
      this.model.statCodeToState,
      this.searchModel.states
    );
  }
}
