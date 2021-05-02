import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import {
  BaseService,
  TokenServiceRequestOptions,
} from "../../../global/base.service";
import { StorageService } from "../../../global/storage.service";
import { LoggerService } from "../../../global/logger.service";
import { ErrorModalService } from "../../../error-modal/errormodal.service";
import {
  SelectClaimsTable,
  SelectClaimsAPIArgs,
  SelectClaimsGETAPIRequestArgs,
  SelectClaimsTableRow,
  SelectClaimsPOSTAPIRequestArgs,
} from "./selectclaimstable.model";
import { Observable } from "rxjs";
import { CFError } from "src/app/global/error.service";
import { ViewedClaimsCache } from "./viewedclaimscache.model";

/**
 * The service powering the Select Claims page.
 *
 * Handles getting claims data, updating the user's selections, and handling
 * events on the selet claims page.
 */
@Injectable()
export class SelectClaimsService extends BaseService {
  static VALID_RESULT_TYPES = {
    NEW: "new",
    SELECTED: "selected",
    PREVIOUSLY_VIEWED: "previously_viewed",
  };

  constructor(
    http: HttpClient,
    logger: LoggerService,
    storage: StorageService,
    router: Router,
    errorModService: ErrorModalService
  ) {
    super(http, logger, storage, router, errorModService);
  }

  gotNewMatchingClaimsEvent = new EventEmitter<SelectClaimsTable>();
  gotSelectedClaimsEvent = new EventEmitter<SelectClaimsTable>();
  gotPreviouslyViewedClaimsEvent = new EventEmitter<SelectClaimsTable>();
  claimAddedEvent = new EventEmitter<string>();

  beganClaimRemovedEvent = new EventEmitter<string>();
  claimRemovedEvent = new EventEmitter<string>();
  showConfirmDeleteEvent = new EventEmitter<string>(); //takes claim_id as input
  claimRemoveCancelledEvent = new EventEmitter<string>(); //takes claim_id as input

  confirmFormDeletionQueue: Array<string> = [];

  /**
   * Gets the claims matched to the user which they have never looked at
   * @param offset For example, passing 5 will get claims starting from number 6
   * @param numberToGet Number of claims to get
   */
  getNewMatchingClaims(
    offset: number,
    numberToGet: number,
    claimCache: ViewedClaimsCache
  ): void {
    this.getSelectClaimsTableData(
      offset,
      numberToGet,
      SelectClaimsService.VALID_RESULT_TYPES.NEW,
      claimCache
    ).subscribe(
      (result: SelectClaimsTable) => {
        this.gotNewMatchingClaimsEvent.emit(result);
      },
      (error) => this.logger.error("error getting new matched claims")
    );
  }

  /**
   * Gets the claims for the user which they have currently selected
   * @param offset For example, passing 5 will get claims starting from number 6
   * @param numberToGet Number of claims to get
   */
  getSelectedClaims(
    offset: number,
    numberToGet: number,
    claimCache: ViewedClaimsCache
  ): void {
    this.getSelectClaimsTableData(
      offset,
      numberToGet,
      SelectClaimsService.VALID_RESULT_TYPES.SELECTED,
      claimCache
    ).subscribe(
      (result: SelectClaimsTable) => {
        this.gotSelectedClaimsEvent.emit(result);
      },
      (error) => this.logger.error("error getting selected claims")
    );
  }

  /**
   * Gets the claims matched to the user which they have previously looked at
   * @param offset For example, passing 5 will get claims starting from number 6
   * @param numberToGet Number of claims to get
   */
  getPreviouslyViewedClaims(
    offset: number,
    numberToGet: number,
    claimCache: ViewedClaimsCache
  ): void {
    this.getSelectClaimsTableData(
      offset,
      numberToGet,
      SelectClaimsService.VALID_RESULT_TYPES.PREVIOUSLY_VIEWED,
      claimCache
    ).subscribe(
      (result: SelectClaimsTable) => {
        this.gotPreviouslyViewedClaimsEvent.emit(result);
      },
      (error) => this.logger.error("error getting previously viewed claims")
    );
  }

