/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { LoggerService } from "../../global/logger.service";
import { ErrorBarService } from "../../global/services/error-bar.service";
import { AccountService } from "./account.service";
import { ExternalConnectService } from "src/app/external-login/external-login.service";

import { GlobalPipesModule } from "../../global/pipes/globalpipes.module";
import { GlobalDirectivesModule } from "../../global/directives/global-directives.module";

import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { GlobalComponentsModule } from "../../global/components/globalcomponents.module";

import { AccountComponent } from "./account.component";

import { ExternalLoginModule } from "src/app/external-login/external-login.module";

import { UpdateRowComponent } from "./update-row/update-row.component";

import { ExternalLoginRowComponent } from "./external-login-row/external-login-row.component";

/**
 * The module containing the Account page where the user can change email, password, and connect social accounts
 */
@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    GlobalComponentsModule,
    GlobalPipesModule,
    BrowserModule,
    BrowserAnimationsModule,
    ExternalLoginModule,
    GlobalDirectivesModule,
  ],
  declarations: [
    AccountComponent,
    UpdateRowComponent,
    ExternalLoginRowComponent,
  ],
  exports: [],
  providers: [
    LoggerService,
    AccountService,
    ErrorBarService,
    ExternalConnectService,
  ],
})
export class AccountModule {}
