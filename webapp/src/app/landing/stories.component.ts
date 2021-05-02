import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";

/**
 * The main page componen for the User Stories landing page
 */
@Component({
  selector: "cf-landing-stories",
  templateUrl: "./stories.component.html",
  styleUrls: [
    "../global/css/normalize.scss",
    "../global/css/webflow.scss",
    "./stories.component.scss",
  ],
})
export class StoriesComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle("ClaimFound: Unclaimed Money Success Stories");
  }
}
