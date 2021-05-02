import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { LoggerService } from "../../../../global/logger.service";
import {
  SelectClaimsTable,
  SelectClaimsTableRowCache,
  SelectClaimsTableRow,
} from "../selectclaimstable.model";
import { SelectClaimsService } from "../selectclaims.service";
import { EventTrackerService } from "../../../../global/services/event-tracker/event-tracker.service";
import { ViewedClaimsCache } from "../viewedclaimscache.model";

declare let env: any;

// @Component({
//     selector: 'cf-select-claim-table-base',
//     template: '<div>Do not use directly</div>',
// })

export abstract class SelectClaimTableBaseComponent
  implements OnInit, OnDestroy {
  @Input() tableTitle: string = "";
  @Input() claimCache: ViewedClaimsCache;

  claims: SelectClaimsTableRow[];
  numberOfClaims: number;
  loading: boolean = true;
  pageCache: SelectClaimsTableRowCache;

  currentPage: number = 1;
  protected _itemsPerPage = 10;

  claimAddedEvent$: Subscription;
  claimRemovedEvent$: Subscription;
  beganClaimRemoveEvent$: Subscription;
  gotNewMatchingClaimsEvent$: Subscription;
  cancelledClaimRemoveEvent$: Subscription;

  constructor(
    protected eventTrackerService: EventTrackerService,
    public logger: LoggerService,
    public selectClaimsService: SelectClaimsService
  ) { }

  abstract requestClaims(offset: number): void;

  get pageSelectItemName(): string {
    return "Claim";
  }

  get itemsPerPage(): number {
    return this._itemsPerPage;
  }

  get hasItems(): boolean {
    return this.numberOfClaims > 0;
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
    this.beganClaimRemoveEvent$ = this.selectClaimsService.beganClaimRemovedEvent.subscribe(
      (claimId: string) => {
        if (this.pageCache) {
          this.logger.info("in base-table comp received beganClaimRemovedEvent");
          this.pageCache.setUpdatingFlagOnClaimModel(claimId, true);
        }
      }
    );
    this.cancelledClaimRemoveEvent$ = this.selectClaimsService.claimRemoveCancelledEvent.subscribe(
      (claimId: string) => {
        this.logger.info("in base-table comp received claimRemoveCancelledEvent");
        this.pageCache.setUpdatingFlagOnClaimModel(claimId, false);
      }
    );
    this.requestClaims(0);
  }

  ngOnDestroy(): void {
    this.claimAddedEvent$.unsubscribe();
    this.claimRemovedEvent$.unsubscribe();
  }

  pageSelected(pageNum: number, claimViewType: string): void {
    if (env.CF_ANALYTICS_FE) {
      if (claimViewType == "PrevClaimsView") {
        this.eventTrackerService.triggerEvent("navPrevClaims", {
          data: null,
        });
      }
      if (claimViewType == "SelectClaimsView") {
        this.eventTrackerService.triggerEvent("navSelectClaims", {
          data: null,
        });
      }
    }
    if (this.pageCache.isPageCached(pageNum)) {
      this.currentPage = pageNum;
      this.claims = this.pageCache.getPageClaims(pageNum);
    } else {
      this.loading = true;
      this.currentPage = pageNum;
      this.requestClaims((pageNum - 1) * this.itemsPerPage);
    }
  }

  onClaimSelected(claimId: string): void {
    this.pageCache.setUpdatingFlagOnClaimModel(claimId, true);
    this.selectClaimsService.addClaim(claimId);
  }

  onAddClaimSuccess(claimId: string): void {
    this.pageCache.setSelectedFlagOnClaimModel(claimId, true);
  }

  onClaimDeselected(claimId: string): void {
    this.logger.info("remove claim from base-table component claim: ", claimId);
    this.selectClaimsService.removeClaim(claimId, false);
  }

  onRemoveClaimSuccess(claimId: string): void {
    this.pageCache.setSelectedFlagOnClaimModel(claimId, false);
  }

  onGetClaimsSuccess(result: SelectClaimsTable): void {
    if (this.pageCache == null) {
      this.pageCache = new SelectClaimsTableRowCache(
        Math.ceil(result.totalNumberOfClaims / this.itemsPerPage)
      );
    }
    this.pageCache.setPageClaims(this.currentPage, result.claims);
    this.claims = result.claims;
    if (!this.numberOfClaims) {
      this.numberOfClaims = result.totalNumberOfClaims;
    }
    this.loading = false;
  }

  numberOfLowerPageNumberClaimsSelectedThisSession(): number {
    if (!this.pageCache) {
      return 0;
    }
    let retval: number = 0;
    for (let i = 0; i < this.currentPage; i++) {
      if (this.pageCache.cache[i]) {
        for (let j = 0; j < this.pageCache.cache[i].length; j++) {
          if (this.pageCache.cache[i][j].isSelected) {
            retval += 1;
          }
        }
      }
    }
    return retval;
  }
}
