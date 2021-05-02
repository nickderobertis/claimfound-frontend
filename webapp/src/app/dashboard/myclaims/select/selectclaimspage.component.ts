import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

import { LoggerService } from "../../../global/logger.service";
import { SelectClaimsService } from "./selectclaims.service";
import { SelectClaimsTable } from "./selectclaimstable.model";
import { ViewedClaimsCache } from "./viewedclaimscache.model";
import { CFError } from "src/app/global/error.service";
import { ErrorModalService } from "src/app/error-modal/errormodal.service";

/**
 * The main page component for the select claims page.
 *
 * This component mainly manages which subcomponents to display in which states.
 *
 * The main functionality is delegated to subcomponents:
 * * [SearchingMessageWidgetComponent]{@link SearchingMessageWidgetComponent}
 * * [NewClaimsTotalsWidgetComponent]{@link NewClaimsTotalsWidgetComponent}
 * * [SelectClaimTableComponent]{@link SelectClaimTableComponent}
 *     * [SelectClaimTableRowComponent]{@link SelectClaimTableRowComponent}
 *     * [PageSelectComponent]{@link PageSelectComponent}
 * * [RemoveClaimTableComponent]{@link RemoveClaimTableComponent}
 *     * [RemoveClaimTableRowComponent]{@link RemoveClaimTableRowComponent}
 *     * [PageSelectComponent]{@link PageSelectComponent}
 * * [SelectedClaimsTotalsWidgetComponent]{@link SelectedClaimsTotalsWidgetComponent}
 * * [PreviouslyViewedClaimsTableComponent]{@link PreviouslyViewedClaimsTableComponent}
 *     * [SelectClaimTableRowComponent]{@link SelectClaimTableRowComponent}
 *     * [PageSelectComponent]{@link PageSelectComponent}
 * * [RemoveClaimModalComponent]{@link RemoveClaimModalComponent}
 */
@Component({
  selector: "cf-select-claims-page",
  templateUrl: "./selectclaimspage.component.html",
  styleUrls: [
    "../../../global/css/normalize.scss",
    "../../../global/css/webflow.scss",
    "./selectclaimspage.component.scss",
  ],
})
export class SelectClaimsPageComponent implements OnInit, OnDestroy {
  hasPreviouslyViewedClaims: boolean = false;
  hasNewClaims: boolean = false;
  totalsLoaded: boolean = false;
  showInstructions: boolean = true;

  previouslyViewedClaimsEvent$: Subscription;
  newMatchingClaimsEvent$: Subscription;
  selectedClaimsEvent$: Subscription;

  currentClaimsCache: ViewedClaimsCache = new ViewedClaimsCache();

  constructor(
    private logger: LoggerService,
    private selectClaimsService: SelectClaimsService,
    private errorModalService: ErrorModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.newMatchingClaimsEvent$ = this.selectClaimsService.gotNewMatchingClaimsEvent.subscribe(
      (result: SelectClaimsTable) => {
        this.onGotNewMatchingClaimsEvent(result);
      }
    );
    this.previouslyViewedClaimsEvent$ = this.selectClaimsService.gotPreviouslyViewedClaimsEvent.subscribe(
      (result: SelectClaimsTable) => {
        this.onGotPreviouslyViewedClaimsEvent(result);
      }
    );
    this.selectedClaimsEvent$ = this.selectClaimsService.gotSelectedClaimsEvent.subscribe(
      (result: SelectClaimsTable) => {
        this.onGotSelectedClaimsEvent(result);
      }
    );
  }

  ngOnDestroy(): void {
    this.newMatchingClaimsEvent$.unsubscribe();
    this.previouslyViewedClaimsEvent$.unsubscribe();
    this.selectedClaimsEvent$.unsubscribe();
  }

  onGotNewMatchingClaimsEvent(result: SelectClaimsTable): void {
    if (result.totalNumberOfClaims > 0) {
      this.selectClaimsService.addClaimsToArrayIfNotDuplicate(
        this.currentClaimsCache.currentViewedClaims,
        result.claims
      );
      this.hasNewClaims = true;
    }
    this.totalsLoaded = true;
  }

  onGotPreviouslyViewedClaimsEvent(result: SelectClaimsTable): void {
    if (result.totalNumberOfClaims > 0) {
      this.selectClaimsService.addClaimsToArrayIfNotDuplicate(
        this.currentClaimsCache.currentPreviouslyViewedClaims,
        result.claims
      );
      this.hasPreviouslyViewedClaims = true;
    }
  }

  onSawInstructions() {
    this.showInstructions = false;
  }

  onGotSelectedClaimsEvent(result: SelectClaimsTable): void {
    this.currentClaimsCache.currentSelectedClaims = [];
    this.selectClaimsService.addClaimsToArrayIfNotDuplicate(
      this.currentClaimsCache.currentSelectedClaims,
      result.claims
    );
  }

  onGoToDashboardClick(event: MouseEvent): void {
    this.selectClaimsService
      .flagCurrentViewedClaimsAsDenied(this.currentClaimsCache)
      .subscribe(
        (result: void) => {
          this.router.navigate(["/dashboard/myclaims"]);
        },
        (error) => this.handleGoToDashboardError(error)
      );
  }

  handleGoToDashboardError(error: CFError) {
    this.logger.debug("error flagging viewed claims as denied");
    let data = {
      message: error.displayMessage,
      buttonText: "Close",
      redirectUrl: "",
    };
    this.errorModalService.showModal(data);
  }

  get newClaimsTableTitle(): string {
    return "New Claims To Review";
  }

  get previouslyViewedTableTitle(): string {
    return "Previously Viewed Claims";
  }

  get selectedTableTitle(): string {
    return "Selected Claims";
  }
}
