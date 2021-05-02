import { Component, OnInit, Input, OnDestroy } from "@angular/core";

import { ProfileService } from "../profile.service";
import { Subscription } from "rxjs";
import { ProfilePageConstants } from "../profilepageconstants";
import { UserDetailsStatusModel } from "src/app/global/api/models/userdetails/user-details-status.model";

/**
 * The component representing the navigation bar on the profile/question pages
 * that allows the user to jump to another profile page.
 */
@Component({
  selector: "cf-profile-navigation-component",
  templateUrl: "./profilenavigation.component.html",
  styleUrls: [
    "../../../global/css/normalize.scss",
    "../../../global/css/webflow.scss",
    "./profilenavigation.component.scss",
  ],
})
export class ProfileNavigationComponent implements OnInit, OnDestroy {
  @Input() userDetailsModel: UserDetailsStatusModel;

  selectedUrl: string;

  navigationEvent$: Subscription;
  gotUserDetailsStatusEvent$: Subscription;

  navSectionConstants: { [key: string]: string } = {
    personalInfo: "personalInfo",
    familyMembers: "familyMembers",
    phoneNumbers: "phoneNumbers",
    address: "address",
  };

  navSectionToUrlsMap: { [key: string]: string[] } = {
    personalInfo: [
      ProfilePageConstants.pagePaths.names,
      ProfilePageConstants.pagePaths.birthdayGender,
    ],
    familyMembers: [
      ProfilePageConstants.pagePaths.relatives,
      ProfilePageConstants.pagePaths.relativesQuestions,
    ],
    phoneNumbers: [
      ProfilePageConstants.pagePaths.phones,
      ProfilePageConstants.pagePaths.phonesQuestions,
    ],
    address: [
      ProfilePageConstants.pagePaths.addresses,
      ProfilePageConstants.pagePaths.addressesQuestions,
    ],
  };

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.navigationEvent$ = this.profileService.navigationEvent.subscribe(
      (result: string) => {
        this.onNavigationEvent(result);
      }
    );
    this.gotUserDetailsStatusEvent$ = this.profileService.gotUserDetailsStatusEvent.subscribe(
      (result: UserDetailsStatusModel) => {
        this.userDetailsModel = result;
      }
    );
  }

  onNavigationEvent(url: string): void {
    this.selectedUrl = url;
    let navSection: string = "";
    for (let key in this.navSectionToUrlsMap) {
      if (this.navSectionToUrlsMap[key].indexOf(url) > -1) {
        navSection = key;
      }
    }
    if (!this.canNavigateToSection(navSection)) {
      this.profileService.navigateProfile(ProfilePageConstants.pagePaths.names);
    }
  }

  onNavSectionClick(navSection: string): void {
    if (!this.canNavigateToSection(navSection)) {
      return;
    }
    // This will work so long as the first entry in each map array is the first page in the section.
    let navURL = this.navSectionToUrlsMap[navSection][0];
    this.profileService.navigateProfile(navURL);
  }

  isNavSectionSelected(navSection: string): boolean {
    let map: string[] = this.navSectionToUrlsMap[navSection];
    if (map) {
      if (map.indexOf(this.selectedUrl) > -1) {
        return true;
      }
    }
    return false;
  }

  getNavSectionSelectedClass(navSection: string): string {
    if (this.isNavSectionSelected(navSection)) {
      return "active";
    }
    return "";
  }

  getNavSectionClass(navSection: string): string {
    if (this.canNavigateToSection(navSection)) {
      if (this.isNavSectionSelected(navSection)) {
        return "selected";
      } else {
        return "active";
      }
    } else {
      return "inactive";
    }
  }

  canNavigateToSection(navSection: string): boolean {
    // If first page, always allow
    if (navSection === this.navSectionConstants.personalInfo) {
      return true;
    }

    // If completed first section
    if (this.hasCompletedBirthdayGender) {
      // Allow to go to second section
      if (navSection === this.navSectionConstants.familyMembers) {
        return true;
      }

      // If completed second section
      if (this.hasCompletedRelativesSection) {
        // Allow to go to third section
        if (navSection === this.navSectionConstants.phoneNumbers) {
          return true;
        }

        // If has completed third section, allow to go to any section as there are four sections
        if (
          this.hasCompletedPhonesSection &&
          navSection === this.navSectionConstants.address
        ) {
          return true;
        }
      }
    }
    return false;
  }

  get hasCompletedBirthdayGender(): boolean {
    return this.userDetailsModel.gender.count > 0;
  }

  get hasCompletedRelativesSection(): boolean {
    return (
      this.userDetailsModel.relative.userHasViewed &&
      this.userDetailsModel.hasViewedRelativeQuestions
    );
  }

  get hasCompletedPhonesSection(): boolean {
    return (
      this.userDetailsModel.phone.hasPrimary &&
      this.userDetailsModel.hasViewedPhoneQuestions
    );
  }

  ngOnDestroy(): void {
    this.navigationEvent$.unsubscribe();
    this.gotUserDetailsStatusEvent$.unsubscribe();
  }
}
