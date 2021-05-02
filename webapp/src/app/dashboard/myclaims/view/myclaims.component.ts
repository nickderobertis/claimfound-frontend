import { Component, OnInit } from "@angular/core";

import { LoggerService } from "../../../global/logger.service";
import { MyClaimsService } from "./myclaims.service";
import { StepConstants } from "../../step/stepconstants";
import { Claim } from "src/app/global/models/claim.model";
import { LoadingService } from "src/app/global/services/loading.service";
import { ProfileCompletionService } from "../../../global/services/profile-completion.service";
import { Router } from "@angular/router";

/**
 * The main page component for the My Claims page.
 *
 * The My Claims page is currently handling displaying the user’s claims,
 * family claims, deceased claims, submitted claims, and the claim steps.
 *
 * It contains one subcomponent wihch handles the display of claim information:
 * [MyClaimsBoxComponent]{@link MyClaimsBoxComponent}.
 */
@Component({
  selector: "myclaims",
  templateUrl: "./myclaims.component.html",
  styleUrls: [
    "../../../global/css/normalize.scss",
    "../../../global/css/webflow.scss",
    "./myclaims.component.scss",
  ],
})
export class MyClaimsComponent implements OnInit {
  loading: boolean = true;
  hasDetails: boolean = false;
  details: Claim[];
  isDetailsEmpty: boolean = true;
  hasMultiOwnerClaims: boolean = false;
  hasSingleOwnerClaims: boolean = false;
  hasNewOrPreviouslyViewedClaims = false;
  loadingSpinner: boolean = true;
  raiseImmediately: boolean = false;
  showSubmittedClaims: boolean = false;
  showRedCross: boolean = true;

  constructor(
    private logger: LoggerService,
    private router: Router,
    private myClaimsService: MyClaimsService,
    private loadingService: LoadingService,
    private profileCompletionService: ProfileCompletionService
  ) {}

  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.myClaimsService.getClaims().subscribe(
      (result: Claim[]) => {
        this.onGetClaimsSuccess(result);
      },
      (error) => this.onGetClaimsError(error)
    );
  }

  onGetClaimsSuccess(result: Claim[]): void {
    this.details = result;

    if (this.details.length > 0) {
      this.isDetailsEmpty = false;
    }
    this.hasDetails = true;
    this.loadingService.setLoading(false);
    this.loading = false;
    this.checkForMultiOwnerClaims(this.details);
    this.checkForSingleOwnerClaims(this.details);
  }

  onGetClaimsError(error: any): void {
    this.logger.debug("Error getting claims from myclaims endpoint");
  }

  checkForMultiOwnerClaims(data: Claim[]): void {
    for (let i = 0; i < data.length; i++) {
      if (data[i].names.length > 1) {
        this.hasMultiOwnerClaims = true;
        return;
      }
    }
    this.hasMultiOwnerClaims = false;
  }

  checkForSingleOwnerClaims(data: Claim[]): void {
    for (let i = 0; i < data.length; i++) {
      if (data[i].names.length == 1) {
        this.hasSingleOwnerClaims = true;
        return;
      }
    }
    this.hasSingleOwnerClaims = false;
  }

  get pageName(): string {
    return StepConstants.MYCLAIMS;
  }

  get hasOnlyMultiOwnerClaims(): boolean {
    return this.hasMultiOwnerClaims && !this.hasSingleOwnerClaims;
  }

  onGetHasNewOrPreviouslyViewedClaims(
    hasNewOrPreviouslyViewedClaims: boolean
  ): void {
    this.hasNewOrPreviouslyViewedClaims = hasNewOrPreviouslyViewedClaims;
    this.loadingSpinner = false;
  }

  setShowWidget(showWidget: boolean): void {
    this.showSubmittedClaims = showWidget;
  }
}
