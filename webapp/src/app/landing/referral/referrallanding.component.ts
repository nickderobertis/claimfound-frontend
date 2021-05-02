import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { LoggerService } from "../../global/logger.service";
import { ReferralLandingService } from "./referrallanding.service";
import { ReferralTokenFunctions } from "../../global/utils/tokens/referralTokenFunctions";
import { ReferralLandingModel } from "./models/referrallanding.model";
import { displayStyleFromBoolean } from "../../global/css/utils/display";

import { StorageService } from "../../global/storage.service";
import { CFError } from "src/app/global/error.service";

/**
 * The main page component for the referral landing page
 *
 * The user will land on this page when they have been referred by another user through
 * the application. It shows the results of the property search and the user's name.
 */
@Component({
  selector: "cf-referral-landing-page",
  templateUrl: "./referrallanding.component.html",
  providers: [ReferralLandingService],
  styleUrls: [
    "../../global/css/normalize.scss",
    "../../global/css/webflow.scss",
    "./referrallanding.component.scss",
  ],
})
export class ReferralLandingComponent {
  model: ReferralLandingModel;

  displaySearch: boolean = false;
  loading = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private logger: LoggerService,
    private referralLandingService: ReferralLandingService,
    private storage: StorageService
  ) {}

  ngOnInit() {
    let token = this.route.snapshot.paramMap.get("token");
    this.referralLandingService.getCustomLandingData(token).subscribe(
      (result) => this.onDataReceived(result),
      (error: CFError) => this.handleGetCustomLandingDataError(error)
    );
  }

  handleGetCustomLandingDataError(error: CFError) {
    this.logger.error(
      "Error getting custom referral page data: " + error.toString()
    );
  }

  onDataReceived(data: ReferralLandingModel) {
    this.model = data;
    this.loading = false;
    this.storage.write("cf-user-name", this.model.name.firstName);
    this.storage.write("cf-user-last-name", this.model.name.lastName);
  }

  onToggleDisplaySearch() {
    this.displaySearch = !this.displaySearch;
  }

  get displayName(): string {
    return this.model.name.anyExistingCapitalizedName;
  }

  get propertySearchStyles(): { [s: string]: string } {
    return displayStyleFromBoolean(this.displaySearch);
  }
}
