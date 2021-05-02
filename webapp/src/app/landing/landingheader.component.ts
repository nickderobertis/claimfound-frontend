import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgModule } from "@angular/core";
import { landingSectionScroll } from "../global/utils/landing-section-scroll";
import { StorageService } from "../global/storage.service";
import { log, LoggerService } from "../global/logger.service";
import { SignUpModalService } from "../loginsignup/signup/sign-up-modal.service";

import { LANDING_LINKS } from "../global/utils/landing-links";

import {
  COMPANY_ADDRESS,
  COPYRIGHT_YEAR,
} from "../global/constants/companyinfo";
import { Subscription } from "rxjs";
import { DetermineLoginDashboardRouteService } from "../global/services/determine-login-dashboard-route.service";

/**
 * The header for all of the landing pages
 */
@Component({
  selector: "cf-landing-header",
  templateUrl: "./landingheader.component.html",
  styleUrls: [
    "../global/css/normalize.scss",
    "../global/css/webflow.scss",
    "./landingheader.component.scss",
  ],
})
export class LandingHeaderComponent implements OnInit {
  isLoggedIn: boolean;
  menuVisible: boolean = false;
  links: any = LANDING_LINKS;
  address: string = COMPANY_ADDRESS;
  year: number = COPYRIGHT_YEAR;

  gotRouteEvent$: Subscription;
  dashboardButtonRoute: string = this.links.header.dashboard.url;

  constructor(
    private router: Router,
    private signUpModalService: SignUpModalService,
    private logger: LoggerService,
    public storageService: StorageService,
    private routeFindingService: DetermineLoginDashboardRouteService
  ) {
    this.isLoggedIn = this.storageService.getToken() != null;
  }

  ngOnInit(): void {
    if (this.isLoggedIn) {
      this.gotRouteEvent$ = this.routeFindingService.gotRouteEvent.subscribe(
        (route: string) => {
          this.dashboardButtonRoute = route;
        }
      );
      this.routeFindingService.getRoute();
    }
  }

  scrollTo: (event, id: string, offset: number) => void;

  showMenu(event) {
    this.menuVisible = true;

    let $ = (window as any).jQuery;
    $("body").addClass("hamburger-menu");
  }

  hideMenu(event) {
    this.menuVisible = false;

    let $ = (window as any).jQuery;
    $("body").removeClass("hamburger-menu");
  }

  showSignUpModal(event) {
    this.logger.debug("emitting showSignUpModal from landing header");
    this.signUpModalService.showSignUpModal();
  }
}

LandingHeaderComponent.prototype.scrollTo = landingSectionScroll;
