/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { StorageService } from "../global/storage.service";
import { SignUpModalService } from "../loginsignup/signup/sign-up-modal.service";
import { landingSectionScroll } from "../global/utils/landing-section-scroll";
import { log, LoggerService } from "../global/logger.service";

import { LANDING_LINKS } from "../global/utils/landing-links";

import {
  COMPANY_ADDRESS_LINE_1,
  COMPANY_ADDRESS_LINE_2,
  COPYRIGHT_YEAR,
} from "../global/constants/companyinfo";

/**
 * The footer for all of the landing pages
 */
@Component({
  selector: "cf-landing-footer",
  templateUrl: "./landingfooter.component.html",
  styleUrls: [
    "../global/css/normalize.scss",
    "../global/css/webflow.scss",
    "./landingfooter.component.scss",
  ],
})
export class LandingFooterComponent {
  isLoggedIn: boolean;
  links: any = LANDING_LINKS;
  address_1: string = COMPANY_ADDRESS_LINE_1;
  address_2: string = COMPANY_ADDRESS_LINE_2;
  year: number = COPYRIGHT_YEAR;

  constructor(
    private router: Router,
    private signUpModalService: SignUpModalService,
    private logger: LoggerService,
    public storageService: StorageService
  ) {
    this.isLoggedIn = this.storageService.getToken() != null;
  }

  scrollTo: (event, id: string, offset: number) => void;

  showSignUpModal(event) {
    this.logger.debug("emitting show signupModal from landing footer");
    this.signUpModalService.showSignUpModal();
  }
}

LandingFooterComponent.prototype.scrollTo = landingSectionScroll;
