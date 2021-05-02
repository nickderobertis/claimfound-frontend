import { Component, Input } from "@angular/core";
import { Claim } from "src/app/global/models/claim.model";

/**
 * The component which displays claim information on the My CLaims page
 */
@Component({
  selector: "cf-my-claims-box",
  templateUrl: "./myclaimsbox.component.html",
  styleUrls: [
    "../../../../global/css/normalize.scss",
    "../../../../global/css/webflow.scss",
    "./myclaimsbox.component.scss",
  ],
})
export class MyClaimsBoxComponent {
  @Input() title: string = "My Claims";
  @Input() details: Claim[];
  @Input() dispModal: boolean = false;

  get displayNoClaims(): boolean {
    return this.details.length <= 0;
  }
}
