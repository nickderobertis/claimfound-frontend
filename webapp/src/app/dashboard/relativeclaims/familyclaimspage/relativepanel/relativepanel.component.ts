import { Component, Input, Output, EventEmitter } from "@angular/core";

import { LoggerService } from "../../../../global/logger.service";

import {
  RelativeClaimsModel,
  RelativeClaimsQuestionsModel,
} from "../../models/relative-claims.model";
import { RelativeClaimsService } from "../../relativeclaims.service";
import { CFError } from "src/app/global/error.service";

/**
 * The component on the family claims page associated with a single relative, encompassing the name,
 * claim totals, questions about deceased and heir, the referral bar, and the modal which says the claim has been
 * added to the deceased claims page.
 *
 * Subcomponents:
 * * [ReferralBarComponent]{@link ReferralBarComponent}
 */
@Component({
  selector: "cf-relative-panel",
  templateUrl: "./relativepanel.component.html",
  styleUrls: [
    "../../../../global/css/normalize.scss",
    "../../../../global/css/webflow.scss",
    "./relativepanel.component.scss",
  ],
})
export class RelativePanelComponent {
  @Input() model: RelativeClaimsModel;
  @Output() addedDeceasedClaimEvent: EventEmitter<
    RelativeClaimsModel
  > = new EventEmitter<RelativeClaimsModel>();

  ongoingUpdate: boolean = false;

  constructor(
    private relativeClaimsService: RelativeClaimsService,
    private logger: LoggerService
  ) {}

  get displayDeceasedConfirmationQuestion(): boolean {
    return (
      !this.ongoingUpdate &&
      !this.model.relativeClaimsQuestions.deceasedConfirmed
    );
  }

  get displayUserIsHeirQuestion(): boolean {
    return (
      !this.ongoingUpdate &&
      this.model.relativeClaimsQuestions.deceasedConfirmed &&
      this.model.relativeClaimsQuestions.userIsHeir == "notanswered"
    );
  }

  get displayClaimReferrals(): boolean {
    return true;
  }

  isDeceasedConfirmationClick(isDeceased: boolean) {
    this.ongoingUpdate = true;
    let updateArg = this.copyQuestionsModel();
    updateArg.deceased = isDeceased;
    updateArg.deceasedConfirmed = true;

    this.relativeClaimsService
      .updateRelativesDeceasedHeirInfo(updateArg)
      .subscribe(
        (result) => {
          this.ongoingUpdate = false;
          this.model.relativeClaimsQuestions.relativeId =
            result.updatedIds.newId;
          if (
            (this.model.relativeClaimsQuestions.userIsHeir == "True" ||
              this.model.relativeClaimsQuestions.userIsHeir == "unsure") &&
            isDeceased
          ) {
            this.addDeceasedClaimToUserDashboard();
          }
          this.model.relativeClaimsQuestions.deceasedConfirmed = true;
          this.model.relativeClaimsQuestions.deceased = isDeceased;
        },
        (error: CFError) => this.handleUpdateRelativeQuestionsError(error)
      );
  }

  isUserHeirClick(isHeir: string) {
    this.ongoingUpdate = true;
    let updateArg = this.copyQuestionsModel();
    updateArg.userIsHeir = isHeir;

    this.relativeClaimsService
      .updateRelativesDeceasedHeirInfo(updateArg)
      .subscribe(
        (result) => {
          this.ongoingUpdate = false;
          this.model.relativeClaimsQuestions.relativeId =
            result.updatedIds.newId;
          if (
            (isHeir == "True" || isHeir == "unsure") &&
            this.model.relativeClaimsQuestions.deceased
          ) {
            this.addDeceasedClaimToUserDashboard();
          }
          this.model.relativeClaimsQuestions.userIsHeir = isHeir;
        },
        (error: CFError) => this.handleUpdateRelativeQuestionsError(error)
      );
  }

  handleUpdateRelativeQuestionsError(error: CFError) {
    this.ongoingUpdate = false;
    this.logger.error("Error updating relative questions:", error);
  }

  addDeceasedClaimToUserDashboard() {
    this.addedDeceasedClaimEvent.emit(this.model);
  }

  get referralName(): string {
    let relativeName = this.model.name.capitalizedFirstName;
    if (
      this.model.relativeClaimsQuestions.deceased &&
      this.model.relativeClaimsQuestions.userIsHeir != "True"
    ) {
      if (relativeName.substr(-1) == "s") {
        return `${relativeName}' heir`;
      } else {
        return `${relativeName}'s heir`;
      }
    }
    return relativeName;
  }

  copyQuestionsModel(): RelativeClaimsQuestionsModel {
    let copyModel: RelativeClaimsQuestionsModel = new RelativeClaimsQuestionsModel();
    copyModel.deceased = this.model.relativeClaimsQuestions.deceased;
    copyModel.deceasedConfirmed = this.model.relativeClaimsQuestions.deceasedConfirmed;
    copyModel.firstName = this.model.relativeClaimsQuestions.firstName;
    copyModel.lastName = this.model.relativeClaimsQuestions.lastName;
    copyModel.relationship = this.model.relationship;
    copyModel.relativeId = this.model.relativeClaimsQuestions.relativeId;
    copyModel.userIsHeir = this.model.relativeClaimsQuestions.userIsHeir;
    return copyModel;
  }
}
