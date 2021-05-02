import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";

import { ProfileService } from "../../../profile.service";
import { LoggerService } from "../../../../../global/logger.service";
import {
  ProfileEntryModel,
  ProfileEntryRowArgs,
} from "../../../entereddata/profileentry.model";
import { ProfileStepModel } from "../../../step/profilestep.model";
import { ProfilePageConstants } from "../../../profilepageconstants";
import { RadioButtonModel } from "src/app/global/components/customradiobuttons/radiobutton.model";
import { ProfileInputPageBaseComponent } from "../../profileinputpagebase.component";
import {
  ProfileRelatives,
  ProfileRelative,
} from "../../../models/profilerelatives.model";
import {
  UserDetailsPOSTRelativeArgs,
  UserDetailsGETRelativesAPIArgs,
} from "src/app/global/api/interfaces/endpoints/user-details/userdetails.interface";
import { DropDownModel } from "src/app/global/components/dropdown/dropdown.model";
import {
  RelativeRelationships,
  RelativeRelationshipModel,
} from "src/app/global/api/models/relative-relationship.model";
import { EventTrackerService } from "../../../../../global/services/event-tracker/event-tracker.service";
import { AssociatesQuestionsModel } from "../../../models/questions/associatesquestions.model";
import { CFError } from "src/app/global/error.service";
import { ErrorBarService } from "src/app/global/services/error-bar.service";
import { ErrorBarComponent } from "src/app/global/components/error-bar/error-bar.component";

declare let env: any;

/**
 * The profile page where the user can enter relatives.
 *
 * Subcomponents:
 * * [ProfileEntryComponent]{@link ProfileEntryComponent}
 *     * [ProfileEntryRowComponent]{@link ProfileEntryRowComponent}
 * * [ProfileStepComponent]{@link ProfileStepComponent}
 */
