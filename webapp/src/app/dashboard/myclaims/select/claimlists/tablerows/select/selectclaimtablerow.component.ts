import { Component, Input, Output, EventEmitter } from "@angular/core";

import { SelectClaimsTableRow } from "../../../selectclaimstable.model";
import { EventTrackerService } from "../../../../../../global/services/event-tracker/event-tracker.service";

declare let env: any;

/**
 * An individual row of the tables on the select claims pages which allow the user to
 * select claims (new claims table and previously viewed claims table).
 */
@Component({
  selector: "cf-select-claim-table-row",
  templateUrl: "./selectclaimtablerow.component.html",
  styleUrls: [
    "../../../../../../global/css/normalize.scss",
    "../../../../../../global/css/webflow.scss",
    "./selectclaimtablerow.component.scss",
  ],
})
export class SelectClaimTableRowComponent {
  @Input() model: SelectClaimsTableRow;
  @Output() claimSelected: EventEmitter<string> = new EventEmitter();
  @Output() claimDeselected: EventEmitter<string> = new EventEmitter();
  constructor(private eventTrackerService: EventTrackerService) {}

  onClaimSelect(): void {
    if (!this.model.updating) {
      if (!this.model.isSelected) {
        this.claimSelected.emit(this.model.claimId);
        if (env.CF_ANALYTICS_FE) {
          this.eventTrackerService.triggerEvent("selectClaim", {
            claim_id: this.model.claimId,
          });
        }
      } else {
        this.claimDeselected.emit(this.model.claimId);
      }
    }
  }

  get rowClass() {
    if (this.model.isSelected) {
      return "selected";
    } else {
      return "";
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
