import { Component, OnInit, OnDestroy } from "@angular/core";

import { SplashPageService } from "./splashpage.service";

@Component({
  selector: "cf-landing-temp",
  templateUrl: "./splashpage.component.html",
  styleUrls: [
    "./splashpage.component.scss",
    "../../global/css/normalize.scss",
    "../../global/css/webflow.scss",
  ],
})
/**
 * Component used to display a splash page briefly after the user logs in.
 */
export class SplashPageComponent implements OnInit, OnDestroy {
  subscription: any;

  constructor(private _splashService: SplashPageService) {}

  ngOnInit() {
    this._splashService.init();
  }

  ngOnDestroy() {
    this._splashService.destroy();
  }
}