  /**
   * Make a claim selection for the user in the database
   * @param claimId The id of the claim to add
   */
  addClaim(claimId: string): void {
    this.doAddClaim(claimId).subscribe(
      (result: void) => {
        this.claimAddedEvent.emit(claimId);
      },
      (error) => this.logger.error("error adding claim")
    );
  }

  private doAddClaim(claimId: string): Observable<void> {
    let argsDict: SelectClaimsPOSTAPIRequestArgs = {};
    argsDict[claimId] = { selection: true };

    let options = new TokenServiceRequestOptions({
      url: "myclaims",
      data: argsDict,
    });

    return this.post(options);
  }

  /**
   * Remove a claim for a user in the database
   * @param claimId The id of the claim to remove
   * @param confirmation If the claim being removed will cause a form for another claim
   * to be deleted (because both claims are on that form), then true must be passed
   * to actually remove it.
   */
  removeClaim(claimId: string, confirmation: boolean) {
    this.beganClaimRemovedEvent.emit(claimId);
    this.doRemoveClaim(claimId, confirmation).subscribe(
      (result: void) => {
        this.claimRemovedEvent.emit(claimId);
      },
      (error) => this.handleRemoveClaimError(error)
    );
  }

  private doRemoveClaim(
    claimId: string,
    confirmation: boolean
  ): Observable<void> {
    //add confirmation parameter to the request
    let argsDict: SelectClaimsPOSTAPIRequestArgs = {};

    argsDict.confirmation = confirmation;

    argsDict[claimId] = { selection: false };

    let options = new TokenServiceRequestOptions({
      url: "myclaims",
      data: argsDict,
    });

    return this.post(options);
  }

  private getSelectClaimsTableData(
    offset: number,
    numberToGet: number,
    resultType: string,
    claimCache: ViewedClaimsCache
  ): Observable<SelectClaimsTable> {
    let data: SelectClaimsGETAPIRequestArgs = {
      offset: offset,
      resultType: resultType,
      numberToGet: numberToGet,
      filterClaims: [],
    };
    if (
      resultType === SelectClaimsService.VALID_RESULT_TYPES.PREVIOUSLY_VIEWED
    ) {
      let filteredClaims = [];
      claimCache.currentPreviouslyViewedClaims.forEach((claim) => {
        if (claimCache.currentSelectedClaims.includes(claim)) {
          filteredClaims.push(claim);
        }
      });
      data.filterClaims = claimCache.currentViewedClaims.concat(filteredClaims);
    }
    let options = new TokenServiceRequestOptions({
      url: "select/getclaims",
      data: data,
    });

    return this.postInject(this.get(options), (res: SelectClaimsAPIArgs) => {
      return new SelectClaimsTable(res);
    });
  }

  /**
   * Marks claims currently in the user's view as viewed, so that next time they
   * will come to the page as previously viewed and not new claims.
   */
  flagCurrentViewedClaimsAsDenied(
    currentClaimsCache: ViewedClaimsCache
  ): Observable<void> {
    let argsDict: SelectClaimsPOSTAPIRequestArgs = {};
    currentClaimsCache.currentViewedClaims.forEach((claim) => {
      if (!currentClaimsCache.currentSelectedClaims.includes(claim)) {
        argsDict[claim] = { selection: false };
      }
    });

    let options = new TokenServiceRequestOptions({
      url: "myclaims",
      data: argsDict,
    });

    return this.post(options);
  }

  handleRemoveClaimError(error: CFError): void {
    switch (error.name) {
      case "confirmFormDeletion":
        let claimid: string = error.data["rejected_deletes"][0];
        this.confirmFormDeletionQueue.push(claimid);
        this.showConfirmDeleteEvent.emit(claimid);
        break;
      default:
        break;
    }
  }

  emitClaimRemovalCancelledEvent(claimid: string) {
    // Stop spinner for all claims needing confirmation because only one could be handled.
    this.confirmFormDeletionQueue.forEach(element => {
      this.claimRemoveCancelledEvent.emit(element);
    });
    this.confirmFormDeletionQueue = [];
  }

  addClaimsToArrayIfNotDuplicate(
    arr: string[],
    claims: SelectClaimsTableRow[]
  ): void {
    claims.forEach((claim) => {
      if (arr.indexOf(claim.claimId) === -1) {
        arr.push(claim.claimId);
      }
    });
  }
}
