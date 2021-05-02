/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { PartialScroll } from "../global/cf-classes/partial-scroll";
import {
  COMPANY_NAME,
  COMPANY_ADDRESS_LINE_1,
  COMPANY_ADDRESS_LINE_2,
  COMPANY_PHONE,
} from "../global/constants/companyinfo";
import { Title } from "@angular/platform-browser";

/**
 * The page component which shows the privacy policy
 */
@Component({
  selector: "cf-landing-privacy",
  templateUrl: "./privacy.component.html",
  styleUrls: [
    "../global/css/normalize.scss",
    "../global/css/webflow.scss",
    "./privacy-tos.component.scss",
  ],
})
export class PrivacyComponent extends PartialScroll {
  public companyName: string = COMPANY_NAME;
  public companyAddressLineOne: string = COMPANY_ADDRESS_LINE_1;
  public companyAddressLineTwo: string = COMPANY_ADDRESS_LINE_2;
  public companyPhone: string = COMPANY_PHONE;

  constructor(
    route: ActivatedRoute,
    router: Router,
    private titleService: Title
  ) {
    super(route, router);
    this.titleService.setTitle("ClaimFound Privacy Policy");
  }
}
