import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";

import { ProfileService } from "../../../profile.service";

import { LoggerService } from "../../../../../global/logger.service";
import {
  ProfileEntryModel,
  ProfileEntryRowArgs,
} from "../../../entereddata/profileentry.model";
import {
  UserDetailsPOSTNameArgs,
  UserDetailsGETNameAPIArgs,
} from "src/app/global/api/interfaces/endpoints/user-details/userdetails.interface";
import { ProfileStepModel } from "../../../step/profilestep.model";
import { ProfilePageConstants } from "../../../profilepageconstants";
import { RadioButtonModel } from "src/app/global/components/customradiobuttons/radiobutton.model";
import { ProfileInputPageBaseComponent } from "../../profileinputpagebase.component";
import { ProfileNames, ProfileName } from "../../../models/profilenames.model";
import { Subscription } from "rxjs";
import { UserDetailsStatusModel } from "src/app/global/api/models/userdetails/user-details-status.model";
import { EventTrackerService } from "../../../../../global/services/event-tracker/event-tracker.service";
import { StorageService } from "src/app/global/storage.service";
import { ErrorBarService } from "src/app/global/services/error-bar.service";

declare let env: any;

/**
 * The profile page where the user can enter prior names and change the primary name.
 *
 * Subcomponents:
 * * [ProfileEntryComponent]{@link ProfileEntryComponent}
 *     * [ProfileEntryRowComponent]{@link ProfileEntryRowComponent}
 * * [ProfileStepComponent]{@link ProfileStepComponent}
 */
@Component({
  selector: "cf-profile-names-body-component",
  templateUrl: "./profilenamesbody.component.html",
  styleUrls: [
    "../../../../../global/css/normalize.scss",
    "../../../../../global/css/webflow.scss",
    "./profilenamesbody.component.scss",
  ],
})
export class ProfileNamesBodyComponent extends ProfileInputPageBaseComponent
  implements OnInit, OnDestroy {
  radioOptions: RadioButtonModel;

  radioOptionStrings: { [key: string]: string } = {
    YES: "Yes",
    NO: "No",
  };

  noOtherNamesChecked: boolean = false;
  userHasViewedNextPage: boolean = false;

  formConstants: { [key: string]: string } = {
    firstName: "firstName",
    lastName: "lastName",
    middleName: "middleName",
  };

  userDetailsTable: string = this.profileService.tableClassConstants.Names;

  backendErrorKeysToFrontendFormMap: { [key: string]: string } = {
    first_name: this.formConstants.firstName,
    last_name: this.formConstants.lastName,
    middle_name: this.formConstants.middleName,
  };

  gotUserDetailsStatusEvent$: Subscription;

  // Prevents weird visual issue when only hidden is used to hide page contents. On this page only
  firstLoadFinished: boolean = false;

  constructor(
    protected eventTrackerService: EventTrackerService,
    protected profileService: ProfileService,
    protected errorBarService: ErrorBarService,
    protected logger: LoggerService,
    private storage: StorageService
  ) {
    super(eventTrackerService, profileService, errorBarService, logger);
    this.inputForm.addControl(
      this.formConstants.firstName,
      new FormControl(null, [Validators.required])
    );
    this.inputForm.addControl(
      this.formConstants.lastName,
      new FormControl(null, Validators.required)
    );
    this.inputForm.addControl(
      this.formConstants.middleName,
      new FormControl(null)
    );
  }

  ngOnInit(): void {
    this.prevNextButtonsModel = new ProfileStepModel({
      nextURL: ProfilePageConstants.pagePaths.birthdayGender,
      showPrev: false,
    });

    this.radioOptions = new RadioButtonModel(
      [this.radioOptionStrings.YES, this.radioOptionStrings.NO],
      this.radioOptionStrings.NO
    );

    this.gotUserDetailsStatusEvent$ = this.profileService.gotUserDetailsStatusEvent.subscribe(
      (result: UserDetailsStatusModel) => {
        if (result.gender.userHasViewed) {
          this.userHasViewedNextPage = true;
          this.refreshNextButton();
        }
        this.loading = false;
        this.firstLoadFinished = true;
      }
    );

    super.ngOnInit();
  }

  ngOnDestroy(): void {
    this.gotUserDetailsStatusEvent$.unsubscribe();
    super.ngOnDestroy();
  }

  convertDataModelToDisplayModel(names: ProfileName[]): void {
    let profileEntryModel = ProfileEntryModel.fromNamesArr(names);
    this.profileEntryModel = profileEntryModel;
  }

  onGetDataSuccess(result: UserDetailsGETNameAPIArgs): void {
    let data = new ProfileNames(result);
    this.convertDataModelToDisplayModel(data.names);
    this.setIsPrimaryDefault();
    this.refreshNextButton();
  }

  onSaveButtonClick(): void {
    super.onSaveButtonClick();
    if (this.inputForm.invalid) {
      this.showError = true;
      return;
    }

    let newName: UserDetailsPOSTNameArgs = {
      first_name: this.inputForm.controls[this.formConstants.firstName].value,
      last_name: this.inputForm.controls[this.formConstants.lastName].value,
      middle_name: this.inputForm.controls[this.formConstants.middleName].value,
      is_primary:
        this.radioOptions.selectedOption === this.radioOptionStrings.YES,
    };

    this.addUserDetails(newName);
    if (env.CF_ANALYTICS_FE) {
      this.eventTrackerService.triggerEvent("addName", {
        data: newName.first_name + " " + newName.last_name,
      });
    }
  }

  onNoOtherNamesCheckBoxClick(): void {
    this.refreshNextButton();
  }

  closeInput(): void {
    super.closeInput();
    this.setIsPrimaryDefault();
  }

  refreshNextButton(): void {
    this.prevNextButtonsModel.nextActive =
      this.profileEntryModel.rows.length > 1 ||
      this.noOtherNamesChecked ||
      this.userHasViewedNextPage;
  }

  onAddDetailsSuccess(): void {
    let firstName = this.inputForm.controls[this.formConstants.firstName].value;
    let lastName = this.inputForm.controls[this.formConstants.lastName].value;

    if (this.isPrimary) {
      this.storage.write("cf-user-last-name", lastName);
      this.storage.write("cf-user-name", firstName);
    }

    super.onAddDetailsSuccess();
  }

  get isPrimary(): boolean {
    return this.radioOptions.selectedOption === this.radioOptionStrings.YES;
  }

  get showNoOtherNamesCheckbox(): boolean {
    return (
      this.profileEntryModel.rows.length <= 1 && !this.userHasViewedNextPage
    );
  }

  setIsPrimaryDefault() {
    if (!this.hasPrimary(this.profileEntryModel)) {
      this.radioOptions.selectedOption = this.radioOptionStrings.YES;
    } else {
      this.radioOptions.selectedOption = this.radioOptionStrings.NO;
    }
  }
}
