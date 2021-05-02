import { Component, OnInit } from "@angular/core";

import { ProfileService } from "../../../profile.service";
import { LoggerService } from "../../../../../global/logger.service";
import { ProfilePageConstants } from "../../../profilepageconstants";
import { ProfileQuestionsComponent } from "../../questionsbase/profilequestions.component";
import { ProfileQuestionsModel } from "../../../models/questions/questions.model";
import { PhoneFollowUpQuestionsPOSTAPIArgs } from "src/app/global/api/interfaces/endpoints/questions/follow-questions.interface";
import { UserDetailsStatusModel } from "src/app/global/api/models/userdetails/user-details-status.model";
import { CFError } from "src/app/global/error.service";
import { QuestionAnswerResponseModel } from "../../../models/questions/addedanswers.model";
import { PhoneAnswersModel } from "../../../models/questions/answers.model";
import { EventTrackerService } from "../../../../../global/services/event-tracker/event-tracker.service";
import { taperString } from "src/app/global/utils/stringHelper";

declare let env: any;

/**
 * The component which asks the user questions about phone numbers.
 *
 * Subcomponents:
 * * [ProfileStepComponent]{@link ProfileStepComponent}
 */
@Component({
  selector: "cf-profile-phone-questions-component",
  templateUrl: "../../questionsbase/profilequestions.component.html",
  styleUrls: [
    "../../../../../global/css/normalize.scss",
    "../../../../../global/css/webflow.scss",
    "../../questionsbase/profilequestions.component.scss",
  ],
})
export class ProfilePhonesQuestionsComponent extends ProfileQuestionsComponent
  implements OnInit {
  headerText = "We need a phone number to put on your claim form.";
  subText =
    "We need to provide the unclaimed property division with a phone number if they need to contact you about your claim. It also helps us match your claims.";
  subTextTwo = "Have any of these phone numbers ever belonged to you?";
  notAssociatedText = "I'm not associated with any of these phone numbers.";

  constructor(
    private eventTrackerService: EventTrackerService,
    protected profileService: ProfileService,
    protected logger: LoggerService
  ) {
    super(profileService, logger);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.prevNextButtonsModel.nextURL =
      ProfilePageConstants.pagePaths.addresses;
    this.prevNextButtonsModel.prevURL = ProfilePageConstants.pagePaths.phones;

    this.gotUserDetailsStatusEvent$ = this.profileService.gotUserDetailsStatusEvent.subscribe(
      (result: UserDetailsStatusModel) => {
        if (result.hasViewedPhoneQuestions) {
          this.userHasViewedThisPage = true;
          this.refreshNextButton();
        }
      }
    );
    this.profileService.runGetUserDetailsStatusEvent();
  }

  getQuestions(count: number) {
    this.profileService.getPhonesQuestions(count).subscribe(
      (result: ProfileQuestionsModel) => {
        this.onGetQuestionsSuccess(result);
      },
      (error: CFError) => this.onGetQuestionsError(error)
    );
  }

  onGetQuestionsSuccess(data: ProfileQuestionsModel) {
    this.model = data;
    super.onGetQuestionsSuccess(data);
  }

  onSaveButtonClick() {
    if (!this.canSave()) {
      return;
    }
    super.onSaveButtonClick();

    let answerModel: PhoneAnswersModel = PhoneAnswersModel.fromProfileQuestionsModel(
      this.model,
      this.refuseAnswerCheckBox
    );
    let data: PhoneFollowUpQuestionsPOSTAPIArgs = answerModel.toFollowUpQuestionsPOSTAPIArgs();

    this.profileService.sendPhonesQuestionsResponses(data).subscribe(
      (result: QuestionAnswerResponseModel) => {
        this.onSendQuestionsAnswersSuccess(result);
        if (env.CF_ANALYTICS_FE) {
          let intercomData = taperString(result.answers.join(", "), 255);
          this.eventTrackerService.triggerEvent("phoneFollowUp", {
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
    return question.substr(2);
  }
}
