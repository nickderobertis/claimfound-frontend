import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";

import { LoggerService } from "../../../global/logger.service";

import { SubmittedClaimsEndpointModel } from "../../../global/api/models/submittedclaimsendpoint.model";
import { SubmittedClaimsService } from "../submittedclaims.service";
import { CFError } from "src/app/global/error.service";

/**
 * The component on the submitted claims page which shows the total value and number of claims processed
 * for the user over multiple submissions.
 *
 * Directly interacts with the service to get the information.
 */
@Component({
  selector: "cf-submitted-claims-totals-widget",
  templateUrl: "./submittedclaimstotals.component.html",
  styleUrls: [
    "../../../global/css/normalize.scss",
    "../../../global/css/webflow.scss",
    "./submittedclaimstotals.component.scss",
  ],
})
export class SubmittedClaimsTotalsComponent implements OnInit {
  @Input() model: SubmittedClaimsEndpointModel = null;
  @Input() linkText = "View Claims";
  @Input() linkURL = "/dashboard/myclaims/submitted";
  @Output() showWidgetEmitter = new EventEmitter();
  loading: boolean = false;

  constructor(
    private submittedClaimsService: SubmittedClaimsService,
    private router: Router,
    private logger: LoggerService
  ) {}

  ngOnInit() {
    if (this.model == null) {
      this.loading = true;
      this.submittedClaimsService.getSubmittedClaims().subscribe(
        (result) => {
          this.setModelFromResult(result);
        },
        (error: CFError) => this.handleErrors(error)
      );
    }
  }

  handleErrors(error: CFError) {
    this.logger.error("Error getting submitted claims: " + error);
  }

  setModelFromResult(resultModel: SubmittedClaimsEndpointModel) {
    this.loading = false;
    this.model = resultModel;
    let showWidget = this.model.submittedClaims.length > 0;
    this.showWidgetEmitter.emit(showWidget);
  }

  onLinkClick() {
    this.router.navigate([this.linkURL]);
  }
}
