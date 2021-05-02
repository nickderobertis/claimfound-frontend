import { Component, OnInit, OnDestroy } from "@angular/core";

import { ProfileService } from "../../../profile.service";
import { LoggerService } from "../../../../../global/logger.service";
import { AssociatesQuestionsModel } from "../../../models/questions/associatesquestions.model";
import { ProfileStepModel } from "../../../step/profilestep.model";
import { ProfilePageConstants } from "../../../profilepageconstants";
import { AssociateFollowUpQuestionsPOSTAPIArgs } from "src/app/global/api/interfaces/endpoints/questions/follow-questions.interface";
import { Subscription } from "rxjs";
import { UserDetailsStatusModel } from "src/app/global/api/models/userdetails/user-details-status.model";
import { QuestionAnswerResponseModel } from "../../../models/questions/addedanswers.model";
import { CFError } from "src/app/global/error.service";
import { AssociateAnswersModel } from "../../../models/questions/answers.model";
import { EventTrackerService } from "../../../../../global/services/event-tracker/event-tracker.service";
import { taperString } from "src/app/global/utils/stringHelper";

declare let env: any;

/**
 * The component which asks the user questions about family and associates.
 *
 * Subcomponents:
 * * [ProfileRelativesQuestionsRowComponent]{@link ProfileRelativesQuestionsRowComponent}
 *     * [RelativeQuestionsDropdownComponent]{@link RelativeQuestionsDropdownComponent}
 * * [ProfileStepComponent]{@link ProfileStepComponent}
 */
@Component({
  selector: "cf-profile-relatives-questions-component",
  templateUrl: "./profilerelativesquestions.component.html",
  styleUrls: [
    "../../../../../global/css/normalize.scss",
    "../../../../../global/css/webflow.scss",
    "./profilerelativesquestions.component.scss",
  ],
})
export class ProfileRelativesQuestionsComponent implements OnInit, OnDestroy {
  model: AssociatesQuestionsModel;
  answersModel: QuestionAnswerResponseModel;
  loading: boolean = true;

  prevNextButtonsModel: ProfileStepModel;
  refuseAnswerCheckBox: boolean = false;
  noMatchesCheckBox: boolean = false;

  showLoadMore: boolean = false;
  showSaveAndQuestions: boolean = false;
  showAddedItems: boolean = false;

  gotUserDetailsStatusEvent$: Subscription;
  userHasViewedThisPage: boolean = false;

  noMoreQuestions: boolean = false;

  getIncrement = 5;

  constructor(
    private eventTrackerService: EventTrackerService,
    protected profileService: ProfileService,
    protected logger: LoggerService
  ) {}

  ngOnInit(): void {
    this.prevNextButtonsModel = new ProfileStepModel({
      nextURL: ProfilePageConstants.pagePaths.phones,
      prevURL: ProfilePageConstants.pagePaths.relatives,
    });

    this.profileService.setCurrentNavigationPage();
    this.getAssociatesQuestions(this.getIncrement);

    this.gotUserDetailsStatusEvent$ = this.profileService.gotUserDetailsStatusEvent.subscribe(
      (result: UserDetailsStatusModel) => {
        if (result.hasViewedRelativeQuestions) {
          this.userHasViewedThisPage = true;
          this.refreshNextButton();
        }
      }
    );
    this.profileService.runGetUserDetailsStatusEvent();
  }

  ngOnDestroy(): void {
    this.gotUserDetailsStatusEvent$.unsubscribe();
  }

  getAssociatesQuestions(count: number): void {
    let currentItemIds: string[] = [];
    if (this.model) {
      for (let i = 0; i < this.model.associates.length; i++) {
        currentItemIds.push(this.model.associates[i].whitePageId);
      }
    }
    this.profileService.getAssociatesQuestions(count, currentItemIds).subscribe(
      (result: AssociatesQuestionsModel) => {
        this.onGetAssociatesQuestionsSuccess(result);
      },
      (error: CFError) => this.onGetAssociatesQuestionsError(error)
    );
  }

