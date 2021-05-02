import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { LoggerService } from "../global/logger.service";
import { LoginService } from "../loginsignup/login/login.service";
import { EventTrackerService } from "../global/services/event-tracker/event-tracker.service";
import { ExternalConnectService } from "./external-login.service";

import { ExternalLoginDirective } from "./external-login.directive";

/**
 * The module which enables the user to log in using an external service such as Google or Facebook.
 */
@NgModule({
  imports: [HttpClientModule, CommonModule],
  declarations: [ExternalLoginDirective],
  exports: [ExternalLoginDirective],
  providers: [
    LoginService,
    LoggerService,
    EventTrackerService,
    ExternalConnectService,
  ],
})
export class ExternalLoginModule {}
