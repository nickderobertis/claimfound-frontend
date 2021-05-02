import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";

import { LoggerService } from "../../../global/logger.service";
import { Subscription } from "rxjs";
import { LoadingService } from "src/app/global/services/loading.service";

/**
 * The main page component for the claims portion of the dashboard (My Claims, Upload Documents,
 * E-Sign Forms, and Final Review).
 *
 * Directly contains the dashboard header and claims bar, and has a router outlet for the aforementioned pages.
 *
 * Subcomponents:
 * * [ClaimsbarComponent]{@link ClaimsbarComponent}
 * * [DashboardHeaderComponent]{@link DashboardHeaderComponent}
 */
@Component({
  selector: "cf-claimsbar-dashboard",
  templateUrl: "./claimsbardashboard.component.html",
  styleUrls: [
    "../../../global/css/normalize.scss",
    "../../../global/css/webflow.scss",
    "./claimsbardashboard.component.scss",
  ],
})
export class ClaimsBarDashboardComponent implements OnInit, OnDestroy {
  constructor(
    private logger: LoggerService,
    private loadingService: LoadingService,
    private cd: ChangeDetectorRef
  ) {}

  loading: boolean = false;

  toggleLoading$: Subscription;

  ngOnInit(): void {
    this.toggleLoading$ = this.loadingService.loadingEvent.subscribe(
      (event) => {
        this.handleLoading(event);
      }
    );
  }

  handleLoading(isLoading: boolean) {
    this.loading = isLoading;
    // We have added this extra change detection due to an error which was being triggered
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    this.toggleLoading$.unsubscribe();
  }
}
