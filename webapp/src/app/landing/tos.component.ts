import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { PartialScroll } from "../global/cf-classes/partial-scroll";
import { COMPANY_NAME_AND_ADDRESS } from "../global/constants/companyinfo";
import { Title } from "@angular/platform-browser";

/**
 * The page component which shows the terms of service
 */
@Component({
  selector: "cf-landing-tos",
  templateUrl: "./tos.component.html",
  styleUrls: [
    "../global/css/normalize.scss",
    "../global/css/webflow.scss",
    "./privacy-tos.component.scss",
  ],
})
export class TOSComponent extends PartialScroll {
  public companyAddress: string = COMPANY_NAME_AND_ADDRESS;

  constructor(
    route: ActivatedRoute,
    router: Router,
    private titleService: Title
  ) {
    super(route, router);
  }

  ngOnInit() {
    this.titleService.setTitle("ClaimFound Terms of Service");
  }
}
