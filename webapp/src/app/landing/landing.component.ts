/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import { Component, OnInit, OnDestroy } from "@angular/core";

import { LoggerService } from "../global/logger.service";
import { StorageService } from "../global/storage.service";
import { SignUpModalService } from "../loginsignup/signup/sign-up-modal.service";

import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { filter } from "rxjs/operators";
import { LandingModalService } from "./modal/landingmodal.service";

/**
 * The main landing page component, which is a router outlet to show the individual landing pages.
 *
 * Encompasses all of the pages which are outside of the main application.
 */
@Component({
  selector: "cf-landing",
  templateUrl: "./landing.component.html",
  providers: [LoggerService],
  styleUrls: [
    "../global/css/normalize.scss",
    "../global/css/webflow.scss",
    "./landing.component.scss",
  ],
})
export class LandingComponent implements OnInit, OnDestroy {
  popupDelay = 10000;
  timeout$: number;
  resetTimerCallback;
  showLandingModalCallback;

  constructor(
    private log: LoggerService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private signUpModalService: SignUpModalService,
    private landingModalService: LandingModalService,
    public router: Router
  ) {}

  ngOnInit() {
    this.log.debug("Landing component loaded");

    if (this.route.snapshot.fragment == "signup") {
      this.log.debug("emitting showSignUpModal from landing component");
      this.signUpModalService.showSignUpModal();
    }

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        (window as any).scrollTo(0, 0);
      });

    // Uncomment here as well as in ngOnDestroy to enable pop up on inactivity
    // if (this.storageService.getToken() == null) {
    //   this.setupTimers();
    // }
  }

  ngOnDestroy(): void {
    // Uncomment here as well as in ngOnInit to enable pop up on inactivity
    // document.removeEventListener("mousemove", this.resetTimerCallback);
    // document.removeEventListener("mousedown", this.resetTimerCallback);
    // document.removeEventListener("keydown", this.resetTimerCallback);
    // document.removeEventListener("touchmove", this.resetTimerCallback);
    // if (this.timeout$) {
    //   window.clearTimeout(this.timeout$);
    // }
  }

  resetTimer() {
    if (this.timeout$) {
      window.clearTimeout(this.timeout$);
      this.timeout$ = window.setTimeout(
        this.showLandingModalCallback,
        this.popupDelay
      );
    }
  }

  setupTimers() {
    this.showLandingModalCallback = () => {
      this.showInactivePopup();
    };
    this.resetTimerCallback = () => {
      this.resetTimer();
    };
    document.addEventListener("mousemove", this.resetTimerCallback, false);
    document.addEventListener("mousedown", this.resetTimerCallback, false);
    document.addEventListener("keydown", this.resetTimerCallback, false);
    document.addEventListener("touchmove", this.resetTimerCallback, false);

    this.timeout$ = window.setTimeout(
      this.showLandingModalCallback,
      this.popupDelay
    );
  }

  showInactivePopup() {
    if (this.storageService.getToken() == null) {
      this.landingModalService.showLandingModal();
    }
  }
}
