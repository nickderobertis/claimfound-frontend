import { Component, OnInit } from "@angular/core";
import { FormControl, Validators, AbstractControl } from "@angular/forms";

import { ProfileService } from "../../../profile.service";
import { LoggerService } from "../../../../../global/logger.service";
import { ProfileEntryModel } from "../../../entereddata/profileentry.model";
import { ProfileStepModel } from "../../../step/profilestep.model";
import { ProfilePageConstants } from "../../../profilepageconstants";
import { RadioButtonModel } from "src/app/global/components/customradiobuttons/radiobutton.model";
import { ProfileInputPageBaseComponent } from "../../profileinputpagebase.component";
import {
  ProfilePhones,
  ProfilePhone,
} from "../../../models/profilephones.model";
import {
  UserDetailsPOSTPhoneArgs,
  UserDetailsGETPhonesAPIArgs,
} from "src/app/global/api/interfaces/endpoints/user-details/userdetails.interface";
import { EventTrackerService } from "../../../../../global/services/event-tracker/event-tracker.service";
import { CFError } from "src/app/global/error.service";
import { ProfileQuestionsModel } from "../../../models/questions/questions.model";
import { ErrorBarService } from "src/app/global/services/error-bar.service";

declare let env: any;

/**
 * The profile page where the user can enter phone numbers.
 *
 * Subcomponents:
 * * [ProfileEntryComponent]{@link ProfileEntryComponent}
 *     * [ProfileEntryRowComponent]{@link ProfileEntryRowComponent}
 * * [ProfileStepComponent]{@link ProfileStepComponent}
 */
@Component({
  selector: "cf-profile-phones-body-component",
  templateUrl: "./profilephonesbody.component.html",
  styleUrls: [
    "../../../../../global/css/normalize.scss",
    "../../../../../global/css/webflow.scss",
    "./profilephonesbody.component.scss",
  ],
})
export class ProfilePhonesBodyComponent extends ProfileInputPageBaseComponent
  implements OnInit {
  primaryRadioOptions: RadioButtonModel;
  currentRadioOptions: RadioButtonModel;
  primary: boolean;
  primaryRadioOptionStrings: { [key: string]: string } = {
    YES: "Yes",
    NO: "No",
  };

  currentRadioOptionStrings: { [key: string]: string } = {
    YES: "Yes",
    NO: "No",
  };

  formConstants: { [key: string]: string } = {
    phone: "phone",
  };

  userDetailsTable: string = this.profileService.tableClassConstants.Phones;

  backendErrorKeysToFrontendFormMap: { [key: string]: string } = {
    phone: this.formConstants.phone,
  };

  constructor(
    protected eventTrackerService: EventTrackerService,
    protected profileService: ProfileService,
    protected errorBarService: ErrorBarService,
    protected logger: LoggerService
  ) {
    super(eventTrackerService, profileService, errorBarService, logger);
    //changed null to "" because it is being passed to the directive for the mask and null was causing an issue
    this.inputForm.addControl(
      this.formConstants.phone,
      new FormControl("", [Validators.required])
    );
  }

  ngOnInit(): void {
    this.prevNextButtonsModel = new ProfileStepModel({
      prevURL: ProfilePageConstants.pagePaths.relativesQuestions,
      nextURL: ProfilePageConstants.pagePaths.phonesQuestions,
    });

    this.profileEntryModel = new ProfileEntryModel({ rows: [] });

    this.primaryRadioOptions = new RadioButtonModel(
      [this.primaryRadioOptionStrings.YES, this.primaryRadioOptionStrings.NO],
      this.primaryRadioOptionStrings.YES
    );

    this.currentRadioOptions = new RadioButtonModel(
      [this.currentRadioOptionStrings.YES, this.currentRadioOptionStrings.NO],
      this.currentRadioOptionStrings.YES
    );

    this.profileService.getPhonesQuestions(1).subscribe(
      (result: ProfileQuestionsModel) => {
        if (result.questions.length == 0) {
          this.prevNextButtonsModel.nextURL =
            ProfilePageConstants.pagePaths.addresses;
        }
      },
      (error: CFError) =>
        this.logger.error(
          "Could not get associate questions from phones page.",
          error.toString()
        )
    );

    super.ngOnInit();
  }

  onGetDataSuccess(result: UserDetailsGETPhonesAPIArgs): void {
    let data = new ProfilePhones(result);
    this.convertDataModelToDisplayModel(data.phones);
    this.setIsPrimaryDefault();
    this.loading = false;
    this.refreshNextButton();
  }

  onSaveButtonClick(): void {
    super.onSaveButtonClick();
    //checks length of the phone by dropping () and  - in the inputted value and set error is length is less than valid length
    this.validatePhoneLength(this.inputForm.controls["phone"]);
    if (this.inputForm.invalid) {
      this.showError = true;
      return;
    }

    let newPhone: UserDetailsPOSTPhoneArgs = {
      current:
        this.currentRadioOptions.selectedOption ===
        this.currentRadioOptionStrings.YES,
      phone: "+" + this.inputForm.controls[this.formConstants.phone].value,
      is_primary:
        this.primaryRadioOptions.selectedOption ===
        this.primaryRadioOptionStrings.YES,
    };

    this.addUserDetails(newPhone);
    if (env.CF_ANALYTICS_FE) {
      this.eventTrackerService.triggerEvent("updatePhone", newPhone);
    }
  }

  closeInput(): void {
    super.closeInput();
    this.setIsPrimaryDefault();
    this.currentRadioOptions.selectedOption = this.currentRadioOptionStrings.YES;
  }

  refreshNextButton(): void {
    for (let index = 0; index < this.profileEntryModel.rows.length; index++) {
      if (this.profileEntryModel.rows[index].primary) {
        this.prevNextButtonsModel.nextActive = true;
        return;
      }
    }
  }

  convertDataModelToDisplayModel(phones: ProfilePhone[]): void {
    let profileEntryModel = ProfileEntryModel.fromProfilePhonesArr(phones);
    profileEntryModel.appendIndicesToBoldText();
    this.profileEntryModel = profileEntryModel;
  }

  setIsPrimaryDefault() {
    if (!this.hasPrimary(this.profileEntryModel)) {
      this.primaryRadioOptions.selectedOption = this.primaryRadioOptionStrings.YES;
      this.primary = true;
    } else {
      this.primaryRadioOptions.selectedOption = this.primaryRadioOptionStrings.NO;
      this.primary = false;
    }
  }

  isPrimary(option: string) {
    this.primary = option === this.primaryRadioOptionStrings.YES;
    if (this.primary) {
      this.currentRadioOptions.selectedOption = this.currentRadioOptionStrings.YES;
    }
  }
  validatePhoneLength(control: AbstractControl) {
    if (control.value && control.value.length != 14) {
      control.setErrors({ minlength: { requiredLength: 10 } });
    }
  }
}
