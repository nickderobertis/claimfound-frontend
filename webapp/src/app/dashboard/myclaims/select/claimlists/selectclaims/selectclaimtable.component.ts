import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { SelectClaimsTable } from "../../selectclaimstable.model";
import { SelectClaimTableBaseComponent } from "../base-table.component";
import { LoggerService } from "src/app/global/logger.service";
import { SelectClaimsService } from "../../selectclaims.service";
import { EventTrackerService } from "src/app/global/services/event-tracker/event-tracker.service";

/**
 * The component on the select claims page which shows the new claims for the
 * user to review and select, and allows the user to click to select them.
 *
 * The individual rows are handled by
 * [SelectClaimTableRowComponent]{@link SelectClaimTableRowComponent}. The page
 * selection is handled by [PageSelectComponent]{@link PageSelectComponent}.
 */
@Component({
  selector: "cf-select-claim-table",
  templateUrl: "./selectclaimtable.component.html",
  styleUrls: [
    "../../../../../global/css/normalize.scss",
    "../../../../../global/css/webflow.scss",
    "./selectclaimtable.component.scss",
  ],
})
export class SelectClaimTableComponent extends SelectClaimTableBaseComponent
  implements OnInit, OnDestroy {
  gotNewMatchingClaimsEvent$: Subscription;

  constructor(
    protected eventTrackerService: EventTrackerService,
    public logger: LoggerService,
    public selectClaimsService: SelectClaimsService
  ) {
    super(eventTrackerService, logger, selectClaimsService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.gotNewMatchingClaimsEvent$ = this.selectClaimsService.gotNewMatchingClaimsEvent.subscribe(
      (result: SelectClaimsTable) => {
        this.onGetClaimsSuccess(result);
      }
    );
  }

  pageSelected(pageNumber: number) {
    super.pageSelected(pageNumber, "SelectClaimsView");
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.gotNewMatchingClaimsEvent$.unsubscribe();
  }

  requestClaims(offset: number) {
    offset = offset - this.numberOfLowerPageNumberClaimsSelectedThisSession();
    this.selectClaimsService.getNewMatchingClaims(
      offset,
      this.itemsPerPage,
      this.claimCache
    );
  }
}
