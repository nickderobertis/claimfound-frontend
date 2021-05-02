import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";

import { LoggerService } from "../../global/logger.service";
import { StorageService } from "../../global/storage.service";
import { ErrorModalService } from "../../error-modal/errormodal.service";
import {
  BaseService,
  TokenServiceRequestOptions,
} from "../../global/base.service";
import { UserDetailsStatusModel } from "src/app/global/api/models/userdetails/user-details-status.model";
import { UserDetailsStatusAPIArgs } from "src/app/global/api/interfaces/endpoints/user-details/user-details-status.interface";
import {
  AssociatesFollowUpQuestionsGETAPIArgs,
  AssociateFollowUpQuestionsPOSTAPIArgs,
  FollowUpQuestionsGETAPIArgs,
  PhoneFollowUpQuestionsPOSTAPIArgs,
  AddressFollowUpQuestionsPOSTAPIArgs,
  FollowUpQuestionsPOSTResponseArgs,
  FollowUpQuestionsGETRequestArgs,
} from "src/app/global/api/interfaces/endpoints/questions/follow-questions.interface";
import { AssociatesQuestionsModel } from "./models/questions/associatesquestions.model";
import { ProfileQuestionsModel } from "./models/questions/questions.model";
import { QuestionAnswerResponseModel } from "./models/questions/addedanswers.model";
import { MatchingInProgressAPIArgs } from "src/app/global/api/interfaces/endpoints/matching/matchinginprogress.interface";
import { MatchingInProgressModel } from "src/app/global/api/models/matching/matchinginprogress.model";
import {
  UserDetailsGETAPIArgs,
  UserDetailsPOSTArgs,
  UserDetailsPOSTAPIRequestArgs,
  UserDetailsPOSTAPIArgs,
  UserDetailsDELETEAPIRequestArgs,
} from "src/app/global/api/interfaces/endpoints/user-details/userdetails.interface";

/**
 * The service powering the profile and questions pages which gets, adds, and deletes
 * profile info, gets and stores responses to follow up questions, checks the status
 * of profile and matching completion, and tracks navigation state in the profile.
 */
