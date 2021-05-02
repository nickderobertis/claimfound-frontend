import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { GlobalComponentsModule } from "../../global/components/globalcomponents.module";
import { ReferralModule } from "../../referrals/referral.module";
import { LoggerService } from "../../global/logger.service";

import { FamilyClaimsComponent } from "./familyclaimspage/familyclaimspage.component";
import { RelativePanelComponent } from "./familyclaimspage/relativepanel/relativepanel.component";
import { DeceasedClaimsComponent } from "./deceasedclaimspage/deceasedclaimspage.component";
import { DeceasedClaimsTotalsWidgetComponent } from "./deceasedclaimspage/deceasedclaimstotalswidget/deceasedclaimstotalswidget.component";
import { DeceasedClaimsTotalsRowComponent } from "./deceasedclaimspage/deceasedclaimstotalswidget/deceasedclaimstotalsrow.component";
import { RelativeClaimsService } from "./relativeclaims.service";
import { MyClaimsModule } from "../myclaims/view/myclaims.module";
import { AddedClaimToDashboardComponent } from './familyclaimspage/claimaddedtodashboardmodal/claimaddedtodashboardmodal.component';

/**
 * This module contains both the Family Claims page and the Deceased Claims page,
 * along with the widgets for both that appear on the My Claims page.
 *
 * The Family Claims page highlights the user’s family members that have claims,
 * with ways to refer to the family member. It also asks the user if the family member
 * is deceased and if they’re on their will. Once there are deceased family members where
 * the user is on the will (or unsure), the Deceased Claims page will be populated.
 *
 * The Deceased Claims page displays the totals of the claims, but otherwise is pretty static,
 * with links to external pages to find a lawyer handle the claims.
 */
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    GlobalComponentsModule,
    ReferralModule,
    MyClaimsModule,
  ],
  declarations: [
    FamilyClaimsComponent,
    RelativePanelComponent,
    DeceasedClaimsComponent,
    DeceasedClaimsTotalsWidgetComponent,
    DeceasedClaimsTotalsRowComponent,
    AddedClaimToDashboardComponent,
  ],
  providers: [LoggerService, RelativeClaimsService],
})
export class RelativeClaimsModule {}
