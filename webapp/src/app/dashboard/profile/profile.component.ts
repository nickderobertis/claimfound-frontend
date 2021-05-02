import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";

import { ProfileService } from "./profile.service";
import { LoggerService } from "../../global/logger.service";
import { UserDetailsStatusModel } from "src/app/global/api/models/userdetails/user-details-status.model";
import { MatchingInProgressModel } from "src/app/global/api/models/matching/matchinginprogress.model";
import { ProfilePageConstants } from "./profilepageconstants";
import { CFError } from "src/app/global/error.service";
import { Subscription } from "rxjs";

/**
 * The main page component for the Profile and Questions pages.
 *
 * This component is mainly a wrapper. It contains as subcomponents
 * anything which persists across the profile/question pages, and has
 * a router outlet for the individual profile and questions pages.
 *
 * Subcomponents:
 * * [SearchingMessageWidgetComponent]{@link SearchingMessageWidgetComponent}
 * * [ProfileNewClaimsTotalsWidgetComponent]{@link ProfileNewClaimsTotalsWidgetComponent}
 * * [ProfileNavigationComponent]{@link ProfileNavigationComponent}
 *
 * Router Outlet Components:
 * * [ProfileBirthdayGenderBodyComponent]{@link ProfileBirthdayGenderBodyComponent}
 * * [ProfileRelativesBodyComponent]{@link ProfileRelativesBodyComponent}
 * * [ProfileRelativesQuestionsComponent]{@link ProfileRelativesQuestionsComponent}
 * * [ProfilePhonesBodyComponent]{@link ProfilePhonesBodyComponent}
 * * [ProfilePhonesQuestionsComponent]{@link ProfilePhonesQuestionsComponent}
 * * [ProfileAddressBodyComponent]{@link ProfileAddressBodyComponent}
 * * [ProfileAddressesQuestionsComponent]{@link ProfileAddressesQuestionsComponent}
 */
@Component({
  selector: "cf-profile-component",
  templateUrl: "./profile.component.html",
  styleUrls: [
    "../../global/css/normalize.scss",
    "../../global/css/webflow.scss",
    "./profile.component.scss",
  ],
})
export class ProfileComponent implements OnInit, OnDestroy {
  totalsLoaded: boolean = false;
  userDetailsLoaded: boolean = false;
  userDetailsStatus: UserDetailsStatusModel;

  runningMatchCheck: boolean = false;

  userDetailsUpdatedEvent$: Subscription;

  constructor(
    private profileService: ProfileService,
    private logger: LoggerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.profileService.getUserDetailsStatus().subscribe(
      (result) => {
        this.userDetailsStatus = result;
        this.userDetailsLoaded = true;
      },
      (error) => this.onGetUserDetailsError(error)
    );
    this.userDetailsUpdatedEvent$ = this.profileService.updatedUserInfoEvent.subscribe(
      (result: any) => {
        if (!this.runningMatchCheck) {
          this.checkClaimsMatching();
        }
      }
    );
    this.checkClaimsMatching();
  }

  ngOnDestroy(): void {
    this.userDetailsUpdatedEvent$.unsubscribe();
  }

  totalsWidgetFinishedLoadingEvent(succeeded: boolean): void {
    this.totalsLoaded = succeeded;
  }

  onGetUserDetailsError(error: CFError): void {
    this.logger.error("error loading user details in top profile page.", error);
  }

  checkClaimsMatching(): void {
    if (!ProfilePageConstants.pagePathsArr.includes(this.router.url)) {
      // Left the page, stop checking
      return;
    }
    this.runningMatchCheck = true;
    this.totalsLoaded = false;

    this.profileService.checkClaimsMatching().subscribe(
      (result: MatchingInProgressModel) => {
        if (result.matchingComplete) {
          this.runningMatchCheck = false;
          this.profileService.sendMatchingCompleteEvent();
        } else {
          setTimeout(() => {
            this.checkClaimsMatching();
          }, 5000);
        }
      },
      (error: CFError) => this.onCheckClaimsMatchingError(error)
    );
  }

  onCheckClaimsMatchingError(error: CFError): void {
    this.logger.error("error checking if matching is in progress", error);
  }
}
