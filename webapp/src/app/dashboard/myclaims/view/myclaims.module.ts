import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { LoggerService } from "../../../global/logger.service";
import { StorageService } from "../../../global/storage.service";
import { GlobalComponentsModule } from "../../../global/components/globalcomponents.module";

import { MyClaimsComponent } from "./myclaims.component";
import { MyClaimsBoxComponent } from "./claimsbox/myclaimsbox.component";
import { MyClaimsService } from "./myclaims.service";
import { RelativeClaimsWidgetContainerComponent } from "../../relativeclaims/myclaimswidget/relativeclaimswidgetcontainer.component";
import { FamilyClaimsWidgetComponent } from "../../relativeclaims/myclaimswidget/familyclaims/familyclaimswidget.component";
import { DeceasedClaimsWidgetComponent } from "../../relativeclaims/myclaimswidget/deceasedclaims/deceasedclaimswidget.component";

import { DashboardStepModule } from "../../step/dashboardstepmodule";
import { SubmittedClaimsModule } from "../../submittedclaims/submittedclaims.module";
import { LoadingService } from "src/app/global/services/loading.service";
import { ProfileCompletionService } from "../../../global/services/profile-completion.service";
import { RelativeClaimsModule } from "../../relativeclaims/relativeclaims.module";

/**
 * This module contains the My Claims page.
 *
 * The My Claims page is currently handling displaying the user’s claims,
 * family claims, deceased claims, submitted claims, and the claim steps.
 */
@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    GlobalComponentsModule,
    DashboardStepModule,
    SubmittedClaimsModule,
  ],
  declarations: [
    MyClaimsComponent,
    MyClaimsBoxComponent,
    RelativeClaimsWidgetContainerComponent,
    FamilyClaimsWidgetComponent,
    DeceasedClaimsWidgetComponent,
  ],
  exports: [MyClaimsComponent, DeceasedClaimsWidgetComponent],
  providers: [
    LoggerService,
    MyClaimsService,
    StorageService,
    LoadingService,
    ProfileCompletionService,
  ],
})
export class MyClaimsModule {}
