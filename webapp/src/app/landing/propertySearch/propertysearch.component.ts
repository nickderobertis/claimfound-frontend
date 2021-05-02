/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { Component } from "@angular/core";

/**
 * The main component for the property search where the user can search a first and last
 * name and get claim totals.
 *
 * ## Organization
 *
 * The property search is a set of nested components:
 * * [SearchWrapperComponent]{@link SearchWrapperComponent}
 *     * [SearchDivComponent]{@link SearchDivComponent}
 *     * [NamesearchDropdownComponent]{@link NamesearchDropdownComponent}
 * * [DisplayContainerComponent]{@link DisplayContainerComponent}
 *     * [DisplayWrapperComponent]{@link DisplayWrapperComponent}
 *         * [DisplayDivComponent]{@link DisplayDivComponent}
 *     * [EmailSignupComponent]{@link EmailSignupComponent}
 *     * [ReferralBarComponent]{@link ReferralBarComponent}
 */
@Component({
  selector: "cf-property-search",
  templateUrl: "./propertysearch.component.html",
  styleUrls: [
    "../../global/css/normalize.scss",
    "../../global/css/webflow.scss",
    "./propertysearch.component.scss",
  ],
})
export class PropertySearchComponent {}
