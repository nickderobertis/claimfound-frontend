import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from "@angular/core";
import { Router } from "@angular/router";
import { ErrorModalService } from "./errormodal.service";
import { LoggerService } from "../global/logger.service";
import { Subscription } from "rxjs";

/**
 * The error modal which will show on any page if an error occurs.
 *
 * The error modal is triggered by error handlers. Error handlers are dispatched by the
 * [ErrorHandlerManager]{@link ErrorHandlerManager}, which is called in [BaseService.handleError]{@link BaseService#handleError}.
 * Error handlers are registered with the
 * [ErrorHandlerManager]{@link ErrorHandlerManager} by adding them to `src/app/global/error-handling/models/error-handlers`
 * and including them in `ERROR_HANDLERS` in the `index.ts` file in that folder. The error handler should subclass
 * [ErrorHandler]{@link ErrorHandler}. The
 * [ErrorHandlerManager]{@link ErrorHandlerManager} will check the name of the error and if it matches the name of
 * any error handler it will use that error handler's `handleErrors` method to handle it. If it does not match any names,
 * then the [DefaultErrorHandler]{@link DefaultErrorHandler} is used. If the name cannot be determined, the
 * [UnknownErrorHandler]{@link UnknownErrorHandler} is used. The error handlers call
 * `this.raiseErrorModalAndRedirectToUrl` to raise the error modal.
 */
@Component({
  selector: "cf-error-modal",
  templateUrl: "./errormodal.component.html",
  styleUrls: [
    "../global/css/normalize.scss",
    "../global/css/webflow.scss",
    "./errormodal.component.scss",
  ],
})
export class ErrorModalComponent {
  public dispModal: boolean = false;
  private subMessage: Subscription;

  @Input() message?: string = "Sorry! An error has occured. Please Sign In.";
  @Input() url?: string = "/login/login";
  @Input() buttonText?: string = "Sign In";

  @Output() clickEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
    private errorModService: ErrorModalService,
    private logger: LoggerService
  ) {}

  clicked(event) {
    if (this.url) {
      if (this.url == window.location.href) {
        window.location.reload();
      } else {
        this.router.navigate([this.url]);
      }
    }

    this.errorModService.hideModal();
  }
}
