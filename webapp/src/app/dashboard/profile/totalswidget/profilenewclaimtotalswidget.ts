import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

import { ClaimTotalsModel } from "src/app/global/models/claim-totals";
import { LoggerService } from "src/app/global/logger.service";
import { StorageService } from "src/app/global/storage.service";
import { NewClaimsTotalsService } from "src/app/global/components/foundclaims/newclaimstotals.service";
import { SelectClaimsTable } from "../../myclaims/select/selectclaimstable.model";
import { ClaimTotalsArgs } from "src/app/global/api/interfaces/general/relative-claims/totals.interface";
import { ProfileService } from "../profile.service";
import { CFError } from "src/app/global/error.service";
import { ClaimStatusModel } from "../../claimsbar/claims-status.model";
import { StepConstants } from "../../step/stepconstants";

/**
 * The component on the profile page which shows the total of all the claims the
 * user can select.
 */
@Component({
  selector: "cf-profile-claims-totals-widget",
  templateUrl:
    "../../../global/components/foundclaims/newclaimstotalswidget.component.html",
  styleUrls: [
    "../../../global/css/normalize.scss",
    "../../../global/css/webflow.scss",
    "../../../global/components/foundclaims/newclaimstotalswidget.component.scss",
  ],
})
export class ProfileNewClaimsTotalsWidgetComponent
  implements OnInit, OnDestroy {
  showSelectClaimsLink: boolean = true;
  @Output() finishedLoading: EventEmitter<boolean> = new EventEmitter();
  model: ClaimTotalsModel;
  name: string;
  hasItems: boolean = false;
  hasClaimsInProcess: boolean = false;
  hasNewOrPreviouslyViewedClaims: boolean = false;

  private newloaded: boolean = false;
  private previousLoaded: boolean = false;
  get loading() {
    return !this.newloaded || !this.previousLoaded;
  }

  matchingCompleteEvent$: Subscription;

  constructor(
    private logger: LoggerService,
    private storage: StorageService,
    private newClaimsTotalsService: NewClaimsTotalsService,
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.name = this.storage.read("cf-user-name") as string;
    this.newClaimsTotalsService.getPreviouslyViewedClaims().subscribe(
      (result: SelectClaimsTable) => {
        this.onGetPreviouslyViewedClaimsSuccess(result);
      },
      (error: CFError) => this.onGetPreviouslyViewedClaimsError(error)
    );
    this.matchingCompleteEvent$ = this.profileService.matchingCompleteEvent.subscribe(
      (res: boolean) => {
        this.getClaimsTotals();
      }
    );
    this.newClaimsTotalsService.getClaimsStatus().subscribe(
      (result) => {
        this.onGetClaimStatusSuccess(result);
      },
      (error) =>
        this.logger.debug("Error getting claim status in newclaimstotalswidget")
    );
  }

  ngOnDestroy(): void {
    this.matchingCompleteEvent$.unsubscribe();
  }

  getClaimsTotals(): void {
    this.newClaimsTotalsService.getNewClaimsTotals().subscribe(
      (result: SelectClaimsTable) => {
        this.onGetClaimsTotalsSuccess(result);
      },
      (error: CFError) => this.onGetClaimsTotalsError(error)
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
    this.name = this.storage.read("cf-user-name") as string;
    this.newloaded = true;
    this.finishedLoading.emit(true);

    if (result.totalNumberOfClaims > 0 || this.hasItems) {
      this.hasNewOrPreviouslyViewedClaims = true;
    }
  }

  onGetClaimsTotalsError(error: CFError): void {
    this.finishedLoading.emit(false);
    this.logger.error("Error getting new claims totals", error);
  }

  onGetPreviouslyViewedClaimsSuccess(result: SelectClaimsTable): void {
    if (result.totalNumberOfClaims > 0 || this.hasItems) {
      this.hasNewOrPreviouslyViewedClaims = true;
    }
    this.previousLoaded = true;
    if (!this.loading) {
      this.finishedLoading.emit(true);
    }
  }

  onGetPreviouslyViewedClaimsError(error: CFError): void {
    this.logger.error("Error getting previously viewed claims", error);
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
