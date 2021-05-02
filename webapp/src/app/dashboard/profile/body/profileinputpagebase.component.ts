import { OnInit, OnDestroy, Injectable } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

import { LoggerService } from "../../../global/logger.service";
import {
  ProfileEntryModel,
  ProfileEntryRowModel,
} from "../entereddata/profileentry.model";
import { ProfileService } from "../profile.service";
import { ProfileStepModel } from "../step/profilestep.model";
import { Subscription } from "rxjs";
import { CFError } from "src/app/global/error.service";
import {
  UserDetailsGETAPIArgs,
  UserDetailsPOSTArgs,
  UserDetailsPOSTAPIArgs,
} from "src/app/global/api/interfaces/endpoints/user-details/userdetails.interface";
import { EventTrackerService } from "../../../global/services/event-tracker/event-tracker.service";
import { FormGroupHelper } from "src/app/global/utils/formGroupHelper";
import { ErrorBarService } from "src/app/global/services/error-bar.service";
import { ErrorBarComponent } from "src/app/global/components/error-bar/error-bar.component";

declare let env: any;

/**
 * The base class component for the profile (not questions) pages.
 */
@Injectable()
export abstract class ProfileInputPageBaseComponent
  implements OnDestroy, OnInit {
  profileEntryModel: ProfileEntryModel;
  prevNextButtonsModel: ProfileStepModel;

  loading: boolean = true;
  showInput: boolean = false;
  showError: boolean = false;

  inputForm: FormGroup;

  baseFormConstants: { [key: string]: string } = {
    unSavedInputs: "unSavedInputs",
    duplicateDetails: "duplicateDetails",
  };

  unSaveInputNavEvent$: Subscription;

  // Defines which table class this component will be interacting with in the user details endpoint
  // Valid classes are a constant in the profileService.ts
  abstract userDetailsTable: string = "";

  // Defines a object mapping the expected error keys for form inputs to their frontend names
  protected abstract backendErrorKeysToFrontendFormMap: {
    [key: string]: string;
  } = {};

  constructor(
    protected eventTrackerService: EventTrackerService,
    protected profileService: ProfileService,
    protected errorBarService: ErrorBarService,
    protected logger: LoggerService
  ) {
    this.inputForm = new FormGroup({
      unSavedInputs: new FormControl(""),
      duplicateDetails: new FormControl(""),
    });
  }

  ngOnInit(): void {
    this.unSaveInputNavEvent$ = this.profileService.unSavedInputNavEvent.subscribe(
      (result: boolean) => {
        this.onUnsavedInputError();
      }
    );
    this.profileService.setInputForm(this.inputForm);
    this.profileService.setCurrentNavigationPage();
    this.getData();
  }

  ngOnDestroy(): void {
    this.unSaveInputNavEvent$.unsubscribe();
    this.profileService.setInputForm(null);
  }

  onAddButtonClick(): void {
    this.showInput = true;
  }

  closeInput(): void {
    this.showInput = false;
    this.showError = false;
    this.inputForm.reset();
  }

  onSaveButtonClick(): void {
    this.inputForm.controls[this.baseFormConstants.unSavedInputs].setErrors(
      null
    );
    this.inputForm.controls[this.baseFormConstants.duplicateDetails].setErrors(
      null
    );
  }

  onUnsavedInputError(): void {
    this.showError = true;
    let error = {};
    error[ErrorBarComponent.ERROR_BAR_ERROR_TYPES.MESSAGE] =
      "Please save your entry to continue.";
    this.inputForm.controls[this.baseFormConstants.unSavedInputs].setErrors(
      error
    );
  }

  textBoxErrorClass(field: string): string {
    if (this.showError && this.inputForm.controls[field].invalid) {
      return "error";
    } else {
      return "";
    }
  }

  fieldIsInvalid(field: string): boolean {
    return this.inputForm.controls[field].invalid;
  }

  get anyFieldInvalid(): boolean {
    return this.inputForm.invalid;
  }

  getData(): void {
    this.profileService.getUserDetails(this.userDetailsTable).subscribe(
      (result: UserDetailsGETAPIArgs) => {
        this.onGetDataSuccess(result);
      },
      (error: CFError) => this.onGetDataError(error)
    );
  }
  // All child classes must implment a method to convert the expected raw response from thier
  // tables endpoint into their corresponding profile model then use that to populate
  // the profile entry model
  abstract onGetDataSuccess(result: UserDetailsGETAPIArgs): void;

  onGetDataError(error: CFError): void {
    this.logger.error("error getting user details", error);
  }

  onDeleteEvent(event: ProfileEntryRowModel): void {
    this.loading = true;
    this.profileService
      .deleteUserDetails(event.id, this.userDetailsTable)
      .subscribe(
        (result: UserDetailsPOSTAPIArgs) => {
          this.onDeleteSuccess();
        },
        (error: CFError) => this.onDeleteError(error)
      );
  }

  onDeleteSuccess(): void {
    this.profileService.emitProfileUpdatedEvent();
    this.getData();
  }

  onDeleteError(error: CFError): void {
    this.logger.error("error deleting user details", error);
    this.getData();
  }

  addUserDetails(details: UserDetailsPOSTArgs): void {
    this.profileService
      .addUserDetails(details, this.userDetailsTable)
      .subscribe(
        (result: UserDetailsPOSTAPIArgs) => {
          this.onAddDetailsSuccess();
        },
        (error: CFError) => {
          this.onAddDetailsError(error);
          if (env.CF_ANALYTICS_FE) {
            this.eventTrackerService.triggerEvent("errorAddProfileInfo", {
              data: error,
            });
          }
        }
      );
    this.loading = true;
  }

  onAddDetailsSuccess(): void {
    this.profileService.emitProfileUpdatedEvent();
    this.closeInput();
    this.getData();
  }

  onAddDetailsError(error: CFError): void {
    this.logger.info("error adding user details", error);
    this.errorBarService.pushCFErrorEvent({ profileInputErrorBar: error });
    if (error.name == "duplicateUserDetails") {
      let formError = {};
      formError[ErrorBarComponent.ERROR_BAR_ERROR_TYPES.DUPLICATE] = true;
      this.inputForm.controls[
        this.baseFormConstants.duplicateDetails
      ].setErrors(formError);
    }
    this.showError = true;
    this.loading = false;
  }

  hasPrimary(data: ProfileEntryModel): boolean {
    for (let i = 0; i < data.rows.length; i++) {
      if (data.rows[i].primary) {
        return true;
      }
    }
    return false;
  }
}
