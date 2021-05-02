/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { HeaderFooterModule } from "../global/components/headerfooter/headerfooter.module";
import { LoginModule } from "./login/login.module";
import { GlobalComponentsModule } from "../global/components/globalcomponents.module";
import { SignupModule } from "./signup/signup.module";

import { loginSignupRouting } from "./loginsignup.routes";
import { ForgotPasswordComponent } from "./forgot/forgotpassword.component";
import { ResetPasswordComponent } from "./forgot/resetpassword.component";
import { ForgotPasswordFormComponent } from "./forgot/forgotpasswordform.component";
import { ResetPasswordFormComponent } from "./forgot/resetpasswordform.component";
import { AccountCreatedComponent } from "./verify/accountcreated.component";
import { EmailChangedComponent } from "./reversechange/emailchanged.component";
import { EmailSentComponent } from "./emailsent.component";
import { ResetSentComponent } from "./forgot/reset-sent.component";
import { LoginSignupComponent } from "./loginsignup.component";
import { LogoutComponent } from "./Logout/logout.component";
import { ResetPasswordSuccessfulComponent } from "./forgot/resetpasswordsuccessful.component";

import { LoggerService } from "../global/logger.service";

import { SplashPageComponent } from "./splashpage/splashpage.component";
import { SplashPageService } from "./splashpage/splashpage.service";
import { ResetPasswordFormInputFieldComponent } from "./forgot/reset-password-form-input-field/reset-password-form-input-field.component";
import { UpgradebrowserComponent } from './upgradebrowser/upgradebrowser.component';
import { GlobalDirectivesModule } from '../global/directives/global-directives.module';

/**
 * This module covers creating an account and signing into/out of an account, as well as some
 * other account actions like password reset, email verification, and reversing a change
 * to email (the original change is made from the account page in the dashboard, not
 * in this module).
 *
 * The signup and login are actually organized as submodules:
 * * [LoginModule]{@link LoginModule}
 * * [SignupModule]{@link SignupModule}
 *
 * The signup pages are the only ones with anything complicated going on. Similarly to the
 * Landing module, the header and footer is separate and fixed and the pages are
 * inserted into a router outlet.
 */
@NgModule({
  imports: [
    HeaderFooterModule,
    LoginModule,
    loginSignupRouting,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    GlobalComponentsModule,
    SignupModule,
    GlobalDirectivesModule,
  ],
  declarations: [
    LoginSignupComponent,
    ForgotPasswordComponent,
    ForgotPasswordFormComponent,
    ResetPasswordComponent,
    ResetPasswordFormComponent,
    AccountCreatedComponent,
    EmailChangedComponent,
    EmailSentComponent,
    ResetSentComponent,
    LogoutComponent,
    SplashPageComponent,
    ResetPasswordSuccessfulComponent,
    ResetPasswordFormInputFieldComponent,
    UpgradebrowserComponent,
  ],
  providers: [LoggerService, SplashPageService],
})
export class LoginSignupModule {}
