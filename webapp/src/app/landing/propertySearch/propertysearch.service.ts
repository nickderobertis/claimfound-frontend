/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject, from, Observable } from "rxjs";

import { LoggerService } from "../../global/logger.service";
import { StorageService } from "../../global/storage.service";
import { BaseService, ServiceRequestOptions } from "../../global/base.service";
import { ErrorModalService } from "../../error-modal/errormodal.service";

import { PropertySearchModel } from "./models/property-search.model";
import { SupportedStatesModel } from "./models/supported-states.model";
import { SupportedStatesModelsArgs } from "../../global/api/interfaces/general/supported-states.interface";
import { NameCheckApiArgs } from "src/app/global/api/interfaces/general/name-check.interface";
import { NameCheckModel } from "./models/name-check.model";
import { DisplayContainerModel } from "./models/displaycontainer.model";
import { MockSearchService } from "./mock-search.service";
/**
 * The service powering the property search where the user can look up claim totals for a name
 */
@Injectable()
export class PropertySearchService extends BaseService {
  //Observable source
  private searchResultSource = new BehaviorSubject<DisplayContainerModel>(
    new DisplayContainerModel()
  );
  //Observable stream
  public searchResult$ = this.searchResultSource.asObservable();

  constructor(
    http: HttpClient,
    logger: LoggerService,
    storage: StorageService,
    router: Router,
    errorModService: ErrorModalService,
    public mock: MockSearchService
  ) {
    super(http, logger, storage, router, errorModService);
  }

  /**
   * Send a name search to the backend and get claim totals
   * @param modelData The user's name and states
   * @param searchingForSelf Whether the user is searching for themselves, from the dropdown
   */
  submitSearch(modelData: PropertySearchModel): Observable<NameCheckModel> {
    if (modelData.searchingFor) {
      this.storage.write("cf-user-name", modelData.firstName);
      this.storage.write("cf-user-last-name", modelData.lastName);
    }

    return this.mock.search(modelData);
  }

  /**
   * Pushes an event that enables display of results
   * @param resultData Claim totals results
   */
  pushSearch(resultData: DisplayContainerModel) {
    this.logger.debug(
      "Pushing results from property search to PropertySearchService.searchResult$",
      resultData
    );
    this.searchResultSource.next(resultData);
  }

  /**
   * Gets states in wihch the user can search to update the state dropdown
   */
  getSupportedStates(): Observable<SupportedStatesModel> {
    let options = new ServiceRequestOptions({
      url: "supported-states",
    });

    const supportedStatesData: SupportedStatesModelsArgs = {
      supportedStates: ["FL"],
      allStates: ["FL"],
      state_code_to_state: { FL: "Florida" },
    };

    return from([new SupportedStatesModel(supportedStatesData)]);
  }
}
