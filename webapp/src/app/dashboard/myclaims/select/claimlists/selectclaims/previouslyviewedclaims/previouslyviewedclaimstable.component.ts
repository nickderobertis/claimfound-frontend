import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { SelectClaimTableBaseComponent } from "../../base-table.component";
import { SelectClaimsTable } from "../../../selectclaimstable.model";
import { LoggerService } from "src/app/global/logger.service";
import { SelectClaimsService } from "../../../selectclaims.service";
import { EventTrackerService } from "../../../../../../global/services/event-tracker/event-tracker.service";

declare let env: any;

/**
 * The component on the select claims page which shows the claims which the user
 * has previously viewed.
 *
 * The individual rows of the table are delegated to
 * [SelectClaimTableRowComponent]{@link SelectClaimTableRowComponent}. The page
 * selection is handled by [PageSelectComponent]{@link PageSelectComponent}.
 */
@Component({
  selector: "cf-previously-viewed-claims-table",
  templateUrl: "./previouslyviewedclaimstable.component.html",
  styleUrls: [
    "../../../../../../global/css/normalize.scss",
    "../../../../../../global/css/webflow.scss",
    "../selectclaimtable.component.scss",
    "./previouslyviewedhidden.scss",
  ],
})
export class PreviouslyViewedClaimsTableComponent
  extends SelectClaimTableBaseComponent
  implements OnInit, OnDestroy {
  gotPreviouslyViewedClaimsEvent$: Subscription;
  private isHidden: boolean = true;

  constructor(
    protected eventTrackerService: EventTrackerService,
    public logger: LoggerService,
    public selectClaimsService: SelectClaimsService
  ) {
    super(eventTrackerService, logger, selectClaimsService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.gotPreviouslyViewedClaimsEvent$ = this.selectClaimsService.gotPreviouslyViewedClaimsEvent.subscribe(
      (result: SelectClaimsTable) => {
        this.onGetClaimsSuccess(result);
      }
    );
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.gotPreviouslyViewedClaimsEvent$.unsubscribe();
  }

  pageSelected(pageNumber: number) {
    super.pageSelected(pageNumber, "PrevClaimsView");
  }

  requestClaims(offset: number) {
    offset = offset - this.numberOfLowerPageNumberClaimsSelectedThisSession();
    this.selectClaimsService.getPreviouslyViewedClaims(
      offset,
      this.itemsPerPage,
      this.claimCache
    );
  }

  stopHiding() {
    this.isHidden = false;
    if (env.CF_ANALYTICS_FE) {
      this.eventTrackerService.triggerEvent("prevViewedClaims", {
        data: null,
      });
    }
  }
}
