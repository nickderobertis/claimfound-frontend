import { Component, Input, OnInit } from "@angular/core";
import { FillAddressModel } from "../../models/formspage.model";
import { FillItemBaseComponent } from "../fillitembase";
import { Router } from "@angular/router";

/**
 * The component in which the user provides the address to be placed on the
 * e-signed forms.
 */
@Component({
  selector: "cf-fill-address",
  templateUrl: "./filladdress.component.html",
  styleUrls: [
    "../../../../../global/css/normalize.scss",
    "../../../../../global/css/webflow.scss",
    "./filladdress.component.scss",
  ],
})
export class FillAddressComponent extends FillItemBaseComponent
  implements OnInit {
  @Input() model: FillAddressModel;

  formConstants: { [key: string]: string } = {
    streetAddress: "streetAddress",
    city: "city",
    state: "state",
    zipCode: "zipCode",
  };

  constructor(public router: Router) {
    super();
  }

  ngOnInit(): void {
    this.fillAndSignForm.controls[this.formConstants.streetAddress].setValue(
      this.model.data.street_address
    );
    this.fillAndSignForm.controls[this.formConstants.city].setValue(
      this.model.data.city
    );
    this.fillAndSignForm.controls[this.formConstants.state].setValue(
      this.model.data.state
    );
    this.fillAndSignForm.controls[this.formConstants.zipCode].setValue(
      this.model.data.zip_code
    );
  }

  get getAddressAsOneLine() {
    return (
      this.model.data.street_address +
      ", " +
      this.model.data.city +
      ", " +
      this.model.data.state +
      " " +
      this.model.data.zip_code
    );
  }

  onClickProfileLink() {
    this.router.navigate(["/dashboard/profile/addresses"]);
  }
}
