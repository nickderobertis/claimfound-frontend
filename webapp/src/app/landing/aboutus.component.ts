/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";

/**
 * The About Us page component which displays info about ClaimFound
 */
@Component({
  selector: "cf-landing-aboutus",
  templateUrl: "./aboutus.component.html",
  styleUrls: [
    "../global/css/normalize.scss",
    "../global/css/webflow.scss",
    "./aboutus.component.scss",
  ],
})
export class AboutUsComponent {
  constructor(private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle("ClaimFound: About Us");
  }
}
