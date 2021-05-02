/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { LoggerService } from "../../../global/logger.service";

import { GlobalPipesModule } from "../../../global/pipes/globalpipes.module";
import { GlobalComponentsModule } from "../../../global/components/globalcomponents.module";

import { PaymentComponent } from "./payment.component";
import { PaymentReviewClaimsComponent } from "./paymentreviewclaims.component";
import { PaymentCheckoutComponent } from "./paymentcheckout.component";
import { PaymentService } from "./payment.service";
import { DashboardStepModule } from "../../step/dashboardstepmodule";
import { ClaimReviewModule } from "../review/claimreview.module";
import { LoadingService } from "src/app/global/services/loading.service";
import { RequirementModalComponent } from "./requirement-modal/requirement-modal.component";

/**
 * This is the module which contains the Final Review page.
 *
 * The [PaymentReviewClaimsComponent]{@link PaymentReviewClaimsComponent}
 * provides the main functionality on the page
 * to view documents and forms associated with the claims.
 *
 * This name is now a misnomer, as the process is completely free.
 * This name has stuck around since the prototype where we were originally going to
 * charge per claim.
 */
@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    RouterModule,
    FormsModule,
    GlobalPipesModule,
    GlobalComponentsModule,
    DashboardStepModule,
    ClaimReviewModule,
  ],
  declarations: [
    PaymentComponent,
    PaymentReviewClaimsComponent,
    PaymentCheckoutComponent,
    RequirementModalComponent,
  ],
  exports: [PaymentComponent],
  providers: [LoggerService, PaymentService, LoadingService],
})
export class PaymentModule {}
