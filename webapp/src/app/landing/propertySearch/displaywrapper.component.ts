/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { Component, Input } from "@angular/core";
import { StateWiseSplit } from "./models/state-wise-split.model";

/**
 * A wrapper around the display of the claim totals in the property search
 */
@Component({
  selector: "cf-display-wrapper",
  templateUrl: "./displaywrapper.component.html",
  styleUrls: [
    "../../global/css/normalize.scss",
    "../../global/css/webflow.scss",
    "./displaywrapper.component.scss",
  ],
})
export class DisplayWrapperComponent {
  @Input() stateListSupported: StateWiseSplit[];
  @Input() stateName: string;
  @Input() numberOfClaims: number;
  @Input() totalValue: number;
  @Input() average: number;
}
