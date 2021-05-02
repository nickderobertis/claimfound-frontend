import { Component, Input } from "@angular/core";

import { ProfileStepModel } from "./profilestep.model";
import { ProfileService } from "../profile.service";

/**
 * Contains the next and back buttons for the profile and questions pages.
 */
@Component({
  selector: "cf-profile-step-component",
  templateUrl: "./profilestep.component.html",
  styleUrls: [
    "../../../global/css/normalize.scss",
    "../../../global/css/webflow.scss",
    "./profilestep.component.scss",
  ],
})
export class ProfileStepComponent {
  @Input() model: ProfileStepModel;

  constructor(private profileService: ProfileService) {}

  onNextButtonClick(): void {
    if (this.model.nextActive) {
      this.profileService.navigateProfile(this.model.nextURL);
    }
  }

  onPrevButtonClick(): void {
    if (this.model.prevActive) {
      this.profileService.navigateProfile(this.model.prevURL);
    }
  }

  get prevButtonClass(): string {
    if (!this.model.showPrev) {
      return "disabled";
    }
    return !this.model.prevActive ? "incomplete" : "";
  }

  get nextButtonClass(): string {
    if (!this.model.showNext) {
      return "disabled";
    }
    return !this.model.nextActive ? "incomplete" : "";
  }
}
