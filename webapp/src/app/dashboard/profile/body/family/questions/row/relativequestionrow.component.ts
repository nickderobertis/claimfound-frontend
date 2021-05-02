import { Component, OnInit, Input } from "@angular/core";

import { DropDownModel } from "src/app/global/components/dropdown/dropdown.model";
import { AssociateQuestionRowModel } from "src/app/dashboard/profile/models/questions/associatesquestions.model";

/**
 * A single question row for family/associate follow-up questions.
 *
 * Subcomponents:
 * [RelativeQuestionsDropdownComponent]{@link RelativeQuestionsDropdownComponent}
 */
@Component({
  selector: "cf-profile-relatives-questions-row-component",
  templateUrl: "./relativequestionrow.component.html",
  styleUrls: [
    "../../../../../../global/css/normalize.scss",
    "../../../../../../global/css/webflow.scss",
    "./relativequestionrow.component.scss",
  ],
})
export class ProfileRelativesQuestionsRowComponent implements OnInit {
  @Input() model: AssociateQuestionRowModel;
  @Input() categories: string[];

  dropDownModel: DropDownModel;

  onSmallScreen: boolean = false;

  ngOnInit() {
    if (window.innerWidth <= 479) {
      this.onSmallScreen = true;
    }
    let allOptions = this.categories.concat(["none"]);
    this.dropDownModel = new DropDownModel(allOptions, "none");
  }

  onDropDownSelectionChange(selection: string[]) {
    this.model.category = this.dropDownModel.getSingleSelection();
    if (
      this.model.category === "this is my name" ||
      this.model.category === "none" ||
      this.model.category === ""
    ) {
      this.model.deceased = false;
      this.model.isHeirCheckbox = false;
      this.model.isHeirAnswered = false;
      this.model.deceasedConfirmed = false;
    }
  }

  get checkBoxesActive(): boolean {
    if (
      this.model.category === "this is my name" ||
      this.model.category === "none" ||
      this.model.category === ""
    ) {
      return false;
    } else {
      return true;
    }
  }
}
