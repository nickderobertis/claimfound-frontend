/**
 * Created by christofferprompovitch on 9/1/17.
 */

import { Router } from "@angular/router";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { ClaimsBarService } from "./claimsbar.service";
import { ProfileCompletionService } from "../../global/services/profile-completion.service";
import { ClaimStatusModel } from "./claims-status.model";
import { StepConstants } from "../step/stepconstants";
import { EventEmitter } from "selenium-webdriver";
import { UserDetailsStatusModel } from "src/app/global/api/models/userdetails/user-details-status.model";

/**
 * The component which is displayed on the dashboard claim pages (My Claims, Upload Documents,
 * E-Sign Forms, and Final Review) under the header which allows navigating between the pages.
 *
 * Enables and disables navigation to pages depending on the steps of user claims. Interacts with the
 * service to determine this.
 */
@Component({
  selector: "cf-claimsbar",
  templateUrl: "./claimsbar.component.html",
  styleUrls: [
    "../../global/css/normalize.scss",
    "../../global/css/webflow.scss",
    "./claimsbar.component.scss",
  ],
})
export class ClaimsbarComponent implements OnDestroy, OnInit {
  show: boolean = false;
  model: ClaimStatusModel = new ClaimStatusModel();
  currentPage: string;
  hasLoadedModel: boolean = false;

  stateChanged$: Subscription;
  pageSet$: Subscription;
  stepConstants: StepConstants = StepConstants;

  userCanNavigateFurther: boolean = true;

  constructor(
    private router: Router,
    private claimsBarService: ClaimsBarService,
    private profileCompletionService: ProfileCompletionService
  ) {}

  ngOnInit() {
    this.stateChanged$ = this.claimsBarService.claimsBarRefreshEvent.subscribe(
      (state: ClaimStatusModel) => {
        this.onRefreshEvent(state);
      }
    );
    this.pageSet$ = this.claimsBarService.claimsBarPageSetEvent.subscribe(
      (result: string) => {
        this.onPageSetEvent(result);
      }
    );
    this.profileCompletionService
      .getStatus()
      .subscribe((res: UserDetailsStatusModel) => {
        this.userCanNavigateFurther = res.canUploadDocs;
      });
  }

  get myClaimsLinkClass(): string {
    return this._getLinkClass(StepConstants.MYCLAIMS);
  }
  get myClaimsDivClass(): string {
    return this._getDivClass(StepConstants.MYCLAIMS);
  }

  get uploadLinkClass(): string {
    return this._getLinkClass(StepConstants.DOCS);
  }
  get uploadLinkDiv(): string {
    return this._getDivClass(StepConstants.DOCS);
  }

  get eSignLinkClass(): string {
    return this._getLinkClass(StepConstants.FORMS);
  }
  get eSignDivClass(): string {
    return this._getDivClass(StepConstants.FORMS);
  }

  get reviewLinkClass(): string {
    return this._getLinkClass(StepConstants.REVIEW);
  }
  get reviewDivClass(): string {
    return this._getDivClass(StepConstants.REVIEW);
  }

  private onRefreshEvent(state: ClaimStatusModel) {
    this.model = state;
    this.hasLoadedModel = true;

    this.routeToMyClaimsIfNotAllowedOnPage();

    if (this.model.docs || this.model.forms || this.model.review) {
      this.show = true;
    }
  }

  private onPageSetEvent(page: string): void {
    this.currentPage = page;
    this.routeToMyClaimsIfNotAllowedOnPage();
  }

  private routeToMyClaimsIfNotAllowedOnPage(): void {
    if (!this.hasLoadedModel) {
      // Can't check whether page is allowed until model has been loaded
      return;
    }
    if (!this._pageIsAllowed(this.currentPage)) {
      this.router.navigate([StepConstants.routesForPage.MYCLAIMS]);
    }
  }

  navLinkClicked(event: EventEmitter, sectionName: string) {
    if (!this._pageIsAllowed(sectionName)) {
      // Do nothing if can't navigate to page
      return;
    }

    let showIncompleteProfileModal: boolean =
      StepConstants.modalOnNavigation[this.currentPage];

    if (this.currentPage !== sectionName) {
      if (showIncompleteProfileModal && !this.userCanNavigateFurther) {
        // before navigating to the link push navigation event
        this.profileCompletionService.pushShowIncompleteEvent();
        return;
      }
      this.router.navigate([StepConstants.routesForPage[sectionName]]);
    }
  }

  private _pageIsAllowed(pageName: string): boolean {
    return this.model.isStepOrLaterStepActive(pageName);
  }

  private _getLinkClass(propertyName: string): string {
    let classArr = [];

    if (this.currentPage === propertyName) {
      classArr.push("selected");
    }

    if (!this.model.isStepOrLaterStepActive(propertyName)) {
      classArr.push("no-show");
    }

    return classArr.join(" ");
  }

  private _getDivClass(propertyName: string): string {
    let classArr = [];

    if (this.currentPage !== propertyName) {
      classArr.push("not-selected");
    }

    return classArr.join(" ");
  }

  ngOnDestroy() {
    if (this.stateChanged$) {
      this.stateChanged$.unsubscribe();
    }
    if (this.pageSet$) {
      this.pageSet$.unsubscribe();
    }
  }
}
