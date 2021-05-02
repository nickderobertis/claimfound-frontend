import { Component } from "@angular/core";
import { LANDING_LINKS } from "../../../global/utils/landing-links";

/**
 * The page component for the main landing page which is displayed without any other URL
 */
@Component({
  selector: "cf-landing-testimonial-section",
  templateUrl: "./hometestimonialsection.component.html",
  styleUrls: [
    "../../../global/css/normalize.scss",
    "../../../global/css/webflow.scss",
    "./hometestimonialsection.component.scss",
  ],
})
export class HomeTestimonialSectionComponent {
  links: any = LANDING_LINKS;

  constructor() {}
}
