import { Component, Input, Output, EventEmitter } from "@angular/core";

import { SelectClaimsTableRow } from "../../../selectclaimstable.model";
import { EventTrackerService } from "../../../../../../global/services/event-tracker/event-tracker.service";

declare let env: any;

/**
 * An individual row of the currently selected claims table which allows the user
 * to remove the claim.
 */
@Component({
  selector: "cf-remove-claim-table-row",
  templateUrl: "./removeclaimtablerow.component.html",
  styleUrls: [
    "../../../../../../global/css/normalize.scss",
    "../../../../../../global/css/webflow.scss",
    "./removeclaimtablerow.component.scss",
  ],
})
export class RemoveClaimTableRowComponent {
  @Input() model: SelectClaimsTableRow;
  @Output() claimRemoved: EventEmitter<string> = new EventEmitter();

  constructor(private eventTrackerService: EventTrackerService) {}

  onClaimRemoved(): void {
    if (!this.model.updating) {
      this.claimRemoved.emit(this.model.claimId);
      if (env.CF_ANALYTICS_FE) {
        this.eventTrackerService.triggerEvent("removeClaim", {
          data: null,
        });
      }
    }
  }

  get buttonClass() {
    if (this.model.updating) {
      return "selectclaims-table-rowselectdiv-updating";
    } else {
      return "selectclaims-table-rowselectdiv";
    }
  }
}
