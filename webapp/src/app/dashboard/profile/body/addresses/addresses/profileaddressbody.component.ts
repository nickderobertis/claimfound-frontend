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
  ProfileAddresses,
  ProfileAddress,
} from "../../../models/profileaddresses.model";
import {
  UserDetailsPOSTAddressArgs,
  UserDetailsGETAddressesAPIArgs,
} from "src/app/global/api/interfaces/endpoints/user-details/userdetails.interface";
import { EventTrackerService } from "../../../../../global/services/event-tracker/event-tracker.service";
import { ProfileQuestionsModel } from "../../../models/questions/questions.model";
import { CFError } from "src/app/global/error.service";
import { SelectClaimsService } from "src/app/dashboard/myclaims/select/selectclaims.service";
import { SelectClaimsTable } from "src/app/dashboard/myclaims/select/selectclaimstable.model";
import { ErrorBarService } from "src/app/global/services/error-bar.service";
import { DetermineLoginDashboardRouteService } from "src/app/global/services/determine-login-dashboard-route.service";

declare let env: any;

/**
 * The profile page where the user can enter addresses.
 *
 * Subcomponents:
 * * [ProfileEntryComponent]{@link ProfileEntryComponent}
 *     * [ProfileEntryRowComponent]{@link ProfileEntryRowComponent}
 * * [ProfileStepComponent]{@link ProfileStepComponent}
 */
@Component({
  selector: "cf-profile-address-body-component",
  templateUrl: "./profileaddressbody.component.html",
  styleUrls: [
    "../../../../../global/css/normalize.scss",
    "../../../../../global/css/webflow.scss",
    "./profileaddressbody.component.scss",
  ],
})
export class ProfileAddressBodyComponent extends ProfileInputPageBaseComponent
  implements OnInit {
  radioOptions: RadioButtonModel;
  radioCurrentOptions: RadioButtonModel;
  primary: boolean;
  radioOptionStrings: { [key: string]: string } = {
    YES: "Yes",
    NO: "No",
  };

  formConstants: { [key: string]: string } = {
    streetAddress: "streetAddress",
    city: "city",
    state: "state",
    zipCode: "zipCode",
  };

  userDetailsTable: string = this.profileService.tableClassConstants.Addesses;

  backendErrorKeysToFrontendFormMap: { [key: string]: string } = {
    street_address: this.formConstants.streetAddress,
    city: this.formConstants.city,
    state: this.formConstants.state,
    zip_code: this.formConstants.zipCode,
  };

  constructor(
    protected eventTrackerService: EventTrackerService,
    protected profileService: ProfileService,
    protected routeFindingService: DetermineLoginDashboardRouteService,
    protected errorBarService: ErrorBarService,
    protected logger: LoggerService
  ) {
    super(eventTrackerService, profileService, errorBarService, logger);
    this.inputForm.addControl(
      this.formConstants.streetAddress,
      new FormControl(null, [Validators.required])
    );
    this.inputForm.addControl(
      this.formConstants.city,
      new FormControl(null, [Validators.required])
    );
    this.inputForm.addControl(
      this.formConstants.state,
      new FormControl(null, [Validators.required, Validators.minLength(2)])
    );
    this.inputForm.addControl(
      this.formConstants.zipCode,
      new FormControl(null, [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
      ])
    );
  }

  ngOnInit(): void {
    this.prevNextButtonsModel = new ProfileStepModel({
      prevURL: ProfilePageConstants.pagePaths.phonesQuestions,
      nextURL: ProfilePageConstants.pagePaths.addressesQuestions,
    });

    this.profileEntryModel = new ProfileEntryModel({ rows: [] });

    this.radioOptions = new RadioButtonModel(
      [this.radioOptionStrings.YES, this.radioOptionStrings.NO],
      this.radioOptionStrings.YES
    );
    this.radioCurrentOptions = new RadioButtonModel(
      [this.radioOptionStrings.YES, this.radioOptionStrings.NO],
      this.radioOptionStrings.YES
    );

    this.profileService.getAddressQuestions(1).subscribe(
      (result: ProfileQuestionsModel) => {
        if (result.questions.length == 0) {
          this.setRouteToDashBoardOrSelectClaims();
        }
      },
      (error: CFError) =>
        this.logger.error(
          "Could not get associate questions from addresses page.",
          error.toString()
        )
    );

    super.ngOnInit();
  }

  onGetDataSuccess(result: UserDetailsGETAddressesAPIArgs): void {
    let data = new ProfileAddresses(result);
    this.convertDataModelToDisplayModel(data.addresses);
    this.setIsPrimaryDefault();
    this.loading = false;
    this.refreshNextButton();
  }

  onSaveButtonClick(): void {
    super.onSaveButtonClick();
    if (this.inputForm.invalid) {
      this.showError = true;
      return;
    }

    let newAddress: UserDetailsPOSTAddressArgs = {
      street_address: this.inputForm.controls[this.formConstants.streetAddress]
        .value,
      city: this.inputForm.controls[this.formConstants.city].value,
      state: this.inputForm.controls[this.formConstants.state].value,
      zip_code: this.inputForm.controls[this.formConstants.zipCode].value,
      is_primary:
        this.radioOptions.selectedOption === this.radioOptionStrings.YES,
      current:
        this.radioCurrentOptions.selectedOption === this.radioOptionStrings.YES,
    };

    this.addUserDetails(newAddress);
    if (env.CF_ANALYTICS_FE) {
      this.eventTrackerService.triggerEvent("addAddress", newAddress);
    }
  }

  refreshNextButton(): void {
    for (let index = 0; index < this.profileEntryModel.rows.length; index++) {
      if (this.profileEntryModel.rows[index].primary) {
        this.prevNextButtonsModel.nextActive = true;
        return;
      }
    }
  }

  closeInput(): void {
    super.closeInput();
    this.setIsPrimaryDefault();
    this.radioCurrentOptions.selectedOption = this.radioOptionStrings.YES;
  }

  convertDataModelToDisplayModel(addresses: ProfileAddress[]): void {
    let profileEntryModel = ProfileEntryModel.fromProfileAddressesArr(
      addresses
    );
    profileEntryModel.appendIndicesToBoldText();
    this.profileEntryModel = profileEntryModel;
  }

  setIsPrimaryDefault() {
    if (!this.hasPrimary(this.profileEntryModel)) {
      this.radioOptions.selectedOption = this.radioOptionStrings.YES;
      this.primary = true;
    } else {
      this.radioOptions.selectedOption = this.radioOptionStrings.NO;
      this.primary = false;
    }
  }

  setRouteToDashBoardOrSelectClaims() {
    this.routeFindingService
      .getSelectClaimsTotals(SelectClaimsService.VALID_RESULT_TYPES.NEW)
      .subscribe((res: SelectClaimsTable) => {
        if (res.totalNumberOfClaims > 0) {
          this.prevNextButtonsModel.nextURL = "/dashboard/myclaims/select";
        } else {
          this.prevNextButtonsModel.nextURL = "/dashboard";
        }
      });
  }

  isPrimary(option: string) {
    this.primary = option === this.radioOptionStrings.YES;
    if (this.primary) {
      this.radioCurrentOptions.selectedOption = this.radioOptionStrings.YES;
    }
  }
}
