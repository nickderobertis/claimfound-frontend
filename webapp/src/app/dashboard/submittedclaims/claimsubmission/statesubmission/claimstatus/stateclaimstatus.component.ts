import { Component, Input, ViewEncapsulation } from "@angular/core";

import { LoggerService } from "../../../../../global/logger.service";

import { ClaimStatusModel } from "../../../models/claimstatus.model";
import { StateSubmissionsModel } from "../../../models/statesubmissions.model";
import { StateStepModel } from "../../../models/statestep.model";

/**
 * The component on the submitted claims page which shows the current status of submitted claims for a given state
 * by checking with the state system.
 *
 * Directly contains the step headers and the tooltip explaining the steps. Offloads the progress bars to
 * [StateClaimBarComponent]{@link StateClaimBarComponent} and text status to [StateClaimRowComponent]{@link StateClaimRowComponent}.
 *
 * Subcomponents:
 * * [StateClaimBarComponent]{@link StateClaimBarComponent}
 * * [StateClaimRowComponent]{@link StateClaimRowComponent}
 */
@Component({
  selector: "cf-state-claim-status",
  templateUrl: "./stateclaimstatus.component.html",
  styleUrls: [
    "../../../../../global/css/normalize.scss",
    "../../../../../global/css/webflow.scss",
    "./stateclaimstatus.component.scss",
  ],
})
export class StateClaimStatusComponent {
  @Input() model: StateSubmissionsModel;

  Colors: string[] = [
    "#4ED9BA",
    "#4E79BA",
    "#9E9FA3",
    "#E39898",
    "#FCD790",
    "#31BBF0",
  ];

  constructor(private logger: LoggerService) {}

  get claimStepsFromIndexOne(): StateStepModel[] {
    return this.model.stateSteps.slice(1);
  }

  getWidthFromCurrentStep(claimStatus: ClaimStatusModel): string {
    let progress: number =
      (claimStatus.currentStepIndex / (this.model.stateSteps.length - 1)) * 100;
    return progress.toString() + "%";
  }

  getColorFromIndex(index: number): string {
    return this.Colors[index];
  }
}
