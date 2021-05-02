/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { Routes, RouterModule } from "@angular/router";
import { DashboardPageComponent } from "./dashboardpage.component";
import { AccountComponent } from "./account/account.component";
import { PrivacyComponent } from "./privacy/privacy.component";
import { TOSComponent } from "./tos/tos.component";
import { SuccessComponent } from "./claim/success/success.component";
import { FamilyClaimsComponent } from "./relativeclaims/familyclaimspage/familyclaimspage.component";
import { DeceasedClaimsComponent } from "./relativeclaims/deceasedclaimspage/deceasedclaimspage.component";
import { JumpoffPageComponent } from "./jumpoff/jumpoff.component";
import { SubmittedClaimsPageComponent } from "./submittedclaims/submittedclaimspage.component";
import { SelectClaimsPageComponent } from "./myclaims/select/selectclaimspage.component";
import { ClaimsBarDashboardComponent } from "./claimsbar/subdashboard/claimsbardashboard.component";
import { ProfileComponent } from "./profile/profile.component";

const DashboardRoutes: Routes = [
  {
    path: "dashboard",
    component: DashboardPageComponent,
    children: [
      { path: "", redirectTo: "myclaims", pathMatch: "full" },
      { path: "profile", component: ProfileComponent },
      { path: "myclaims", component: ClaimsBarDashboardComponent },
      { path: "myclaims/select", component: SelectClaimsPageComponent },
      { path: "account", component: AccountComponent },
      { path: "privacy", component: PrivacyComponent },
      { path: "tos", component: TOSComponent },
      { path: "claim", component: ClaimsBarDashboardComponent },
      { path: "claim/success", component: SuccessComponent },
      { path: "familyclaims", component: FamilyClaimsComponent },
      { path: "deceasedclaims", component: DeceasedClaimsComponent },
      { path: "exit", component: JumpoffPageComponent },
      { path: "myclaims/submitted", component: SubmittedClaimsPageComponent },
    ]
  }
];

export const dashboardRouting = RouterModule.forChild(DashboardRoutes);
