/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { LoggerService } from "../global/logger.service";
import { ClaimsBarService } from "./claimsbar/claimsbar.service";

import { AccountModule } from "./account/account.module";
import { MyClaimsModule } from "./myclaims/view/myclaims.module";
import { UploadModule } from "./claim/upload/upload.module";
import { PaymentModule } from "./claim/payment/payment.module";
import { GlobalPipesModule } from "../global/pipes/globalpipes.module";
import { HeaderFooterModule } from "../global/components/headerfooter/headerfooter.module";
import { GlobalComponentsModule } from "../global/components/globalcomponents.module";
import { DashboardStepModule } from "./step/dashboardstepmodule";
import { RelativeClaimsModule } from "./relativeclaims/relativeclaims.module";
import { JumpoffModule } from "./jumpoff/jumpoff.module";
import { SubmittedClaimsModule } from "./submittedclaims/submittedclaims.module";
import { SelectClaimsModule } from "./myclaims/select/selectclaims.module";
import { ClaimsBarModule } from "./claimsbar/claimsbar.module";
import { DashboardHeaderModule } from "./header/dashboardheader.module";

import { dashboardRouting } from "./dashboardpage.routes";

import { DashboardPageComponent } from "./dashboardpage.component";
import { PrivacyComponent } from "./privacy/privacy.component";
import { TOSComponent } from "./tos/tos.component";
import { SuccessComponent } from "./claim/success/success.component";
import { RelativeClaimsService } from "./relativeclaims/relativeclaims.service";
import { ProfileModule } from "./profile/profile.module";

import { FormsPageModule } from "./claim/esign/formspage.module";
/**
 * The dashboard encompasses everything in the application once the user signs in.
 *
 * The dashboard module is directly responsible for providing the common structure
 * of pages on the dashboard. It also contains dashboard versions of the privacy and
 * terms of service pages, as well as the page which is displayed after the user
 * successfully submits claims.
 *
 * Most of the functionality is delegated to submodules, including:
 * [AccountModule]{@link AccountModule}
 * [MyClaimsModule]{@link MyClaimsModule}
 * [ProfileModule]{@link ProfileModule}
 * [UploadModule]{@link UploadModule}
 * [DashboardFormsModule]{@link DashboardFormsModule}
 * [PaymentModule]{@link PaymentModule}
 * [HeaderFooterModule]{@link HeaderFooterModule}
 * [DashboardStepModule]{@link DashboardStepModule}
 * [RelativeClaimsModule]{@link RelativeClaimsModule}
 * [JumpoffModule]{@link JumpoffModule}
 * [SubmittedClaimsModule]{@link SubmittedClaimsModule}
 * [SelectClaimsModule]{@link SelectClaimsModule}
 * [ClaimsBarModule]{@link ClaimsBarModule}
 * [DashboardHeaderModule]{@link DashboardHeaderModule}
 */
@NgModule({
  imports: [
    AccountModule,
    MyClaimsModule,
    ProfileModule,
    UploadModule,
    PaymentModule,
    CommonModule,
    RouterModule,
    dashboardRouting,
    GlobalPipesModule,
    HeaderFooterModule,
    GlobalComponentsModule,
    DashboardStepModule,
    RelativeClaimsModule,
    JumpoffModule,
    SubmittedClaimsModule,
    SelectClaimsModule,
    ClaimsBarModule,
    DashboardHeaderModule,
    FormsPageModule
  ],
  declarations: [
    DashboardPageComponent,
    PrivacyComponent,
    TOSComponent,
    SuccessComponent
  ],
  providers: [LoggerService, ClaimsBarService, RelativeClaimsService]
})
export class DashboardModule {}
