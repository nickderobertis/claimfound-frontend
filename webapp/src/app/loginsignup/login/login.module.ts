import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { SignupModule } from "../signup/signup.module";
import { ExternalLoginModule } from "src/app/external-login/external-login.module";

import { LoginFormComponent } from "./loginform.component";
import { LoginComponent } from "./login.component";

import { LoggerService } from "../../global/logger.service";
import { GlobalDirectivesModule } from 'src/app/global/directives/global-directives.module';
import { LoginInputFieldComponent } from './login-input-field/login-input-field.component';
import {GlobalComponentsModule} from "../../global/components/globalcomponents.module";

/**
 * The module which handles logging in the user
 */
@NgModule({
  imports: [
    HttpClientModule,
    FormsModule,
    RouterModule,
    CommonModule,
    SignupModule,
    ExternalLoginModule,
    GlobalDirectivesModule,
    ReactiveFormsModule,
    GlobalComponentsModule,
  ],
  declarations: [LoginFormComponent, LoginComponent, LoginInputFieldComponent],
  exports: [LoginComponent],
  providers: [LoggerService],
})
export class LoginModule {}
