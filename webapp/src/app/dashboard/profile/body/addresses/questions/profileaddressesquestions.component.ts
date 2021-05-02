import { Component, OnInit } from "@angular/core";

import { ProfileService } from "../../../profile.service";
import { LoggerService } from "../../../../../global/logger.service";
import { ProfilePageConstants } from "../../../profilepageconstants";
import { ProfileQuestionsComponent } from "../../questionsbase/profilequestions.component";
import { ProfileQuestionsModel } from "../../../models/questions/questions.model";
import { UserDetailsStatusModel } from "src/app/global/api/models/userdetails/user-details-status.model";
import { CFError } from "src/app/global/error.service";
import { QuestionAnswerResponseModel } from "../../../models/questions/addedanswers.model";
import { AddressAnswersModel } from "../../../models/questions/answers.model";
import { EventTrackerService } from "../../../../../global/services/event-tracker/event-tracker.service";
import { SelectClaimsService } from "src/app/dashboard/myclaims/select/selectclaims.service";
import { SelectClaimsTable } from "src/app/dashboard/myclaims/select/selectclaimstable.model";
import { DetermineLoginDashboardRouteService } from "src/app/global/services/determine-login-dashboard-route.service";
import { taperString } from "src/app/global/utils/stringHelper";

declare let env: any;

/**
 * The component which asks the user questions about prior addresses.
 *
 * Subcomponents:
 * * [ProfileStepComponent]{@link ProfileStepComponent}
 */
@Component({
  selector: "cf-profile-address-questions-component",
  templateUrl: "../../questionsbase/profilequestions.component.html",
  styleUrls: [
    "../../../../../global/css/normalize.scss",
    "../../../../../global/css/webflow.scss",
    "../../questionsbase/profilequestions.component.scss",
  ],
})
export class ProfileAddressesQuestionsComponent
  extends ProfileQuestionsComponent
  implements OnInit {
  headerText = "Addresses help us match you with your lost money.";
  subText =
    "98% of all claims have an address associated with them, so the best way to" +
    " find your money is to tell us about the places you have lived.";
  subTextTwo = "Have you ever lived at any of the places below?";
  notAssociatedText = "I'm not associated with any of these addresses.";

  constructor(
    private eventTrackerService: EventTrackerService,
    protected profileService: ProfileService,
    protected routeFindingService: DetermineLoginDashboardRouteService,
    protected logger: LoggerService
  ) {
    super(profileService, logger);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.prevNextButtonsModel.prevURL =
      ProfilePageConstants.pagePaths.addresses;
    this.prevNextButtonsModel.nextURL = "/dashboard";

    this.setRouteToDashBoardOrSelectClaims();

    this.gotUserDetailsStatusEvent$ = this.profileService.gotUserDetailsStatusEvent.subscribe(
      (result: UserDetailsStatusModel) => {
        if (result.hasViewedAddressQuestions) {
          this.userHasViewedThisPage = true;
          this.refreshNextButton();
        }
      }
    );
    this.profileService.runGetUserDetailsStatusEvent();
  }

  getQuestions(count: number): void {
    this.profileService.getAddressQuestions(count).subscribe(
      (result: ProfileQuestionsModel) => {
        this.onGetQuestionsSuccess(result);
      },
      (error: CFError) => this.onGetQuestionsError(error)
    );
  }

  onGetQuestionsSuccess(data: ProfileQuestionsModel): void {
    this.model = data;
    super.onGetQuestionsSuccess(data);
  }

  onSaveButtonClick(): void {
    if (!this.canSave()) {
      return;
    }
    super.onSaveButtonClick();

    let answerModel = AddressAnswersModel.fromProfileQuestionsModel(
      this.model,
      this.refuseAnswerCheckBox
    );
    let data = answerModel.toFollowUpQuestionsPOSTAPIArgs();

    this.profileService.sendAddressQuestionsResponses(data).subscribe(
      (result: QuestionAnswerResponseModel) => {
        this.onSendQuestionsAnswersSuccess(result);
        if (env.CF_ANALYTICS_FE) {
          let intercomData = taperString(result.answers.join(", "), 255);
          this.eventTrackerService.triggerEvent("addressFollowUp", {
            added: intercomData,
          });
        }
      },
      (error: CFError) => {
        this.onSendQuestionsAnswersError(error);
        if (env.CF_ANALYTICS_FE) {
          this.eventTrackerService.triggerEvent("errorFollowUp", {
            data: error,
          });
        }
      }
    );
  }

  getFormattedQuestion(question: string): string {
    return question;
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
}
