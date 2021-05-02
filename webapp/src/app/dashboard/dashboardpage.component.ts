import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { LoadingService } from "../global/services/loading.service";
import { Subscription } from "rxjs";

import { LoggerService } from "../global/logger.service";

/**
 * The component which holds the struture of the dashboard.
 *
 * It contains the header, footer, and a router outlet for the individual dashboard pages.
 */
@Component({
  selector: "dashboard-page",
  templateUrl: "./dashboardpage.component.html",
  styleUrls: [
    "./dashboardpage.component.scss",
    "../global/css/normalize.scss",
    "../global/css/webflow.scss",
  ],
})
export class DashboardPageComponent implements OnDestroy, OnInit {
  public expanded: boolean = false;
  loading: boolean = false;

  toggleLoading$: Subscription;

  constructor(
    private logger: LoggerService,
    private loadingService: LoadingService,
    private cd: ChangeDetectorRef
  ) {}

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

  setExpand(expand: boolean) {
    this.expanded = expand;
  }

  ngOnDestroy() {
    this.toggleLoading$.unsubscribe();
  }
}
