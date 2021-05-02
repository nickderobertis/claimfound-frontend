import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";

import { LoggerService } from "../../../global/logger.service";
import { ReferUserLegalEndpointModel } from "../../jumpoff/models/refer-user-legal.model";

import { RelativeClaimsService } from "../relativeclaims.service";
import { CFError } from "src/app/global/error.service";

/**
 * This is the main page component for the deceased claims page.
 *
 * This component directly handles routing the user to various external pages. The display of the
 * relatives and their claim totals is offloaded to
 * [DeceasedClaimsTotalsWidgetComponent]{@link DeceasedClaimsTotalsWidgetComponent}.
 *
 * Subcomponents:
 * * [DeceasedClaimsTotalsWidgetComponent]{@link DeceasedClaimsTotalsWidgetComponent}
 */
@Component({
  selector: "cf-deceased-claims-page",
  templateUrl: "./deceasedclaimspage.component.html",
  styleUrls: [
    "../../../global/css/normalize.scss",
    "../../../global/css/webflow.scss",
    "./deceasedclaimspage.component.scss",
  ],
})
export class DeceasedClaimsComponent implements OnInit {
  legalFoundLinkModel: ReferUserLegalEndpointModel;

  constructor(
    private relativeClaimsService: RelativeClaimsService,
    private logger: LoggerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.relativeClaimsService.getLegalFoundLink().subscribe(
      (result) => {
        this.legalFoundLinkModel = result;
      },
      (error: CFError) => this.handleGetLegalFoundLinkError(error)
    );
  }

  floridaBarLinkClick() {
    this.goToExternalLink("https://www.floridabar.org/");
  }

  noloLinkClick() {
    this.goToExternalLink("https://www.nolo.com/");
  }

  legalFoundLinkClick() {
    this.goToExternalLink(this.legalFoundLinkModel.legalFoundLink);
  }

  handleGetLegalFoundLinkError(error: CFError) {
    this.logger.error("Error getting legalfound link:" + error.toString());
  }

  goToExternalLink(url: string) {
    this.router.navigate(["/dashboard/exit", { goTo: url }]);
  }
}
