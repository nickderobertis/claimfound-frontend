import { Component, Input } from "@angular/core";
import { COMPANY_ADDRESS } from "../constants/companyinfo";

/**
 * The component which displays a modal which overlays on the screen and shows that the app is loading.
 *
 * In contrast to the [LoadingSpinnerComponent]{@link LoadingSpinnerComponent}, this covers much of the page.
 */
@Component({
  selector: "cf-loading-modal",
  templateUrl: "./loadingmodal.component.html",
  styleUrls: [
    "../css/normalize.scss",
    "../css/webflow.scss",
    "./loadingmodal.component.scss",
  ],
})
export class LoadingModalComponent {
  @Input() message?: string = "Loading...";
  address: string = COMPANY_ADDRESS;
}
