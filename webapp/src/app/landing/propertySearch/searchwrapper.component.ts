/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import {
  Component,
  ViewChildren,
  QueryList,
  ElementRef,
  OnInit,
} from "@angular/core";

import { LoggerService } from "../../global/logger.service";

import { EventTrackerService } from "../../global/services/event-tracker/event-tracker.service";
import { ErrorModalService } from "../../error-modal/errormodal.service";
import { SupportedStatesModel } from "./models/supported-states.model";
import { PropertySearchService } from "./propertysearch.service";
import { SearchDivComponent } from "./searchdiv.component";
import { CFError } from "src/app/global/error.service";
import { NameCheckModel } from "./models/name-check.model";
import { SearchWrapperModel } from "./models/search-wrapper.model";
import { DropDownModel } from "src/app/global/components/dropdown/dropdown.model";
import { DisplayContainerModel } from "./models/displaycontainer.model";
import { SignUpModalService } from "src/app/loginsignup/signup/sign-up-modal.service";
declare let env: any;
declare var $: any;

/**
 * A subcomponent of the property search which is a wrapper around the search fields and button
 */
@Component({
  selector: "cf-search-wrapper",
  templateUrl: "./searchwrapper.component.html",
  styleUrls: [
    "../../global/css/normalize.scss",
    "../../global/css/webflow.scss",
    "./searchwrapper.component.scss",
    "./displayvalidationmessage.scss",
  ],
})
export class SearchWrapperComponent implements OnInit {
  private disableButton: boolean = false;
  private hasSelectedRelationship: boolean = false;
  private relationship: string = "self";
  errorMessage: string;
  fields: string[] = ["firstName", "lastName"];
  inputIds: string[] = [
    "property-search-first-name",
    "property-search-last-name",
  ];

  supportedStatesLoaded: boolean = false;
  supportedStatesLoading: boolean = true;

  swm: SearchWrapperModel = new SearchWrapperModel();

  @ViewChildren(SearchDivComponent)
  searchDivComponents: QueryList<SearchDivComponent>;

  constructor(
    private logger: LoggerService,
    private searchService: PropertySearchService,
    private eventTrackerService: EventTrackerService,
    private signUpModalService: SignUpModalService,
    private _elref: ElementRef, // Referance to component html
    private errorModal: ErrorModalService
  ) {}

  get isClickable(): boolean {
    return !this.disableButton;
  }

  ngOnInit() {
    this.searchService.getSupportedStates().subscribe(
      (result: SupportedStatesModel) => {
        this.swm.populateSupportedStates(result);
        this.supportedStatesLoaded = true;
        this.supportedStatesLoading = false;
      },
      (error: CFError) => this.handleSupportedStatesError(error)
    );
  }

  setSelectedStates(states: string[]) {
    this.swm.searchModel.states = states;
  }

  submitSearch(event: any) {
    this.toggleClick();

    // multi state
    if (!this.swm.searchModel.states) {
      this.swm.searchModel.states = [];
    }

    if (!this._validate()) {
      this.errorMessage = this._missingAttributeMessage();
      this.toggleClick();

      return;
    }
    this.errorMessage = null;

    this.emitLoading();
    this.searchService.submitSearch(this.swm.searchModel).subscribe(
      (result: NameCheckModel) => {
        this.emitSearchResult(result);
      },
      (error: CFError) => this.handleSubmitSearchError(error)
    );
  }

  private _validate(): boolean {
    if (!this.hasSelectedRelationship) {
      return false;
    }

    if (this.swm.searchModel.states.length === 0) {
      return false;
    }

    let firstName = (this.swm.searchModel.firstName || "").trim();

    let lastName = (this.swm.searchModel.lastName || "").trim();
    if (!firstName && !lastName) {
      return false;
    }

    return true;
  }

  private _missingAttributeMessage(): string {
    if (!this.hasSelectedRelationship) {
      return "Please select someone to search for to see if they have any money.";
    }

    if (this.swm.searchModel.states.length === 0) {
      return "Please select a state to search for your unclaimed money.";
    }

    let firstName = (this.swm.searchModel.firstName || "").trim();

    let lastName = (this.swm.searchModel.lastName || "").trim();
    if (!firstName && !lastName) {
      return "Please enter first or last name to search for unclaimed money.";
    }
    return "";
  }

  emitSearchResult(result: NameCheckModel) {
    this.logger.debug("Emitting search result from SearchWrapperComponent");
    this.swm.initializeNameCheckModel(result);
    const display = new DisplayContainerModel(this.swm);
    this.searchService.pushSearch(display);
    this.toggleClick();
    if (!env.CF_ANALYTICS_FE) {
      // return;
    }

    let eventData = {
      firstName: this.swm.searchModel.firstName,
      lastName: this.swm.searchModel.lastName,
      claimCount: result.numberOfClaims,
      totalAmount: result.totalValue,
      searchingFor: this.relationship,
    };

    this.eventTrackerService.triggerEvent("propertySearch", eventData);
  }

  emitLoading() {
    this.logger.debug(
      "Emitting loading object (trigger for loading animation) from SearchWrapperComponent"
    );
    this.searchService.pushSearch(new DisplayContainerModel());
  }

  handleSubmitSearchError(error: CFError) {
    this.handleError(error);
    this.toggleClick();
    this.searchService.pushSearch(new DisplayContainerModel());
  }

  handleSupportedStatesError(error: CFError) {
    this.handleError(error);
    this.supportedStatesLoading = false;
  }

  handleError(error: CFError) {
    this.errorMessage = error.displayMessage;
  }

  toggleClick() {
    this.disableButton = !this.disableButton;
  }

  onRelationshipSelect(searchingForArr: string[]) {
    if (searchingForArr.length == 0) {
      // didn't actually make any selections
      this.hasSelectedRelationship = false;
      return;
    }
    let searchingFor = searchingForArr[0];
    if (searchingFor == "Myself") {
      this.swm.searchModel.searchingFor = true;
    } else {
      this.swm.searchModel.searchingFor = false;
    }
    this.hasSelectedRelationship = true;
    this.relationship = searchingFor;
  }

  showSignUpModal(event: MouseEvent) {
    this.logger.debug("emitting showSignUpModal from landing header");
    this.signUpModalService.showSignUpModal();
  }
}
