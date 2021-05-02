import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";

import { LoggerService } from "../../logger.service";
import { ClaimTotalsModel } from "../../models/claim-totals";
import { StorageService } from "src/app/global/storage.service";
import { NewClaimsTotalsService } from "./newclaimstotals.service";
import { SelectClaimsTable } from "src/app/dashboard/myclaims/select/selectclaimstable.model";
import { ClaimTotalsArgs } from "../../api/interfaces/general/relative-claims/totals.interface";
import { ClaimStatusModel } from "src/app/dashboard/claimsbar/claims-status.model";
import { StepConstants } from "src/app/dashboard/step/stepconstants";

/**
 * The component on the select claims page which shows the total of all the claims the
 * user can select.
 */
@Component({
  selector: "cf-select-claims-totals-widget",
  templateUrl: "./newclaimstotalswidget.component.html",
  styleUrls: [
    "../../../global/css/normalize.scss",
    "../../../global/css/webflow.scss",
    "./newclaimstotalswidget.component.scss",
  ],
})
export class NewClaimsTotalsWidgetComponent implements OnInit {
  @Input() showSelectClaimsLink: boolean = false;
  @Output() finishedLoading: EventEmitter<boolean> = new EventEmitter();
  model: ClaimTotalsModel;
  name: string;
  loading: boolean = true;
  hasItems: boolean = false;
  hasNewOrPreviouslyViewedClaims: boolean = false;
  hasClaimsInProcess: boolean = false;
  @Output() gotHasNewOrPreviouslyViewedClaims = new EventEmitter();

  constructor(
    private logger: LoggerService,
    private storage: StorageService,
    private newClaimsTotalsService: NewClaimsTotalsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.name = this.storage.read("cf-user-name") as string;
    this.newClaimsTotalsService.getNewClaimsTotals().subscribe(
      (result) => {
        this.onGetClaimsTotalsSuccess(result);
      },
      (error) => this.onGetClaimsTotalsError(error)
    );
    this.newClaimsTotalsService.getPreviouslyViewedClaims().subscribe(
      (result) => {
        this.onGetPreviouslyViewedClaimsSuccess(result);
      },
      (error) => this.onGetPreviouslyViewedClaimsError(error)
    );
    this.newClaimsTotalsService.getClaimsStatus().subscribe(
      (result) => {
        this.onGetClaimStatusSuccess(result);
      },
      (error) =>
        this.logger.debug("Error getting claim status in newclaimstotalswidget")
    );
  }

  onGetClaimsTotalsSuccess(result: SelectClaimsTable): void {
    let totalsArgs: ClaimTotalsArgs = {
      totalValue: result.totalValueOfClaims,
      averageValue: result.averageValueOfClaims,
      number: result.totalNumberOfClaims,
    };
    this.model = new ClaimTotalsModel(totalsArgs);
    this.hasItems = this.model.numberOfClaims > 0;
    this.loading = false;
    this.finishedLoading.emit(true);

    if (result.totalNumberOfClaims > 0 || this.hasItems) {
      this.hasNewOrPreviouslyViewedClaims = true;
    }
    this.gotHasNewOrPreviouslyViewedClaims.emit(
      this.hasNewOrPreviouslyViewedClaims
    );
  }

  onGetClaimsTotalsError(error: any) {
    this.finishedLoading.emit(false);
    this.logger.debug("Error getting new claims totals");
  }

  onGetPreviouslyViewedClaimsSuccess(result: SelectClaimsTable): void {
    if (result.totalNumberOfClaims > 0 || this.hasItems) {
      this.hasNewOrPreviouslyViewedClaims = true;
    }
    this.gotHasNewOrPreviouslyViewedClaims.emit(
      this.hasNewOrPreviouslyViewedClaims
    );
  }

  onGetPreviouslyViewedClaimsError(error: any): void {
    this.logger.debug("Error getting previously viewed claims");
  }

  onViewClaimsClick(): void {
    this.router.navigate(["/dashboard/myclaims/select"]);
  }

  onGetClaimStatusSuccess(result: ClaimStatusModel) {
    this.hasClaimsInProcess = result.isStepOrLaterStepActive(
      StepConstants.DOCS
    );
  }

  get hasClaimsInProcessText(): string {
    if (this.hasClaimsInProcess) {
      return "more ";
    } else {
      return "";
    }
  }
}
