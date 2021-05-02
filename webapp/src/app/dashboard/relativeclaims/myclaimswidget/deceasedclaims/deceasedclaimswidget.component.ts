import { Component, Input } from "@angular/core";

import { RelativeClaimsWidgetModel } from "../../models/relative-claims-aggregate-widget.model";

/**
 * A widget which shows the claim totals for deceased claims, and shows a link to the deceased claims page.
 */
@Component({
  selector: "cf-deceased-claims-widget",
  templateUrl: "./deceasedclaimswidget.component.html",
  styleUrls: [
    "../../../../global/css/normalize.scss",
    "../../../../global/css/webflow.scss",
    "./deceasedclaimswidget.component.scss",
  ],
})
export class DeceasedClaimsWidgetComponent {
  @Input() model: RelativeClaimsWidgetModel;

  get displayProfileLink(): boolean {
    return (
      !this.model.searchesInProgress &&
      this.model.hasRelatives &&
      this.deceasedClaimsAreEmpty()
    );
  }

  get displayRelativeTotals(): boolean {
    return (
      !this.model.searchesInProgress &&
      this.model.hasRelatives &&
      !this.deceasedClaimsAreEmpty()
    );
  }

  deceasedClaimsAreEmpty() {
    return this.model.aggregateClaimsTotalModel.numberOfClaims <= 0;
  }
}
