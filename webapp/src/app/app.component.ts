import { StorageService } from "./global/storage.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ErrorModalService } from "./error-modal/errormodal.service";
import { log, LoggerService } from "./global/logger.service";
import { Subscription } from "rxjs";
import { Router, NavigationEnd, NavigationStart } from "@angular/router";
import { EventTrackerService } from "./global/services/event-tracker/event-tracker.service";
import { Title } from "@angular/platform-browser";
import { filter } from 'rxjs/operators';
declare let gtag: Function;
declare let env: any;

/**
 * The main page component for the entire application.
 *
 * Contains a router outlet which displays each page, as well as the error modal which can show
 * up on any page.
 *
 * Subcomponents:
 * * [ErrorModalComponent]{@link ErrorModalComponent}
 */
@Component({
  selector: "claim-found-app",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit, OnDestroy {
  public dispModal: boolean = false;
  private subMessage: Subscription;

  private defaultErrorMessage: string =
    "Sorry! An error is has occured. Please Sign In.";
  private defaultErrorButtonText: string = "Sign In";
  private defaultErrorRedirectUrl: string = "/login/login";

  private _errorMessage: string;
  get errorMessage(): string {
    return this._errorMessage || this.defaultErrorMessage;
  }
  set errorMessage(val: string) {
    this._errorMessage = val;
  }

  private _errorButtonText: string;
  get errorButtonText(): string {
    return this._errorButtonText || this.defaultErrorButtonText;
  }
  set errorButtonText(val: string) {
    this._errorButtonText = val;
  }

  private _errorRedirectUrl: string;
  get errorRedirectUrl(): string {
    if (typeof this._errorRedirectUrl === "undefined") {
      return this.defaultErrorRedirectUrl;
    }

    return this._errorRedirectUrl;
  }
  set errorRedirectUrl(val: string) {
    this._errorRedirectUrl = val;
  }

  constructor(
    public errorModService: ErrorModalService,
    public logger: LoggerService,
    public router: Router,
    private eventTrackerService: EventTrackerService,
    public storage: StorageService,
    private titleService: Title
  ) {
    if (env.CF_ANALYTICS_FE) {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          //UA-109412709-1 UA-109055368-1

         this.router.events.pipe(filter((routerEvent: any) => routerEvent instanceof NavigationStart)).subscribe(event => {
			 if(!event.url.match(/^.*#.*$/)){
                document.body.scrollTop = 0;
			 }
            });
          this.eventTrackerService.triggerEvent("pageVisit", {
            pagePath: event.urlAfterRedirects,
          });
        }
      });
    }
    this.router.events.subscribe(event => {
      // used Navigation start event as this results in correct Landing
      // page buttons
      if (event instanceof NavigationStart) {
        let storedTime: any = this.storage.read("cf-jwt-expiration");
        // if storedTime exist
        if (storedTime) {
          let currentTime = Date.now();
          let expirationTime = Date.parse(storedTime);
          // Token expired
          if (currentTime > expirationTime) {
            this.logger.debug("removing token and cf-jwt-expiration");
            this.logger.debug("current time: ", currentTime);
            this.logger.debug("expiration time: ", expirationTime);
            this.storage.removeToken();
            this.storage.remove("cf-jwt-expiration");
          }
        }
      }
    });
  }

  ngOnInit() {
    this.subMessage = this.errorModService.message$.subscribe(data =>
      this.updateMessage(data)
    );

    //Adds title to the html page
    this.titleService.setTitle(
      "ClaimFound: Find, Claim and Monitor Unclaimed Money for Free"
    );
  }

  ngOnDestroy() {
    if (this.subMessage) {
      this.subMessage.unsubscribe();
    }
  }

  updateMessage(data) {
    this.logger.debug("Error Modal set to true");

    this.dispModal = data.show;
    this.errorMessage = data.message;
    this.errorButtonText = data.buttonText;
    this.errorRedirectUrl = data.redirectUrl;
  }
}
