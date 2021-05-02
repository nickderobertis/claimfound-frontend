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
  ProfileBirthdayGenders,
  ProfileBirthdayGender,
} from "../../../models/profilebirthdaygender.model";
import {
  UserDetailsPOSTBirthdayGenderArgs,
  UserDetailsGetBirthdayGenderAPIArgs,
} from "src/app/global/api/interfaces/endpoints/user-details/userdetails.interface";
import { EventTrackerService } from "src/app/global/services/event-tracker/event-tracker.service";
import { CFError } from "src/app/global/error.service";
import { ErrorBarService } from "src/app/global/services/error-bar.service";
import { ErrorBarComponent } from "src/app/global/components/error-bar/error-bar.component";

/**
 * The profile page where the user can enter birthday and gender information.
 *
 * Subcomponents:
 * * [ProfileEntryComponent]{@link ProfileEntryComponent}
 *     * [ProfileEntryRowComponent]{@link ProfileEntryRowComponent}
 * * [ProfileStepComponent]{@link ProfileStepComponent}
 */
@Component({
  selector: "cf-profile-birthday-gender-body-component",
  templateUrl: "./profilebirthdaygenderbody.component.html",
  styleUrls: [
    "../../../../../global/css/normalize.scss",
    "../../../../../global/css/webflow.scss",
    "./profilebirthdaygenderbody.component.scss",
  ],
})
export class ProfileBirthdayGenderBodyComponent
  extends ProfileInputPageBaseComponent
  implements OnInit {
  radioOptions: RadioButtonModel;

  radioOptionStrings: { [key: string]: string } = {
    MALE: "Male",
    FEMALE: "Female",
    OTHER: "Other",
  };

  formConstants: { [key: string]: string } = {
    month: "Month",
    day: "Day",
    year: "Year",
    dateRange: "Birth day",
    gender: "Gender",
  };

  userDetailsTable: string = this.profileService.tableClassConstants
    .BirthdayGender;

  backendErrorKeysToFrontendFormMap: { [key: string]: string } = {
    month: this.formConstants.month,
    day: this.formConstants.day,
    year: this.formConstants.year,
  };

  constructor(
    protected eventTrackerService: EventTrackerService,
    protected profileService: ProfileService,
    protected errorBarService: ErrorBarService,
    protected logger: LoggerService
  ) {
    super(eventTrackerService, profileService, errorBarService, logger);
    this.inputForm.addControl(
      this.formConstants.month,
      new FormControl(null, [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.min(1),
        Validators.max(12),
      ])
    );
    this.inputForm.addControl(
      this.formConstants.day,
      new FormControl(null, [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.min(1),
        Validators.max(31),
      ])
    );
    this.inputForm.addControl(
      this.formConstants.year,
      new FormControl(null, [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.min(1000),
        Validators.max(9999),
      ])
    );
    this.inputForm.addControl(
      this.formConstants.dateRange,
      new FormControl(null)
    );
    this.inputForm.addControl(this.formConstants.gender, new FormControl(null));
  }

  ngOnInit(): void {
    this.prevNextButtonsModel = new ProfileStepModel({
      prevURL: ProfilePageConstants.pagePaths.names,
      nextURL: ProfilePageConstants.pagePaths.relatives,
    });

    this.profileEntryModel = new ProfileEntryModel({ rows: [] });

    this.radioOptions = new RadioButtonModel(
      [
        this.radioOptionStrings.MALE,
        this.radioOptionStrings.FEMALE,
        this.radioOptionStrings.OTHER,
      ],
      null
    );

    super.ngOnInit();
  }

  onGetDataSuccess(result: UserDetailsGetBirthdayGenderAPIArgs): void {
    let data = new ProfileBirthdayGenders(result);
    if (data.birthdayGenders.length > 0) {
      this.convertDataModelToDisplayModel(data.birthdayGenders);
    } else {
      this.showInput = true;
    }
    this.loading = false;
    this.refreshNextButton();
  }

  onSaveButtonClick(): void {
    super.onSaveButtonClick();

    this.inputForm.controls[this.formConstants.gender].setErrors(null);
    this.inputForm.controls[this.formConstants.dateRange].setErrors(null);
    if (this.inputForm.invalid) {
      this.showError = true;
      return;
    }

    if (this.radioOptions.selectedOption == null) {
      let error = {};
      error[ErrorBarComponent.ERROR_BAR_ERROR_TYPES.NOSELECTION] = true;
      this.inputForm.controls[this.formConstants.gender].setErrors(error);
      this.showError = true;
      return;
    }

    let birthdayString =
      this.inputForm.controls[this.formConstants.month].value +
      "/" +
      this.inputForm.controls[this.formConstants.day].value +
      "/" +
      this.inputForm.controls[this.formConstants.year].value;
    let newData: UserDetailsPOSTBirthdayGenderArgs = {
      birth_day: birthdayString,
      gender: this.radioOptions.selectedOption.toLowerCase(),
    };

    this.addUserDetails(newData);
  }

  closeInput() {
    super.closeInput();
    this.radioOptions.selectedOption = null;
  }

  refreshNextButton(): void {
    this.prevNextButtonsModel.nextActive =
      this.profileEntryModel.rows.length > 0;
  }

  convertDataModelToDisplayModel(bdayGenders: ProfileBirthdayGender[]): void {
    let profileEntryModel = ProfileEntryModel.fromBirthdayGenderArr(
      bdayGenders
    );
    this.profileEntryModel = profileEntryModel;
  }

  onAddDetailsError(error: CFError): void {
    if (error.name === "userInfoForm") {
      if (error.data.fields_errors["birth_day"]) {
        let error = {};
        error[ErrorBarComponent.ERROR_BAR_ERROR_TYPES.MESSAGE] =
          "Birthday is outside of valid range.";
        this.inputForm.controls[this.formConstants.dateRange].setErrors(error);
      }
    }
    super.onAddDetailsError(error);
  }

  get openInputButtonText(): string {
    if (this.profileEntryModel.rows.length > 0) {
      return "Edit";
    }
    return "Add";
  }
}
