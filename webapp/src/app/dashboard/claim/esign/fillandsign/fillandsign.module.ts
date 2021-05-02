import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { FillAndSignComponent } from "./fillandsign.component";
import { FillAddressComponent } from "./filladdress/filladdress.component";
import { FillPhoneComponent } from "./fillphone/fillphone.component";
import { FillSSNComponent } from "./fillssn/fillssn.component";
import { SignatureCaptureComponent } from "./signaturecapture/signaturecapture.component";
import { FormsPageService } from "../formspage.service";

import { SignaturePadModule } from "angular2-signaturepad";
import { SignaturePadComponent } from "./signaturecapture/signaturepad/signaturepad.component";
import { GlobalComponentsModule } from "src/app/global/components/globalcomponents.module";
import { SSNPopupComponent } from "./fillssn/ssnpopup/ssnpopup.component";

/**
 * This module contains the signing and filling functionality within
 * the forms/e-sign page, though not the page itself.
 */
@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SignaturePadModule,
    GlobalComponentsModule,
  ],
  declarations: [
    FillAndSignComponent,
    FillAddressComponent,
    FillPhoneComponent,
    FillSSNComponent,
    SSNPopupComponent,
    SignatureCaptureComponent,
    SignaturePadComponent,
  ],
  exports: [FillAndSignComponent],
  providers: [FormsPageService],
})
export class FillAndSignModule {}
