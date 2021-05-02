import { NgModule, ErrorHandler } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule, Title } from "@angular/platform-browser";
import { OverlayModule } from "@angular/cdk/overlay";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { routing, appRoutingProviders } from "./app.routes";

import { AgmCoreModule } from "@agm/core";

import { AppComponent } from "./app.component";
import { ErrorModalComponent } from "./error-modal/errormodal.component"; //for testing

import { LandingModule } from "./landing/landing.module";
import { LoginSignupModule } from "./loginsignup/loginsignup.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { _404Module } from "./global/404/404.module";
import { ErrorModalService } from "./error-modal/errormodal.service";
import { LoadingService } from "./global/services/loading.service";

import { EventTrackerService } from "./global/services/event-tracker/event-tracker.service";
import { GlobalUncaughtErrorHandlerService } from "./global/error-handling/models/uncaught-error-handler";

import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angularx-social-login";
import { ExternalConnectService } from "./external-login/external-login.service";
import { AngularFontAwesomeModule } from "angular-font-awesome";

declare let env: any;

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(env.GOOGLE_OAUTH_CLIENT),
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(env.FACEBOOK_APP_ID),
  },
]);

export function provideConfig() {
  return config;
}

/**
 * The module for the overall application.
 *
 * Contains the main page component which has a router outlet to all pages. Also contains the error modal component.
 */
@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    _404Module,
    routing,
    LandingModule,
    LoginSignupModule,
    DashboardModule,
    OverlayModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAeTpLZBzltwX4poMilMnsxfh6tFo1fbwk",
      libraries: ["places"],
    }),
    SocialLoginModule,
    AngularFontAwesomeModule,
  ],
  declarations: [AppComponent, ErrorModalComponent],
  bootstrap: [AppComponent],
  providers: [
    appRoutingProviders,
    LoadingService,
    ErrorModalService,
    EventTrackerService,
    ExternalConnectService,
    Title,
    { provide: ErrorHandler, useClass: GlobalUncaughtErrorHandlerService },
    { provide: AuthServiceConfig, useFactory: provideConfig },
  ],
})
export class AppModule {}
