/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { Component, OnInit, OnDestroy } from "@angular/core";
import { LoggerService, log } from "../../global/logger.service";
import { Subscription } from "rxjs";
import { Name } from "../../global/models/name.model";
import { NameArgs } from "../../global/api/interfaces/general/name.interface";

import { PropertySearchService } from "./propertysearch.service";
import { NameCheckModel } from "./models/name-check.model";
import { SearchWrapperModel } from "./models/search-wrapper.model";
import { DisplayContainerModel } from "./models/displaycontainer.model";
import { StateWiseSplit } from "./models/state-wise-split.model";
/**
 * A subcomponent of the property search which is a wrapper around all the displayed
 * results from the search.
 */
@Component({
  selector: "cf-display-container",
  templateUrl: "./displaycontainer.component.html",
  styleUrls: [
    "../../global/css/normalize.scss",
    "../../global/css/webflow.scss",
    "./displaycontainer.component.scss",
    "./displayvalidationmessage.scss",
  ],
})
export class DisplayContainerComponent implements OnInit, OnDestroy {
  private resultDataSub: Subscription;
  private anyClaims: boolean = false;
  private name: Name;
  private numberOfClaims: number;
  private model: DisplayContainerModel;
  display: boolean = false;
  loading: boolean = false;

  constructor(
    private searchService: PropertySearchService,
    private logger: LoggerService
  ) {}

  resetData() {
    this.anyClaims = false;
    this.display = false;
    this.loading = false;
  }

  ngOnInit() {
    this.resultDataSub = this.searchService.searchResult$.subscribe(
      (result: DisplayContainerModel) => {
        this.updateModel(result);
      }
    );

    this.resetData();
  }

  ngOnDestroy() {
    if (this.resultDataSub) {
      this.resultDataSub.unsubscribe();
    }
  }

  updateModel(result: DisplayContainerModel) {
    // either loading or has results
    this.resetData();
    if (result.loading) {
      this.loading = result.loading;

      return;
    }

    // Else, found non-empty, non-loading object, so data has finished loading
    this.initializeDisplayContainer(result);
  }

  initializeDisplayContainer(result: DisplayContainerModel) {
    this.model = result;

    let nameArgs: NameArgs = {
      first_name: result.firstName,
      last_name: result.lastName,
    };
    this.name = new Name(nameArgs);
    this.numberOfClaims = result.numberOfClaims;

    if (this.numberOfClaims > 0) {
      this.anyClaims = true;
    }
    this.loading = false;
    this.display = true;
  }

  get signUpText(): string {
    if (this.anyClaims) {
      return "Sign up to review your claims and recover your lost money for free!";
    } else {
      return "Sign up for free claim monitoring so we can alert you if you ever have any lost money!";
    }
  }

  get showReferralBar(): boolean {
    return this.anyClaims && !this.model.searchingForSelf;
  }

  get tipHeader(): string {
    if (this.anyClaims) {
      return "Claimfound Challenge";
    } else {
      return "Tip";
    }
  }

  get tipBodyText(): string {
    if (this.anyClaims) {
      return "We bet you can find 3 more people that have lost money.";
    } else {
      return "Try searching for different variations of the name like alternative spellings, maiden names, etc...";
    }
  }
}
