import { Component, Input } from "@angular/core";

import { RelativeClaimsWidgetModel } from "../../models/relative-claims-aggregate-widget.model";

/**
 * A widget which shows the claim totals for family claims, and shows a link to the family claims page.
 */
@Component({
  selector: "cf-family-claims-widget",
  templateUrl: "./familyclaimswidget.component.html",
  styleUrls: [
    "../../../../global/css/normalize.scss",
    "../../../../global/css/webflow.scss",
    "./familyclaimswidget.component.scss",
  ],
})
export class FamilyClaimsWidgetComponent {
  @Input() model: RelativeClaimsWidgetModel = new RelativeClaimsWidgetModel();

  get displayProfileLink(): boolean {
    return (
      !this.model.searchesInProgress &&
      (!this.model.hasRelatives ||
        (this.model.hasDeadRelatives &&
          this.model.aggregateClaimsTotalModel.numberOfPeople == 0))
    );
  }

  get noRelativeHasClaims(): boolean {
    return (
      !this.model.searchesInProgress &&
      this.model.hasRelatives &&
      this.model.aggregateClaimsTotalModel.numberOfClaims == null
    );
  }

  get showInProgress(): boolean {
    return this.model.searchesInProgress;
  }

  get displayRelativeTotals(): boolean {
    return (
      !this.model.searchesInProgress &&
      this.model.hasRelatives &&
      this.model.aggregateClaimsTotalModel.numberOfClaims > 0
    );
  }
}
