import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { HeaderFooterModule } from "../../global/components/headerfooter/headerfooter.module";
import { DashboardHeaderComponent } from "./dashboardheader.component";

import { UserInfoService } from "../../global/userinfo.service";
/**
 * This module contains the header for the dashboard.
 */
@NgModule({
  imports: [CommonModule, RouterModule, HeaderFooterModule],
  declarations: [DashboardHeaderComponent],
  exports: [DashboardHeaderComponent],
  providers: [UserInfoService]
})
export class DashboardHeaderModule {}
