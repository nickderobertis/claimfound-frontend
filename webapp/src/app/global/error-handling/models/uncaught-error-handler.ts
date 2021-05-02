import { ErrorHandler, Injectable } from "@angular/core";
import { LoggerService } from "../../logger.service";
import { CFError } from "../../error.service";

/**
 * The service which handles global uncaught errors throughout the application.
 *
 * Currently just logs the error at the error level. The logging is offloaded to
 * [CFError.fromJSError]{@link CFError#fromJSError}.
 */
@Injectable()
export class GlobalUncaughtErrorHandlerService implements ErrorHandler {
  constructor(private logger: LoggerService) {}

  handleError(error: Error) {
    this.logger.error(error);
    // fromJSError does log the error on error level
  }
}
