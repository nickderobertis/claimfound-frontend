import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { LoggerService } from "../../global/logger.service";
import { ClaimsBarService } from "../claimsbar/claimsbar.service";
import { ClaimsbarComponent } from "./claimsbar.component";
import { ClaimsBarDashboardComponent } from "./subdashboard/claimsbardashboard.component";

import { claimsbarRouting } from "./claimsbar.routes";

import { DashboardHeaderModule } from "../header/dashboardheader.module";
import { GlobalComponentsModule } from "src/app/global/components/globalcomponents.module";
import { LoadingService } from "src/app/global/services/loading.service";
import { ProfileCompletionService } from "../../global/services/profile-completion.service";

/**
 * The module which contains the main page component for the claims portion of the dashboard (My Claims, Upload Documents,
 * E-Sign Forms, and Final Review), as well as the claims bar which allows navigating between these pages.
 */
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    DashboardHeaderModule,
    claimsbarRouting,
    GlobalComponentsModule,
  ],
  declarations: [ClaimsbarComponent, ClaimsBarDashboardComponent],
  exports: [ClaimsBarDashboardComponent],
  providers: [
    LoggerService,
    ClaimsBarService,
    LoadingService,
    ProfileCompletionService,
  ],
})
export class ClaimsBarModule {}
