/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { Routes, RouterModule } from "@angular/router";

import { PrivacyComponent } from "./privacy.component";
import { TOSComponent } from "./tos.component";
import { AboutUsComponent } from "./aboutus.component";
import { LandingComponent } from "./landing.component";
import { HomeComponent } from "./home.component";
import { StoriesComponent } from "./stories.component";
import { AcknowledgementComponent } from "./acknowledgement.component";
import { ReferralLandingComponent } from "./referral/referrallanding.component";
import { HomeMapComponent } from "./location/home/homemap.component";

const LandingRoutes: Routes = [
  {
    path: "",
    component: LandingComponent,
    children: [
      { path: "", component: HomeComponent },
      { path: "map", redirectTo: "map/fl", pathMatch: "full" },
      { path: "map/:state/:location", component: HomeMapComponent },
      { path: "map/:state", component: HomeMapComponent },
      { path: "privacy", component: PrivacyComponent },
      { path: "tos", component: TOSComponent },
      { path: "aboutus", component: AboutUsComponent },
      { path: "unclaimed-money-success-stories", component: StoriesComponent },
      { path: "acknowledgements", component: AcknowledgementComponent },
      { path: "refer/:token", component: ReferralLandingComponent },
    ],
  },
];

export const landingRouting = RouterModule.forChild(LandingRoutes);
