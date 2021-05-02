import { Component, OnInit } from "@angular/core";

import { LoggerService } from "../../../../../global/logger.service";
import { SelectClaimsService } from "../../selectclaims.service";
import { SelectClaimsTable } from "../../selectclaimstable.model";

/**
 * The component on the select claims page which shows the total number and value
 * of the currently selected claims.
 */
@Component({
  selector: "cf-selected-claims-totals-widget",
  templateUrl: "./selectedclaimstotals.component.html",
  styleUrls: [
    "../../../../../global/css/normalize.scss",
    "../../../../../global/css/webflow.scss",
    "./selectedclaimstotals.component.scss",
  ],
})
export class SelectedClaimsTotalsWidgetComponent implements OnInit {
  selectedClaimsModel: SelectClaimsTable;
  loading: boolean = true;

  constructor(
    private logger: LoggerService,
    private selectClaimsService: SelectClaimsService
  ) {}

  ngOnInit(): void {
    this.selectClaimsService.gotSelectedClaimsEvent.subscribe(
      (result: SelectClaimsTable) => {
        this.onGotSelectedClaimsEvent(result);
      }
    );
  }

  onGotSelectedClaimsEvent(selectedClaims: SelectClaimsTable): void {
    this.selectedClaimsModel = selectedClaims;
    this.loading = false;
  }

  get totalNumberOfClaims(): number {
    if (this.selectedClaimsModel != null) {
      return this.selectedClaimsModel.totalNumberOfClaims;
    } else {
      return 0;
    }
  }

  get totalValueOfClaims(): string {
    if (this.selectedClaimsModel != null) {
      return this.selectedClaimsModel.formattedTotalValueOfClaims;
    } else {
      return "$0.00";
    }
  }
}
