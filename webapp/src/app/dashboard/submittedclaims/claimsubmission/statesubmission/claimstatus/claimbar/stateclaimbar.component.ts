import { Component, OnInit, Input } from "@angular/core";

import { LoggerService } from "../../../../../../global/logger.service";

/**
 * The component on the submitted claims page which shows the progress bar for an individual claim
 * submitted to an individual state.
 */
@Component({
  selector: "cf-state-claim-bar",
  templateUrl: "./stateclaimbar.component.html",
  styleUrls: [
    "../../../../../../global/css/normalize.scss",
    "../../../../../../global/css/webflow.scss",
    "./stateclaimbar.component.scss",
  ],
})
export class StateClaimBarComponent {
  @Input() widthArg: number;
  @Input() colorArg: string;

  constructor(private logger: LoggerService) {}
}
