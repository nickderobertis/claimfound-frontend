import { OnInit, OnDestroy, Injectable } from "@angular/core";
import { Subscription } from "rxjs";

import { ProfileService } from "../../profile.service";
import { LoggerService } from "../../../../global/logger.service";
import { ProfileStepModel } from "../../step/profilestep.model";
import { ProfileQuestionsModel } from "../../models/questions/questions.model";
import { QuestionAnswerResponseModel } from "../../models/questions/addedanswers.model";
import { CFError } from "src/app/global/error.service";

/**
 * The base class component for the questions pages on the profile.
 * NOTE due to numberous small differences the associates questions page does
 * not extend this base class.
 */
@Injectable()
export abstract class ProfileQuestionsComponent implements OnInit, OnDestroy {
  model: ProfileQuestionsModel;
  answersModel: QuestionAnswerResponseModel;
  loading: boolean = true;

  abstract headerText: string;
  abstract subText: string;
  abstract subTextTwo: string;
  abstract notAssociatedText: string;

  prevNextButtonsModel: ProfileStepModel;
  refuseAnswerCheckBox: boolean = false;
  noMatchesCheckBox: boolean = false;

  showLoadMore: boolean = false;
  showSaveAndQuestions: boolean = false;
  showAddedItems: boolean = false;

  gotUserDetailsStatusEvent$: Subscription;
  userHasViewedThisPage: boolean = false;

  noMoreQuestions: boolean = false;

  getIncrement: number = 5;

  onSmallScreen: boolean = false;

  constructor(
    protected profileService: ProfileService,
    protected logger: LoggerService
  ) {}

  ngOnInit(): void {
    if (window.innerWidth <= 479) {
      this.onSmallScreen = true;
    }
    this.prevNextButtonsModel = new ProfileStepModel({});

    this.profileService.setCurrentNavigationPage();
    this.getQuestions(this.getIncrement);
  }

  ngOnDestroy(): void {
    this.gotUserDetailsStatusEvent$.unsubscribe();
  }

  abstract getQuestions(count: number): void;

  // Be sure to override this with code to handle getting model and call super
  onGetQuestionsSuccess(data: ProfileQuestionsModel): void {
    if (data.questions.length == 0) {
      this.noMoreQuestions = true;
      this.profileService.runGetUserDetailsStatusEvent();
    } else {
      this.showSaveAndQuestions = true;
    }
    this.loading = false;
  }

  onGetQuestionsError(error: CFError): void {
    this.showLoadMore = true;
    this.logger.error("error getting questions", error);
  }

  onLoadMoreClick(): void {
    this.showLoadMore = false;
    this.loading = true;
    this.showAddedItems = false;
    this.getQuestions(this.getIncrement);
  }

  // Be sure to override this with code to save model in the backend and call super
  onSaveButtonClick(): void {
    this.showSaveAndQuestions = false;
    this.loading = true;
  }

  onSendQuestionsAnswersSuccess(result: QuestionAnswerResponseModel): void {
    this.loading = false;
    this.showLoadMore = true;
    this.noMatchesCheckBox = false;
    this.refuseAnswerCheckBox = false;
    this.profileService.runGetUserDetailsStatusEvent();
    this.answersModel = result;
    if (this.answersModel.answers.length > 0) {
      this.showAddedItems = true;
    }
    if (this.answersModel.questionsRemaining == 0) {
      this.noMoreQuestions = true;
    }
    this.refreshNextButton();
  }

  onSendQuestionsAnswersError(error: CFError): void {
    this.showSaveAndQuestions = true;
    this.logger.error("error sending question responses", error);
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
      for (let i = 0; i < this.model.questions.length; i++) {
        if (this.model.questions[i].answer) {
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

  getFormattedQuestion(question: string): string {
    return question;
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
    for (let i = 0; i < this.model.questions.length; i++) {
      this.model.questions[i].answer = false;
      this.model.questions[i].isCurrent = false;
      this.model.questions[i].disabled = disable;
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
