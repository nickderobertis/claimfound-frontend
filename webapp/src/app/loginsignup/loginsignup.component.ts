import { Component, OnDestroy } from "@angular/core";
import { LoadingService } from "../global/services/loading.service";
import { Subscription } from "rxjs";

/**
 * The main page coponent for the login, logout, forgot password, verify, and reverse
 * change to email pages.
 *
 * This component contains the header, footer, and loading modal, and a router outlet
 * inbetween to switch out the various pages.
 */
@Component({
  selector: "login-signup-page",
  templateUrl: "./loginsignup.component.html",
})
export class LoginSignupComponent {
  loading: boolean = false;

  toggleLoading$: Subscription;

  constructor(private loadingService: LoadingService) {
    this.toggleLoading$ = this.loadingService.loadingEvent.subscribe(event => {
      this.handleLoading(event);
    });
  }

  handleLoading(isLoading: boolean) {
    this.loading = isLoading;
  }

  ngOnDestroy() {
    this.toggleLoading$.unsubscribe();
  }
}
