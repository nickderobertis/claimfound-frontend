/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { Component } from "@angular/core";

import { LANDING_LINKS } from "../global/utils/landing-links";

/**
 * The page component for the main landing page which is displayed without any other URL
 */
@Component({
  selector: "cf-landing-home",
  templateUrl: "./home.component.html",
  styleUrls: [
    "../global/css/normalize.scss",
    "../global/css/webflow.scss",
    "./home.component.scss",
  ],
})
export class HomeComponent {
  links: any = LANDING_LINKS;

  constructor() {}
}
