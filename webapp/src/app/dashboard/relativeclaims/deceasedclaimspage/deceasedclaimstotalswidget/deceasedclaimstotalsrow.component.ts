import { Component, Input } from "@angular/core";

import { RelativeClaimsModel } from "../../models/relative-claims.model";

/**
 * A single row of the table on the Deceased Claims page which shows for each relative, the
 * total value and number of claims.
 */
@Component({
  selector: "cf-deceased-claims-totals-row",
  templateUrl: "./deceasedclaimstotalsrow.component.html",
  styleUrls: [
    "../../../../global/css/normalize.scss",
    "../../../../global/css/webflow.scss",
    "./deceasedclaimstotalsrow.component.scss",
  ],
})
export class DeceasedClaimsTotalsRowComponent {
  @Input() model: RelativeClaimsModel;
}
