import { Component, Input } from "@angular/core";
import { Claim } from "src/app/global/models/claim.model";

/**
 * The table which is used throughout the app to show claim information.
 *
 * This component is just a wrapper around [ClaimTableRowComponent]{@link ClaimTableRowComponent} which
 * shows the information for an individual claim.
 *
 * Subcomponents:
 * * [ClaimTableRowComponent]{@link ClaimTableRowComponent}
 */
@Component({
  selector: "cf-claim-table",
  templateUrl: "./claim-table.component.html",
  styleUrls: ["./claim-table.component.scss"],
})
export class ClaimTableComponent {
  @Input() model: Claim[] = [];

  constructor() {}
}
