import { Component, OnInit, Input } from "@angular/core";

import { LoggerService } from "../../../../../../global/logger.service";

import { ClaimStatusModel } from "../../../../models/claimstatus.model";

/**
 * The component on the submitted claims page which shows the claim status text for an individual
 * claim submitted to an individual state.
 */
@Component({
  selector: "cf-state-claim-row",
  templateUrl: "./stateclaimrow.component.html",
  styleUrls: [
    "../../../../../../global/css/normalize.scss",
    "../../../../../../global/css/webflow.scss",
    "./stateclaimrow.component.scss",
  ],
})
export class StateClaimRowComponent {
  @Input() model: ClaimStatusModel;
  @Input() colorArg: string;

  constructor(private logger: LoggerService) {}

  getStepDate(index: number): string {
    return this.model.stepDates[index];
  }

  getLastStepDate(): string {
    return this.model.stepDates[this.model.stepDates.length - 1];
  }

  get stepsFromIndexOne(): string[] {
    return this.model.stepDates.slice(2);
  }
}
