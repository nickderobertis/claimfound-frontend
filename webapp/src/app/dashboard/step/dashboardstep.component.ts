import {
  Component,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  OnInit,
} from "@angular/core";

import { Subscription } from "rxjs";

import { ClaimsBarService } from "../claimsbar/claimsbar.service";
import { ProfileCompletionService } from "../../global/services/profile-completion.service";
import { ClaimStatusModel } from "../claimsbar/claims-status.model";
import { StepConstants } from "./stepconstants";
import { Router } from "@angular/router";
import { UserDetailsStatusModel } from "src/app/global/api/models/userdetails/user-details-status.model";

/**
 * The next step button on the dashboard pages.
 *
 * It controls whether it should be highlighted depending on where the
 * user is in the process, and the text that the button should display.
 */
@Component({
  selector: "cf-dashboard-step",
  templateUrl: "./dashboardstep.component.html",
  styleUrls: [
    "./dashboardstep.component.scss",
    "../../global/css/normalize.scss",
    "../../global/css/webflow.scss",
  ],
})
export class DashboardStepComponent implements OnInit, OnDestroy {
  @Input() currentPage: string;
  @Output() processClaimsButtonClick: EventEmitter<any> = new EventEmitter();
  @Input() isSubmissionAllowed: boolean = false;
  claimsStateChanged$: Subscription;

  previousUrl: string;
  nextUrl: string;

  nextEnabled: boolean = false;
  processClaimsEnabled: boolean = false;
  userCanNavigateFurther: boolean = false;
  receivedNavigationStatus: boolean = false;

  constructor(
    private claimsBarService: ClaimsBarService,
    private router: Router,
    private profileCompletionService: ProfileCompletionService
  ) {
    this.claimsStateChanged$ = this.claimsBarService.claimsBarRefreshEvent.subscribe(
      (state) => {
        this.claimsStateChanged(state);
      }
    );
  }

  ngOnInit(): void {
    this.claimsBarService.refreshClaimsBar();
    this.claimsBarService.setClaimsBarPage(this.currentPage);
    this.setPathForPage(this.currentPage);
    if (this.currentPage === StepConstants.REVIEW && this.isSubmissionAllowed) {
      this.processClaimsEnabled = true;
    }
    this.profileCompletionService
      .getStatus()
      .subscribe((res: UserDetailsStatusModel) => {
        this.userCanNavigateFurther = res.canUploadDocs;
        this.receivedNavigationStatus = true;
      });
  }

  claimsStateChanged(state: ClaimStatusModel): void {
    this.nextEnabled = this.shouldNextButtonBeActive(this.currentPage, state);
  }

  nextButtonClicked(event: EventEmitter<any>): void {
    if (this.nextEnabled) {
      let showIncompleteProfileModal: boolean =
        StepConstants.modalOnNavigation[this.currentPage];

      if (showIncompleteProfileModal && !this.userCanNavigateFurther) {
        this.profileCompletionService.pushShowIncompleteEvent();
        return;
      }
      this.router.navigate([this.nextUrl]);
    }
  }

  processClaims(): void {
    this.processClaimsButtonClick.emit();
  }

  get enabled(): boolean {
    return (
      Boolean(this.previousUrl) ||
      Boolean(this.nextUrl) ||
      this.processClaimsEnabled
    );
  }

  get canGoBack(): boolean {
    return Boolean(this.previousUrl);
  }

  get canGoForward(): boolean {
    return this.nextEnabled && Boolean(this.nextUrl);
  }

  get nextButtonActiveClass(): string {
    return this.canGoForward ? "active" : "inactive";
  }

  ngOnDestroy(): void {
    if (this.claimsStateChanged$) {
      this.claimsStateChanged$.unsubscribe();
      this.claimsStateChanged$ = null;
    }
  }

  private setPathForPage(page: string): void {
    if (page === StepConstants.MYCLAIMS) {
      this.previousUrl = null;
      this.nextUrl = StepConstants.routesForPage.DOCS;
    } else if (page === StepConstants.DOCS) {
      this.previousUrl = StepConstants.routesForPage.MYCLAIMS;
      this.nextUrl = StepConstants.routesForPage.FORMS;
    } else if (page === StepConstants.FORMS) {
      this.previousUrl = StepConstants.routesForPage.DOCS;
      this.nextUrl = StepConstants.routesForPage.REVIEW;
    } else if (page === StepConstants.REVIEW) {
      this.previousUrl = StepConstants.routesForPage.FORMS;
      this.nextUrl = null;
    }
  }

  private shouldNextButtonBeActive(
    page: string,
    state: ClaimStatusModel
  ): boolean {
    if (this.currentPage === StepConstants.MYCLAIMS) {
      return state.docs || state.forms || state.review;
    } else if (this.currentPage === StepConstants.DOCS) {
      return state.forms || state.review;
    } else if (this.currentPage === StepConstants.FORMS) {
      return state.review;
    } else {
      return false;
    }
  }
}
