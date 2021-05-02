import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { FormsPageComponent } from "./formspage.component";
import { ReviewIncompleteFormsComponent } from "./reviewincompleforms/reviewincomplete.component";
import { FillAndSignModule } from "./fillandsign/fillandsign.module";
import { DashboardStepModule } from "../../step/dashboardstepmodule";
import { StorageService } from "src/app/global/storage.service";

/**
 * This module contains the forms/e-sign page, where the user will
 * electronically sign any needed paperwork.
 */
@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FillAndSignModule,
    DashboardStepModule,
  ],
  declarations: [FormsPageComponent, ReviewIncompleteFormsComponent],
  exports: [FormsPageComponent],
  providers: [StorageService],
})
export class FormsPageModule {}
