/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { Component, Input } from "@angular/core";

/**
 * A single field showing the number of claims, total amount of claims, or average value of claims
 * in the property search
 */
@Component({
  selector: "cf-display-div",
  templateUrl: "./displaydiv.component.html",
  styleUrls: [
    "../../global/css/normalize.scss",
    "../../global/css/webflow.scss",
    "./displaydiv.component.scss",
  ],
})
export class DisplayDivComponent {
  @Input() isState: boolean;
  @Input() stateName: string;
  @Input() name: string;
  @Input() number: number;
  @Input() currency: boolean;
}
