import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GlobalComponentsModule } from "../../global/components/globalcomponents.module";
import { GlobalDirectivesModule } from "../../global/directives/global-directives.module";
import { RouterModule } from "@angular/router";

import { SignupComponent } from "./signup.component";
import { SignUpChooserComponent } from "./sign-up-chooser/sign-up-chooser.component";
import { SignUpInputAreaComponent } from "./sign-up-input-area/sign-up-input-area.component";
import { SignUpInputFieldComponent } from "./sign-up-input-area/sign-up-input-field/sign-up-input-field.component";

import { SignUpModalService } from "./sign-up-modal.service";
import { LoggerService } from "../../global/logger.service";
import { StorageService } from "../../global/storage.service";
import { ErrorBarService } from "../../global/services/error-bar.service";
import { ExternalLoginModule } from "../../external-login/external-login.module";

/**
 * The module containing user sign up.
 *
 * This contains email sign up as well as social/external sign up.
 */
@NgModule({
  declarations: [
    SignupComponent,
    SignUpChooserComponent,
    SignUpInputAreaComponent,
    SignUpInputFieldComponent,
  ],
  imports: [
    CommonModule,
    GlobalComponentsModule,
    GlobalDirectivesModule,
    ReactiveFormsModule,
    RouterModule,
    ExternalLoginModule,
  ],
  exports: [SignupComponent, SignUpInputFieldComponent],
  providers: [
    SignUpModalService,
    LoggerService,
    StorageService,
    ErrorBarService,
  ],
})
export class SignupModule {}
