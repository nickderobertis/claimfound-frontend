import { Component } from "@angular/core";

import { COMPANY_ADDRESS } from "../../../constants/companyinfo";

@Component({
  selector: "cf-footer",
  templateUrl: "./footer.component.html",
  styleUrls: [
    "./footer.component.scss",
    "../../../../global/css/normalize.scss",
    "../../../../global/css/webflow.scss",
  ],
})
export class FooterComponent {
  address: string = COMPANY_ADDRESS;
}