@Injectable()
export class ProfileService extends BaseService {
  inputForm: FormGroup;
  unSavedInputNavEvent: EventEmitter<boolean> = new EventEmitter();
  navigationEvent: EventEmitter<string> = new EventEmitter();
  gotUserDetailsStatusEvent: EventEmitter<
    UserDetailsStatusModel
  > = new EventEmitter();
  matchingCompleteEvent: EventEmitter<boolean> = new EventEmitter();
  updatedUserInfoEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    http: HttpClient,
    logger: LoggerService,
    storage: StorageService,
    router: Router,
    errorModService: ErrorModalService
  ) {
    super(http, logger, storage, router, errorModService);
  }

  tableClassConstants: { [key: string]: string } = {
    Names: "names",
    BirthdayGender: "user_details",
    Relatives: "relatives",
    Phones: "phones",
    Addesses: "addresses",
  };

  /**
   * Gets the user's profile information corresponding to a particular table
   * @param table One of the constants in
   * [tableClassConstants]{@link ProfileService#tableClassConstants}.
   */
  getUserDetails(table: string): Observable<UserDetailsGETAPIArgs> {
    let options = new TokenServiceRequestOptions({
      url: "user",
      data: { table: table },
    });
    return this.postInject(this.get(options), res => {
      this.runGetUserDetailsStatusEvent();
      return res;
    });
  }

  /**
   * Delete a particular profle item
   * @param id The id of the item to delete
   * @param table One of the constants in
   * [tableClassConstants]{@link ProfileService#tableClassConstants}.
   */
  deleteUserDetails(
    id: number,
    table: string
  ): Observable<UserDetailsPOSTAPIArgs> {
    let data: UserDetailsDELETEAPIRequestArgs = {
      table_name: table,
      _id: id,
    };

    let options = new TokenServiceRequestOptions({
      url: "user",
      data: data,
    });
    return this.delete(options);
  }

  /**
   * Add a particular profile item
   * @param details The data for the item to be added to the user's profile
   * @param table One of the constants in
   * [tableClassConstants]{@link ProfileService#tableClassConstants}.
   */
  addUserDetails(
    details: UserDetailsPOSTArgs,
    table: string
  ): Observable<UserDetailsPOSTAPIArgs> {
    let data: UserDetailsPOSTAPIRequestArgs = {
      data: details,
      table_name: table,
    };

    let options = new TokenServiceRequestOptions({
      url: "user",
      data: data,
    });
    return this.post(options);
  }

  /**
   * Gets the status of each profile page, which is used to enable navigation
   */
  getUserDetailsStatus(): Observable<UserDetailsStatusModel> {
    let options = new TokenServiceRequestOptions({
      url: "user/status",
    });
    return this.postInject(
      this.get(options),
      (res: UserDetailsStatusAPIArgs) => {
        return new UserDetailsStatusModel(res);
      }
    );
  }

  runGetUserDetailsStatusEvent(): void {
    this.getUserDetailsStatus().subscribe((result: UserDetailsStatusModel) => {
      this.gotUserDetailsStatusEvent.emit(result);
    });
  }

  /**
   * Gets follow up questions for associates/family
   * @param count How many questions to get
   * @param alreadyGottenItems List of items which should not be included in questions
   */
  getAssociatesQuestions(
    count: number,
    alreadyGottenItems: string[]
  ): Observable<AssociatesQuestionsModel> {
    let data: FollowUpQuestionsGETRequestArgs = {
      count: count,
      items_in_view: alreadyGottenItems,
    };
    let options = new TokenServiceRequestOptions({
      url: "questions/associates",
      data: data,
    });
    return this.postInject(
      this.get(options),
      (res: AssociatesFollowUpQuestionsGETAPIArgs) => {
        return new AssociatesQuestionsModel(res);
      }
    );
  }

  /**
   * Store responses to follow up questions for associates/family
   * @param data The responses to questions
   */
  sendAssociatesQuestionsResponses(
    data: AssociateFollowUpQuestionsPOSTAPIArgs
  ): Observable<QuestionAnswerResponseModel> {
    let options = new TokenServiceRequestOptions({
      url: "questions/associates",
      data: data,
    });
    return this.postInject(
      this.post(options),
      (res: FollowUpQuestionsPOSTResponseArgs) => {
        this.emitProfileUpdatedEvent();
        return new QuestionAnswerResponseModel(res);
      }
    );
  }

  /**
   * Gets follow up questions for phone numbers
   * @param count Number of questions to get
   */
  getPhonesQuestions(count: number): Observable<ProfileQuestionsModel> {
    let data: FollowUpQuestionsGETRequestArgs = {
      count: count,
    };
    let options = new TokenServiceRequestOptions({
      url: "questions/phones",
      data: data,
    });
    return this.postInject(
      this.get(options),
      (res: FollowUpQuestionsGETAPIArgs) => {
        return new ProfileQuestionsModel(res);
      }
    );
  }

  /**
   * Stores answers to follow up questions for phone numbers
   * @param data The responses to questions
   */
  sendPhonesQuestionsResponses(
    data: PhoneFollowUpQuestionsPOSTAPIArgs
  ): Observable<QuestionAnswerResponseModel> {
    let options = new TokenServiceRequestOptions({
      url: "questions/phones",
      data: data,
    });
    return this.postInject(
      this.post(options),
      (res: FollowUpQuestionsPOSTResponseArgs) => {
        this.emitProfileUpdatedEvent();
        return new QuestionAnswerResponseModel(res);
      }
    );
  }

  /**
   * Gets follow up questions for prior addresses
   * @param count Number of questions to get
   */
  getAddressQuestions(count: number): Observable<ProfileQuestionsModel> {
    let data: FollowUpQuestionsGETRequestArgs = {
      count: count,
    };
    let options = new TokenServiceRequestOptions({
      url: "questions/addresses",
      data: data,
    });
    return this.postInject(
      this.get(options),
      (res: FollowUpQuestionsGETAPIArgs) => {
        return new ProfileQuestionsModel(res);
      }
    );
  }

  /**
   * Store answers to follow up questions on prior addresses
   * @param data The answers to address questions
   */
  sendAddressQuestionsResponses(
    data: AddressFollowUpQuestionsPOSTAPIArgs
  ): Observable<QuestionAnswerResponseModel> {
    let options = new TokenServiceRequestOptions({
      url: "questions/addresses",
      data: data,
    });
    return this.postInject(
      this.post(options),
      (res: FollowUpQuestionsPOSTResponseArgs) => {
        this.emitProfileUpdatedEvent();
        return new QuestionAnswerResponseModel(res);
      }
    );
  }

  setInputForm(form: FormGroup): void {
    this.inputForm = form;
  }

  /**
   * Tries to navigate to passed URL, but if there are unsaved inputs on the page
   * then will instead emit an event for that.
   * @param url Url to navigate to.
   */
  navigateProfile(url: string): void {
    if (this.inputForm == null || this.inputForm.pristine) {
      this.navigationEvent.emit(url);
      this.router.navigate([url]);
    } else {
      this.unSavedInputNavEvent.emit(true);
    }
  }

  setNavigationPage(url: string): void {
    let regex = "\/dashboard\/profile\/[a-zA-Z]*\?.*$";
    let urlKey = url.match(regex);
    this.navigationEvent.emit(urlKey[0]);
  }

  // Needed to set active url first time user accesses page to allow redirecting
  // if a user types a page they aren't supposed to access yet.
  setCurrentNavigationPage(): void {
    this.setNavigationPage(this.router.url);
  }

  sendMatchingCompleteEvent(): void {
    this.matchingCompleteEvent.emit(true);
  }

  /**
   * Checks whether claims are currently being matched for the user.
   */
  checkClaimsMatching(): Observable<MatchingInProgressModel> {
    let data = { match_type: "claim" };
    let options = new TokenServiceRequestOptions({
      url: "user/match/check",
      data: data,
    });
    return this.postInject(
      this.post(options),
      (res: MatchingInProgressAPIArgs) => {
        return new MatchingInProgressModel(res);
      }
    );
  }

  emitProfileUpdatedEvent() {
    this.updatedUserInfoEvent.emit();
  }
}
