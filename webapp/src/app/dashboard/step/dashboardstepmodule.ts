import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { LoggerService } from "../../global/logger.service";
import { ClaimsBarService } from "../claimsbar/claimsbar.service";
import { ProfileCompletionService } from "../../global/services/profile-completion.service";

import { DashboardStepComponent } from "./dashboardstep.component";

/**
 * This module controls the next step button on the dashboard pages.
 *
 * It controls whether it should be highlighted depending on where the
 * user is in the process, and the text that the button should display.
 */
@NgModule({
  imports: [CommonModule, RouterModule, FormsModule],
  declarations: [DashboardStepComponent],
  exports: [DashboardStepComponent],
  providers: [LoggerService, ClaimsBarService, ProfileCompletionService],
})
export class DashboardStepModule {}
