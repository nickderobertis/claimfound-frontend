import { Component, OnInit } from "@angular/core";

import { LoggerService } from "../../../global/logger.service";

import { RelativeClaimsAggregateModel } from "../models/user-relatives-claimtotals-aggregate.model";
import { RelativeClaimsService } from "../relativeclaims.service";
import { CFError } from "src/app/global/error.service";

/**
 * The widget which shows both family claims and deceased claims totals, and has links to navigate.
 *
 * Currently used on the My Claims page as the way to navigate to the family and deceased claims pages.
 *
 * This component handles interacting with the service to get the data and feeds it into the subcomponents.
 *
 * Subcomponents:
 * * [DeceasedClaimsWidgetComponent]{@link DeceasedClaimsWidgetComponent}
 * * [FamilyClaimsWidgetComponent]{@link FamilyClaimsWidgetComponent}
 */
@Component({
  selector: "cf-relative-claims-widget-container",
  templateUrl: "./relativeclaimswidgetcontainer.component.html",
  styleUrls: [
    "../../../global/css/normalize.scss",
    "../../../global/css/webflow.scss",
    "./relativeclaimswidgetcontainer.component.scss",
  ],
})
export class RelativeClaimsWidgetContainerComponent implements OnInit {
  model: RelativeClaimsAggregateModel = new RelativeClaimsAggregateModel();
  loading: boolean = true;

  constructor(
    private relativeClaimsService: RelativeClaimsService,
    private logger: LoggerService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.relativeClaimsService.getRelativeClaimsAggregates().subscribe(
      (result) => {
        this.setModelFromResult(result);
      },
      (error: CFError) => this.handleGetRelativeClaimsError(error)
    );
  }

  handleGetRelativeClaimsError(error: CFError) {
    this.logger.error("Error getting relative claims: " + error.toString());
  }

  setModelFromResult(resultModel: RelativeClaimsAggregateModel) {
    this.model = resultModel;
    this.loading = false;
  }

  get displayDeceasedRelativeClaimsWidget(): boolean {
    return (
      this.model.deceasedTotalsModel.hasDeadRelatives &&
      (!this.model.deceasedTotalsModel.allDeceasedQuestionsAnswered ||
        this.model.deceasedTotalsModel.aggregateClaimsTotalModel
          .numberOfClaims > 0)
    );
  }
}
