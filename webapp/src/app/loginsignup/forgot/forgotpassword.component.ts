/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { Component } from "@angular/core";

/**
 * The main page component for the forgot password feature.
 *
 * This is the first page the user will hit in the reset password flow. First this page
 * where the user will enter their email. Then a page which shows that an email with a link
 * to reset the password was sent ([ResetSentComponent]{@link ResetSentComponent}). Then
 * the user clicks the link in the email, which takes them to the
 * [ResetPasswordComponent]{@link ResetPasswordComponent}. Finally, upon success, they are
 * routed to [ResetPasswordSuccessfulComponent]{@link ResetPasswordSuccessfulComponent}.
 *
 * The inputs are delegated to a subcomponent:
 * [ForgotPasswordFormComponent]{@link ForgotPasswordFormComponent}
 */
@Component({
  selector: "cf-forgot-password",
  templateUrl: "./forgotpassword.component.html",
  styleUrls: [
    "../login/login.component.scss",
    "../../global/css/normalize.scss",
    "../../global/css/webflow.scss",
  ],
})
export class ForgotPasswordComponent {}
