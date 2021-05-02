import {
  Component,
  Input,
  Output,
  OnInit,
  OnChanges,
  EventEmitter,
  SimpleChanges,
} from "@angular/core";

import { Router, NavigationStart, NavigationEnd } from "@angular/router";

import { LoggerService, log } from "../../../../global/logger.service";

import { RelativeClaimsEndpointModel } from "../../models/user-relative-claims.model";
import { RelativeClaimsService } from "../../relativeclaims.service";
import { RelativeClaimsTotalsAPIArgs } from "../../../../global/api/interfaces/endpoints/relative-claims/totals.interface";

/**
 * Displays for each of the user's relatives which are deceased, the total value and number of claims
 *
 * This component mainly handles interacting with the service to get the data to pass into
 * [DeceasedClaimsTotalsRowComponents]{@link DeceasedClaimsTotalsRowComponent} which handle the actual display.
 *
 * Subcomponents:
 * * [DeceasedClaimsTotalsRowComponent]{@link DeceasedClaimsTotalsRowComponent}
 */
@Component({
  selector: "cf-deceased-claims-totals-widget",
  templateUrl: "./deceasedclaimstotalswidget.component.html",
  styleUrls: [
    "../../../../global/css/normalize.scss",
    "../../../../global/css/webflow.scss",
    "./deceasedclaimstotalswidget.component.scss",
  ],
})
export class DeceasedClaimsTotalsWidgetComponent implements OnInit {
  model: RelativeClaimsEndpointModel = new RelativeClaimsEndpointModel({
    relatives: [],
  } as RelativeClaimsTotalsAPIArgs);
  loading: boolean = true;

  constructor(
    private relativeClaimsService: RelativeClaimsService,
    private logger: LoggerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.relativeClaimsService.getRelativeClaimsUserIsHeirOrUnsure().subscribe(
      (result) => {
        this.setModelFromResult(result);
      },
      (error) => this.handleGetRelativeClaimsError(error)
    );
  }

  handleGetRelativeClaimsError(error: any) {
    this.logger.error("Error getting relative claims:", error);
  }

  setModelFromResult(resultModel: RelativeClaimsEndpointModel) {
    this.loading = false;
    this.model = resultModel;
  }
}