  onGetAssociatesQuestionsSuccess(data: AssociatesQuestionsModel): void {
    this.model = data;
    if (data.associates.length == 0) {
      this.noMoreQuestions = true;
      this.profileService.runGetUserDetailsStatusEvent();
    } else {
      this.showSaveAndQuestions = true;
    }
    this.loading = false;
  }

  onGetAssociatesQuestionsError(error: CFError): void {
    this.showLoadMore = true;
    this.logger.error("error getting associates questions", error);
  }

  onLoadMoreClick(): void {
    this.showLoadMore = false;
    this.loading = true;
    this.showAddedItems = false;
    this.getAssociatesQuestions(this.getIncrement);
  }

  onSaveButtonClick(): void {
    if (!this.canSave()) {
      return;
    }
    this.showSaveAndQuestions = false;
    let answerModel: AssociateAnswersModel = AssociateAnswersModel.fromAssociatesQuestionsModel(
      this.model,
      this.refuseAnswerCheckBox
    );
    let data: AssociateFollowUpQuestionsPOSTAPIArgs = answerModel.toFollowUpQuestionsPOSTAPIArgs();

    this.profileService.sendAssociatesQuestionsResponses(data).subscribe(
      (result: QuestionAnswerResponseModel) => {
        this.onSendAssociatesQuestionsAnswersSuccess(result);
        if (env.CF_ANALYTICS_FE) {
          let intercomData = taperString(result.answers.join(", "), 255);
          this.eventTrackerService.triggerEvent("relativeFollowUp", {
            added: intercomData,
          });
        }
      },
      (error: CFError) => {
        this.onSendAssociatesQuestionsAnswersError(error);
        if (env.CF_ANALYTICS_FE) {
          this.eventTrackerService.triggerEvent("errorFollowUp", {
            data: error,
          });
        }
      }
    );
    this.loading = true;
  }

  onSendAssociatesQuestionsAnswersSuccess(
    result: QuestionAnswerResponseModel
  ): void {
    this.loading = false;
    this.showLoadMore = true;
    this.noMatchesCheckBox = false;
    this.refuseAnswerCheckBox = false;
    this.answersModel = result;
    if (this.answersModel.answers.length > 0) {
      this.showAddedItems = true;
    }
    if (this.answersModel.questionsRemaining == 0) {
      this.noMoreQuestions = true;
    }
    this.profileService.runGetUserDetailsStatusEvent();
    this.refreshNextButton();
  }

  onSendAssociatesQuestionsAnswersError(error: CFError): void {
    this.showSaveAndQuestions = true;
    this.logger.error("error sending associate question responses", error);
  }

  refreshNextButton(): void {
    if (this.userHasViewedThisPage) {
      this.prevNextButtonsModel.nextActive = true;
    } else {
      this.prevNextButtonsModel.nextActive = false;
    }
  }

  canSave(): boolean {
    if (!this.noMatchesCheckBox && !this.refuseAnswerCheckBox) {
      let hasProvidedAnswer = false;
      for (let i = 0; i < this.model.associates.length; i++) {
        if (this.model.associates[i].category !== "none") {
          hasProvidedAnswer = true;
          break;
        }
      }
      if (!hasProvidedAnswer) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  onNotAnsweringCheckBoxClick(oldValue: boolean): void {
    if (oldValue === false) {
      this.setAllAnswersFalseAndSetDisabled(true);
    } else if (oldValue === true && this.noMatchesCheckBox === false) {
      this.setAllAnswersFalseAndSetDisabled(false);
    }
  }

  onNoAssociationCheckBoxClick(oldValue: boolean): void {
    if (oldValue === false) {
      this.setAllAnswersFalseAndSetDisabled(true);
    } else if (oldValue === true && this.refuseAnswerCheckBox === false) {
      this.setAllAnswersFalseAndSetDisabled(false);
    }
  }

  setAllAnswersFalseAndSetDisabled(disable: boolean): void {
    for (let i = 0; i < this.model.associates.length; i++) {
      this.model.associates[i].disabled = disable;
    }
  }

  get saveButtonClass(): string {
    if (!this.canSave()) {
      return "inactive";
    } else {
      return "";
    }
  }
}
