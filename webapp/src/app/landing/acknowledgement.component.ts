/**
 * Created by christofferprompovitch on 1/18/18.
 */

import { Component, OnInit } from "@angular/core";

import { AcknowledgementService } from "./acknowledgement.service";

import { LoggerService } from "../global/logger.service";

import { FRONTENDPACKAGES } from "./frontend.packages";
import { LANDING_LINKS } from "../global/utils/landing-links";
import { Title } from "@angular/platform-browser";
import { CFError } from "../global/error.service";

/**
 * The Acknowledgements page component where we display attributions for packages
 */
@Component({
  selector: "cf-landing-acknowledgement",
  templateUrl: "./acknowledgement.component.html",
  styleUrls: [
    "../global/css/normalize.scss",
    "../global/css/webflow.scss",
    "./acknowledgement.component.scss",
  ],
  providers: [AcknowledgementService],
})
export class AcknowledgementComponent implements OnInit {
  links: any = LANDING_LINKS;

  serverPackages = [];
  serverError: string;
  frontendPackages = FRONTENDPACKAGES;

  constructor(
    private acknowledgementService: AcknowledgementService,
    private logger: LoggerService,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.acknowledgementService.getCredits().subscribe(
      (result) => this.displayServerCredits(result),
      (error: CFError) => this.handleGetError(error)
    );
    this.logger.debug(this.frontendPackages);
    this.titleService.setTitle("ClaimFound Acknowledgements");
  }

  displayServerCredits(result) {
    this.serverPackages = result.installedPackages;
  }

  handleGetError(error: CFError) {
    this.serverError = "Sorry, please check again later!";
  }
}
