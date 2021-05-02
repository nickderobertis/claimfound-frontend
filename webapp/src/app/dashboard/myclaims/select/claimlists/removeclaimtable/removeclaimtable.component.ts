import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { SelectClaimsTable } from "../../selectclaimstable.model";
import { SelectClaimTableBaseComponent } from "../base-table.component";
import { log, LoggerService } from "src/app/global/logger.service";
import { SelectClaimsService } from "../../selectclaims.service";
import { EventTrackerService } from "src/app/global/services/event-tracker/event-tracker.service";

/**
 * The table on the select claims page which displays the currently selected
 * claims and allows the user to remove them.
 *
 * The individual rows are handled by
 * [RemoveClaimTableRowComponent]{@link RemoveClaimTableRowComponent}. The page
 * selection is handled by [PageSelectComponent]{@link PageSelectComponent}.
 */
@Component({
  selector: "cf-remove-claim-table",
  templateUrl: "./removeclaimtable.component.html",
  styleUrls: [
    "../../../../../global/css/normalize.scss",
    "../../../../../global/css/webflow.scss",
    "./removeclaimtable.component.scss",
  ],
})
export class RemoveClaimTableComponent extends SelectClaimTableBaseComponent
  implements OnInit, OnDestroy {
  model: SelectClaimsTable;

  gotSelectedClaimsEvent$: Subscription;
  beganClaimRemoveEvent$: Subscription;
  cancelledClaimRemoveEvent$: Subscription;

  constructor(
    protected eventTrackerService: EventTrackerService,
    public logger: LoggerService,
    public selectClaimsService: SelectClaimsService
  ) {
    super(eventTrackerService, logger, selectClaimsService);
  }

  get hasItems(): boolean {
    return this.model.totalNumberOfClaims > 0;
  }

  ngOnInit(): void {
    if (window.innerWidth <= 767) {
      this._itemsPerPage = 5;
    }
    this.claimAddedEvent$ = this.selectClaimsService.claimAddedEvent.subscribe(
      (result: string) => {
        this.onAddClaimSuccess(result);
      }
    );
    this.claimRemovedEvent$ = this.selectClaimsService.claimRemovedEvent.subscribe(
      (result: string) => {
        this.onRemoveClaimSuccess(result);
      }
    );

    this.gotSelectedClaimsEvent$ = this.selectClaimsService.gotSelectedClaimsEvent.subscribe(
      (result: SelectClaimsTable) => {
        this.onGetClaimsSuccess(result);
      }
    );

    this.beganClaimRemoveEvent$ = this.selectClaimsService.beganClaimRemovedEvent.subscribe(
      (claimId: string) => {
        this.logger.info("received began Claim Removed Event");
        this.setUpdatingFlagOnClaimModel(claimId, true);
      }
    );

    this.cancelledClaimRemoveEvent$ = this.selectClaimsService.claimRemoveCancelledEvent.subscribe(
      (claimId: string) => {
        this.logger.info("received began Claim Remove Cancelled Event");
        this.setUpdatingFlagOnClaimModel(claimId, false);
      }
    );
    this.requestClaims(0);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.gotSelectedClaimsEvent$.unsubscribe();
  }

  pageSelected(pageNum: number): void {
    this.loading = true;
    this.currentPage = pageNum;
    this.requestClaims((pageNum - 1) * this.itemsPerPage);
  }

  onRemoveClaimSuccess(claimId: string): void {
    this.loading = true;
    this.requestClaims((this.currentPage - 1) * this.itemsPerPage);
  }

  onAddClaimSuccess(result: string): void {
    this.requestClaims((this.currentPage - 1) * this.itemsPerPage);
  }

  requestClaims(offset: number): void {
    this.selectClaimsService.getSelectedClaims(
      offset,
      this.itemsPerPage,
      this.claimCache
    );
  }

  @log("info")
  onGetClaimsSuccess(result: SelectClaimsTable): void {
    this.model = result;
    if (
      this.model.totalNumberOfClaims > 0 &&
      this.model.totalNumberOfClaims <=
      (this.currentPage - 1) * this.itemsPerPage
    ) {
      this.pageSelected(this.currentPage - 1);
    }
    this.loading = false;
  }

  @log("info")
  setUpdatingFlagOnClaimModel(claimId: string, updating: boolean): void {
    for (let i = 0; i < this.model.claims.length; i++) {
      if (this.model.claims[i].claimId == claimId) {
        this.model.claims[i].updating = updating;
      }
    }
  }
}
