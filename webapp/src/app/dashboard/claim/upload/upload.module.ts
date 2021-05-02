import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { LoggerService } from "../../../global/logger.service";
import { StorageService } from "../../../global/storage.service";
import { GlobalPipesModule } from "../../../global/pipes/globalpipes.module";
import { GlobalComponentsModule } from "../../../global/components/globalcomponents.module";

import { UploadComponent } from "./upload.component";
import { UploadSectionComponent } from "./uploadsection.component";
import { UploadBoxComponent } from "./uploadbox.component";
import { UploadBoxRowComponent } from "./uploadboxrow.component";
import { UploadService } from "./upload.service";

import { PromptSectionComponent } from "./promptsection.component";
import { PromptBoxComponent } from "./promptbox.component";
import { RequiredSectionComponent } from "./requiredsection/requiredsection.component";
import { RequiredRowComponent } from "./requiredsection/requiredrow.component";
import { AddressToolTipComponent } from "./addresstooltip/addresstooltip.component";

import { DashboardStepModule } from "../../step/dashboardstepmodule";
import { LoadingService } from "src/app/global/services/loading.service";

/**
 * This module contains only the Upload Documents page.
 *
 * Here the user is prompted for the appropriate documents (components named with prompt),
 * and can upload, view, or delete those documents (components named with upload).
 */
@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    GlobalPipesModule,
    DashboardStepModule,
    GlobalComponentsModule,
  ],
  declarations: [
    UploadComponent,
    UploadSectionComponent,
    UploadBoxComponent,
    UploadBoxRowComponent,
    PromptSectionComponent,
    PromptBoxComponent,
    RequiredSectionComponent,
    RequiredRowComponent,
    AddressToolTipComponent,
  ],
  exports: [UploadComponent],
  providers: [LoggerService, UploadService, StorageService, LoadingService],
})
export class UploadModule {}
