import { Component, Input, OnInit } from "@angular/core";
import { FillPhoneModel } from "../../models/formspage.model";
import { FillItemBaseComponent } from "../fillitembase";
import { Router } from "@angular/router";

/**
 * The component in which the user provides the phone number to be placed on the
 * e-signed forms.
 */
@Component({
  selector: "cf-fill-phone",
  templateUrl: "./fillphone.component.html",
  styleUrls: [
    "../../../../../global/css/normalize.scss",
    "../../../../../global/css/webflow.scss",
    "./fillphone.component.scss",
  ],
})
export class FillPhoneComponent extends FillItemBaseComponent
  implements OnInit {
  @Input() model: FillPhoneModel;

  formConstants: { [key: string]: string } = {
    phone: "phone",
  };

  constructor(public router: Router) {
    super();
  }

  ngOnInit(): void {
    this.fillAndSignForm.controls[this.formConstants.phone].setValue(
      this.model.data.phone.slice(1)
    );
  }

  get formattedPhoneNumber(): string {
    let pre: string = this.model.data.phone.slice(1, 2);
    let area: string = this.model.data.phone.slice(2, 5);
    let mid: string = this.model.data.phone.slice(5, 8);
    let last: string = this.model.data.phone.slice(8);
    return pre + " (" + area + ") " + mid + "-" + last;
  }

  onClickProfileLink() {
    this.router.navigate(["/dashboard/profile/phones"]);
  }
}