@Component({
  selector: "cf-profile-relatives-body-component",
  templateUrl: "./profilerelativesbody.component.html",
  styleUrls: [
    "../../../../../global/css/normalize.scss",
    "../../../../../global/css/webflow.scss",
    "./profilerelativesbody.component.scss",
  ],
})
export class ProfileRelativesBodyComponent extends ProfileInputPageBaseComponent
  implements OnInit {
  deceasedRadioOptions: RadioButtonModel;
  willRadioOptions: RadioButtonModel;
  dropDownModel: DropDownModel;

  deceasedRadioOptionStrings: { [key: string]: string } = {
    YES: "Yes",
    NO: "No",
  };

  willRadioOptionsStrings: { [key: string]: string } = {
    YES: "Yes",
    NO: "No",
    IDONTKNOW: "I Don't Know",
  };

  dropDownSelectionItems: string[] = [
    RelativeRelationships.grandParents,
    RelativeRelationships.parents,
    RelativeRelationships.siblings,
    RelativeRelationships.children,
    RelativeRelationships.spouse,
    RelativeRelationships.other,
  ];

  formConstants: { [key: string]: string } = {
    firstName: "firstName",
    lastName: "lastName",
    relationship: "relationship",
  };

  userDetailsTable: string = this.profileService.tableClassConstants.Relatives;

  backendErrorKeysToFrontendFormMap: { [key: string]: string } = {
    first_name: this.formConstants.firstName,
    last_name: this.formConstants.lastName,
  };

  constructor(
    protected eventTrackerService: EventTrackerService,
    protected profileService: ProfileService,
    protected errorBarService: ErrorBarService,
    protected logger: LoggerService
  ) {
    super(eventTrackerService, profileService, errorBarService, logger);
    this.inputForm.addControl(
      this.formConstants.firstName,
      new FormControl(null, [Validators.required])
    );
    this.inputForm.addControl(
      this.formConstants.lastName,
      new FormControl(null, [Validators.required])
    );
    this.inputForm.addControl(
      this.formConstants.relationship,
      new FormControl(null)
    );
  }

  ngOnInit(): void {
    this.prevNextButtonsModel = new ProfileStepModel({
      prevURL: ProfilePageConstants.pagePaths.birthdayGender,
      nextActive: true,
      nextURL: ProfilePageConstants.pagePaths.relativesQuestions,
    });

    this.profileEntryModel = new ProfileEntryModel({ rows: [] });

    this.deceasedRadioOptions = new RadioButtonModel(
      [this.deceasedRadioOptionStrings.YES, this.deceasedRadioOptionStrings.NO],
      this.deceasedRadioOptionStrings.NO
    );

    this.willRadioOptions = new RadioButtonModel(
      [
        this.willRadioOptionsStrings.YES,
        this.willRadioOptionsStrings.NO,
        this.willRadioOptionsStrings.IDONTKNOW,
      ],
      this.willRadioOptionsStrings.IDONTKNOW
    );

    this.dropDownModel = new DropDownModel(
      this.dropDownSelectionItems,
      "Choose Person"
    );

    this.profileService.getAssociatesQuestions(1, []).subscribe(
      (result: AssociatesQuestionsModel) => {
        if (result.associates.length == 0) {
          this.prevNextButtonsModel.nextURL =
            ProfilePageConstants.pagePaths.phones;
        }
      },
      (error: CFError) =>
        this.logger.error(
          "Could not get associate questions from relatives page.",
          error.toString()
        )
    );

    super.ngOnInit();
  }

  onGetDataSuccess(result: UserDetailsGETRelativesAPIArgs): void {
    let data = new ProfileRelatives(result);
    this.convertDataModelToDisplayModel(data.relatives);
    this.loading = false;
  }

  onSaveButtonClick(): void {
    this.inputForm.controls[this.formConstants.relationship].setErrors(null);
    super.onSaveButtonClick();
    if (this.inputForm.invalid) {
      this.showError = true;
      return;
    }

    if (!this.dropDownModel.hasSelection()) {
      let error = {};
      error[ErrorBarComponent.ERROR_BAR_ERROR_TYPES.MESSAGE] =
        "Please select a relationship.";
      this.inputForm.controls[this.formConstants.relationship].setErrors(error);
      this.showError = true;
      return;
    }

    let userIsHeirVal = "True";
    if (
      this.willRadioOptions.selectedOption === this.willRadioOptionsStrings.NO
    ) {
      userIsHeirVal = "False";
    } else if (
      this.willRadioOptions.selectedOption ===
      this.willRadioOptionsStrings.IDONTKNOW
    ) {
      userIsHeirVal = "notanswered";
    }

    // Since multi select is disable we can assume only one selected item.
    let relativeModel: RelativeRelationshipModel = RelativeRelationshipModel.fromDisplayName(
      this.dropDownModel.getSingleSelection()
    );

    let newRelative: UserDetailsPOSTRelativeArgs = {
      first_name: this.inputForm.controls[this.formConstants.firstName].value,
      last_name: this.inputForm.controls[this.formConstants.lastName].value,
      deceased:
        this.deceasedRadioOptions.selectedOption ===
        this.deceasedRadioOptionStrings.YES,
      user_is_heir: userIsHeirVal,
      relationship: relativeModel.backendKey,
    };

    this.addUserDetails(newRelative);
    if (env.CF_ANALYTICS_FE) {
      this.eventTrackerService.triggerEvent("addRelative", newRelative);
    }
  }

  closeInput(): void {
    super.closeInput();
    this.deceasedRadioOptions.selectedOption = this.deceasedRadioOptionStrings.NO;
    this.willRadioOptions.selectedOption = this.willRadioOptionsStrings.IDONTKNOW;
    this.dropDownModel.selectedItems.clear();
  }

  convertDataModelToDisplayModel(relatives: ProfileRelative[]): void {
    let profileEntryModel = ProfileEntryModel.fromProfileRelativesArr(
      relatives
    );
    this.profileEntryModel = profileEntryModel;
  }
}
