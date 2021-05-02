import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { PropertySearchComponent } from "./propertysearch.component";
import { PropertySearchService } from "./propertysearch.service";

import { SearchWrapperComponent } from "./searchwrapper.component";
import { SearchDivComponent } from "./searchdiv.component";

import { DisplayContainerComponent } from "./displaycontainer.component";
import { DisplayWrapperComponent } from "./displaywrapper.component";
import { DisplayDivComponent } from "./displaydiv.component";

import { GlobalComponentsModule } from "../../global/components/globalcomponents.module";
import { ReferralModule } from "../../referrals/referral.module";
import { GlobalDirectivesModule } from "../../global/directives/global-directives.module";
import { CommonModule } from "@angular/common";
import { SignUpModalService } from "src/app/loginsignup/signup/sign-up-modal.service";
import { MockSearchService } from "./mock-search.service";

/**
 * The Property Search module allows the user to look up for a first and last name,
 * how much total unclaimed property there is available.
 *
 * We place the property search component on many landing pages and it will also come
 * to the dashboard eventually. On loading the component, it requests the backend for
 * supported states, which will populate the state dropdown. When a user searches it
 * queries the backend for the number of matches for that user in those states and
 * displays them. The user can either go right into sign up or refer someone from the
 * property search component.
 */
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    CommonModule,
    GlobalComponentsModule,
    GlobalDirectivesModule,
    ReferralModule,
  ],
  declarations: [
    PropertySearchComponent,
    SearchWrapperComponent,
    SearchDivComponent,
    DisplayContainerComponent,
    DisplayWrapperComponent,
    DisplayDivComponent,
  ],
  exports: [PropertySearchComponent],
  providers: [PropertySearchService, SignUpModalService, MockSearchService],
})
export class PropertySearchModule {}
