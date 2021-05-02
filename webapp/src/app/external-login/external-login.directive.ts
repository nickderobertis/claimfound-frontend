import {
  Directive,
  Input,
  Output,
  OnInit,
  EventEmitter,
  ElementRef,
} from "@angular/core";
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  SocialUser,
  AuthService,
} from "angularx-social-login";

import { LoggerService } from "../global/logger.service";
import { LoginService } from "../loginsignup/login/login.service";
import { EventTrackerService } from "../global/services/event-tracker/event-tracker.service";
import { ExternalConnectService } from "./external-login.service";

import { CFError } from "../global/error.service";

declare let env: any;

/**
 * The directive which adds social/external login/connect functionality to an existing HTML element.
 *
 * @example
 * <input
 *   type="button"
 *   cfExternalLogin
 *   [operation]="'signIn'"
 *   [provider]="'Facebook'"
 *   (errorMessageEvent)="receiveError($event)"
 * >Sign Up</input>
 */
@Directive({
  selector: "[cfExternalLogin]",
})
export class ExternalLoginDirective implements OnInit {
  @Input() operation: string = "connect";
  @Input() provider: string = "google";

  @Output() errorMessageEvent: EventEmitter<string> = new EventEmitter<
    string
  >();
  @Output() loadingEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  user: SocialUser;
  errorMessage: string;

  private socialOperationCallback: () => void;

  constructor(
    private authService: AuthService,
    private loginservice: LoginService,
    private logger: LoggerService,
    private eventTrackerService: EventTrackerService,
    private externallogin: ExternalConnectService,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.setup();
  }

  setup(): void {
    switch (this.operation) {
      case "connect":
        this.socialOperationCallback = () => this.connectSocial();
        break;
      case "signIn":
        this.socialOperationCallback = () => this.socialSignIn();
        break;

      default:
        this.logger.error("Unsupported operation passed: " + this.operation);
        return;
    }
    this.el.nativeElement.addEventListener(
      "click",
      this.socialOperationCallback
    );
  }

  socialSignIn(): void {
    switch (this.provider) {
      case "Google":
        this.signInWithGoogle();
        break;
      case "Facebook":
        this.signInWithFB();
        break;
      default:
        this.logger.error("Unknown provider for signin: " + this.provider);
        this.errorMessage = "Uknown error occured. Please contact support";
        this.sendErrorMessage();
        break;
    }
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (socialUser: SocialUser) => this.login(socialUser, "Google"),
      (error: Error) => {
        this.externallogin.pushSignInEvent("Google", false);
        this.logger.debug("user closed google popup: ", error);
      }
    );
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      (socialUser: SocialUser) => this.login(socialUser, "Facebook"),
      (error: Error) => {
        this.externallogin.pushSignInEvent("Facebook", false);
        this.logger.debug("user closed facebook popup: ", error);
      }
    );
  }

  login(socialUser: SocialUser, socialType: string): void {
    this.loadingEvent.emit(true);
    this.logger.debug("Starting Social login for provider: " + this.provider);

    this.loginservice.login(socialUser, "external/login").subscribe(
      (res: string) => {
        this.logger.debug("Result received from login service");
        this.externallogin.pushSignInEvent(socialType, true);
      },
      (error: CFError) => {
        this.externallogin.pushSignInEvent(socialType, false);
        this.handleError(error);
      }
    );
  }

  connectSocial(): void {
    switch (this.provider) {
      case "Google":
        this.connectGoogle();
        break;
      case "Facebook":
        this.connectFB();
        break;
      default:
        this.logger.error("Unknown provider for connect: " + this.provider);
        this.errorMessage = "Uknown error occured. Please contact support";
        this.sendErrorMessage();
        break;
    }
  }

  connectGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      socialuser => this.connectUser(socialuser, "Google"),
      error => {
        this.externallogin.pushConnectEvent("Google", false);
        this.logger.debug("user closed google popup: ", error);
      }
    );
  }

  connectFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      socialuser => this.connectUser(socialuser, "Facebook"),
      error => {
        this.externallogin.pushConnectEvent("Facebook", false);
        this.logger.debug("user closed facebook popup: ", error);
      }
    );
  }

  connectUser(socialUser: SocialUser, socialType: string): void {
    this.loadingEvent.emit(true);
    this.logger.debug("Starting Social login for provider: " + this.provider);
    this.externallogin.connect(socialUser, "external/connect").subscribe(
      (res: string) => {
        this.logger.debug("Result received from login service");
        this.externallogin.pushConnectEvent(socialType, true);
      },
      error => {
        this.externallogin.pushConnectEvent(socialType, false);
        this.handleError(error);
      }
    );
  }

  sendErrorMessage(): void {
    this.errorMessageEvent.emit(this.errorMessage);
  }

  handleError(error: CFError): void {
    switch (error.name) {
      case "incorrectLogin":
      case "gatewayTimeout":
      case "rateLimit":
      case "emailFormat":
      case "invalidOauthFBToken":
      case "invalidOauthGoogleToken":
        this.errorMessage = error.displayMessage;
        break;
      case "userExists":
        this.errorMessage = `User for ${this.provider} is already associated with another user. Try logging out of that and retry.`;
        break;
      default:
        this.errorMessage = "An error has occured. Please try again later.";

        break;
    }

    this.logger.info("Error with external login:", error.toString());

    if (env.CF_ANALYTICS_FE) {
      this.eventTrackerService.triggerEvent("signinError", error.message);
    }

    this.sendErrorMessage();
    this.loadingEvent.emit(false);
  }
}
