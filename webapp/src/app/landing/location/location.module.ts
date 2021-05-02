import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { LoggerService } from "../../global/logger.service";
import { LocationLandingComponent } from "./location-landing.component";
import { LocationOverviewComponent } from "./location-overview.component";
import { LocationTableComponent } from "./location-table.component";
import { LocationDropdownComponent } from "./location-dropdown.component";
import { MapService } from "./map.service";
import { GlobalComponentsModule } from "src/app/global/components/globalcomponents.module";
import { BrowserModule } from "@angular/platform-browser";
import { GoogleMapComponent } from './map/googlemap.component';
import { MapPointTableComponent } from './mappointtable/mappointtable.component';
import { ReferralModule } from 'src/app/referrals/referral.module';

/**
 * This module contains the location-specific landing pages with interactive maps where
 * users can explore the claims on a map
 */
@NgModule({
  imports: [CommonModule, RouterModule, BrowserModule, GlobalComponentsModule, ReferralModule],
  declarations: [
    LocationLandingComponent,
    LocationOverviewComponent,
    LocationTableComponent,
    LocationDropdownComponent,
    MapPointTableComponent,
    GoogleMapComponent
  ],
  exports: [LocationLandingComponent],
  providers: [LoggerService, MapService]
})
export class LocationLandingModule {}
