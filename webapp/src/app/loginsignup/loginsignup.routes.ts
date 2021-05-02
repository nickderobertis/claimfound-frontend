/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { LoginSignupComponent } from "./loginsignup.component";
import { ForgotPasswordComponent } from "./forgot/forgotpassword.component";
import { ResetPasswordComponent } from "./forgot/resetpassword.component";
import { ResetPasswordSuccessfulComponent } from "./forgot/resetpasswordsuccessful.component";
import { EmailSentComponent } from "./emailsent.component";
import { ResetSentComponent } from "./forgot/reset-sent.component";
import { AccountCreatedComponent } from "./verify/accountcreated.component";
import { EmailChangedComponent } from "./reversechange/emailchanged.component";
import { LogoutComponent } from "./Logout/logout.component";
import { SplashPageComponent } from "./splashpage/splashpage.component";
import { UpgradebrowserComponent } from './upgradebrowser/upgradebrowser.component';

const LoginSignupRoutes: Routes = [
  {
    path: "login",
    component: LoginSignupComponent,
    children: [
      { path: "", component: LoginComponent },
      { path: "login", redirectTo: "/login", pathMatch: "full" },
      { path: "forgot", component: ForgotPasswordComponent },
      { path: "reset/:nonce", component: ResetPasswordComponent },
      { path: "emailsent", component: EmailSentComponent },
      { path: "reset-sent", component: ResetSentComponent },
      { path: "verify/:nonce", component: AccountCreatedComponent },
      { path: "email/reset/:nonce", component: EmailChangedComponent },
      { path: "logout", component: LogoutComponent },
      {
        path: "reset-password-successful",
        component: ResetPasswordSuccessfulComponent,
      },
      { path: "splashpage", component: SplashPageComponent },
      { path: "upgradebrowser", component: UpgradebrowserComponent}
    ],
  },
];

export const loginSignupRouting = RouterModule.forChild(LoginSignupRoutes);
