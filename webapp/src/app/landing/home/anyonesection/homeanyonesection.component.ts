import { Component } from "@angular/core";
import { LANDING_LINKS } from "../../../global/utils/landing-links";
import { SignUpModalService } from "src/app/loginsignup/signup/sign-up-modal.service";

/**
 * The page component for the main landing page which is displayed without any other URL
 */
@Component({
  selector: "cf-landing-anyone-section",
  templateUrl: "./homeanyonesection.component.html",
  styleUrls: [
    "../../../global/css/normalize.scss",
    "../../../global/css/webflow.scss",
    "./homeanyonesection.component.scss",
  ],
})
export class HomeAnyoneSectionComponent {
  links: any = LANDING_LINKS;

  constructor(private signUpModalService: SignUpModalService) {}

  showSignUpModal(event) {
    this.signUpModalService.showSignUpModal();
  }
}
