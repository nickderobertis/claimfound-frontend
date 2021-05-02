import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

import { LoggerService } from "../../../global/logger.service";

import { RelativeClaimsEndpointModel } from "../models/user-relative-claims.model";
import { RelativeClaimsService } from "../relativeclaims.service";
import { RelativeClaimsTotalsAPIArgs } from "../../../global/api/interfaces/endpoints/relative-claims/totals.interface";
import { CFError } from "src/app/global/error.service";
import { RelativeClaimsAggregateModel } from "../models/user-relatives-claimtotals-aggregate.model";
import { RelativeClaimsModel } from "../models/relative-claims.model";

/**
 * This is the main page component for the family claims page.
 *
 * This component directly interacts with the service to feed data into subcomponents.
 *
 * Subcomponents:
 * * [RelativePanelComponent]{@link RelativePanelComponent}
 * * [DeceasedClaimsWidgetComponent]{@link DeceasedClaimsWidgetComponent}
 */
@Component({
  selector: "cf-family-claims-page",
  templateUrl: "./familyclaimspage.component.html",
  styleUrls: [
    "../../../global/css/normalize.scss",
    "../../../global/css/webflow.scss",
    "./familyclaimspage.component.scss",
  ],
})
export class FamilyClaimsComponent implements OnInit {
  model: RelativeClaimsEndpointModel = new RelativeClaimsEndpointModel({
    relatives: [],
  } as RelativeClaimsTotalsAPIArgs);
  widgetModel: RelativeClaimsAggregateModel = new RelativeClaimsAggregateModel();
  modalModel: RelativeClaimsModel;
  loading: boolean = true;

  showClaimAddedModal = false;

  constructor(
    private relativeClaimsService: RelativeClaimsService,
    private logger: LoggerService
  ) {}

  ngOnInit() {
    this.getRelativeClaimsAggregates();
    this.getRelativeClaims();
  }

  getRelativeClaims() {
    this.relativeClaimsService.getRelativeClaims().subscribe(
      (result) => {
        this.setModelFromResult(result);
      },
      (error: CFError) => this.handleGetRelativeClaimsError(error)
    );
  }

  getRelativeClaimsAggregates() {
    this.relativeClaimsService.getRelativeClaimsAggregates().subscribe(
      (result) => {
        this.setWidgetModelFromResult(result);
      },
      (error) => this.handleGetRelativeClaimsError(error)
    );
  }

  handleGetRelativeClaimsError(error: CFError) {
    this.logger.error("Error getting relative claims:" + error.toString());
  }

  setModelFromResult(resultModel: RelativeClaimsEndpointModel) {
    this.loading = false;
    this.model = resultModel;
  }

  setWidgetModelFromResult(resultModel: RelativeClaimsAggregateModel) {
    this.widgetModel = resultModel;
    this.loading = false;
  }

  get checkIfAnyDeceasedAndHeir(): boolean {
    for (let relative of this.model.relativeClaims) {
      if (
        relative.relativeClaimsQuestions.deceased &&
        (relative.relativeClaimsQuestions.userIsHeir == "True" ||
          relative.relativeClaimsQuestions.userIsHeir == "unsure")
      ) {
        return true;
      }
    }
    return false;
  }

  checkIfShouldShow(relative: RelativeClaimsModel): boolean {
    if (
      !relative.relativeClaimsQuestions.deceased ||
      (relative.relativeClaimsQuestions.deceased &&
        relative.relativeClaimsQuestions.userIsHeir != "True")
    ) {
      return true;
    }
    return false;
  }

  openClaimAddedToDashboardModal(relative: RelativeClaimsModel) {
    this.modalModel = relative;
    this.showClaimAddedModal = true;
    this.getRelativeClaimsAggregates();
  }

  closeClaimsAddedModal() {
    this.showClaimAddedModal = false;
  }
}
