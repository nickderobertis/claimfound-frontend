import { ErrorHandler } from "./error-handling/models/error-handler";
import { ERROR_RESPONSE_TYPES } from "./api/error-responses/error-response-types";
import { ErrorHandlerManager } from "./error-handling/models/error-handler-manager";
import { HttpErrorResponse } from "@angular/common/http";
import { logAtLevel } from "./logger.service";

/**
 * The custom error class used throughout the application. All errors are converted to CFErrors before handling them.
 *
 * We have most of our error handling logic to be based out of this class. It has functionality to look up the appropriate
 * [ErrorHandler]{@link ErrorHandler} by using the [ErrorHandlerManager]{@link ErrorHandlerManager}
 * (more details explained in [ErrorModalComponent]{@link ErrorModalComponent}). It handles logging the
 * error, and has static methods to construct CFError from backend or frontend errors, giving a unified interface to
 * handle all errors.
 */
export class CFError implements Error {
  handler: ErrorHandler;
  statusCode?: number;
  url?: string;
  // TODO:- more specific type for data
  // in sign-up-input-area.component.ts it was complaining that object type is not assignable
  data?: any;

  constructor(
    public name: string,
    public message: string = "Unknown Error",
    public stack: string = (<any>new Error()).stack,
    public type: string = undefined,
    public logLevel: string = "error",
    public expected: boolean = false,
    public displayMessage?: string
  ) {
    logAtLevel(this.logLevel, this.toString());

    // setting display message property
    if (!this.displayMessage) {
      if (ERROR_RESPONSE_TYPES.hasOwnProperty(this.name)) {
        this.displayMessage = ERROR_RESPONSE_TYPES[this.name].message;
        this.message = ERROR_RESPONSE_TYPES[this.name].description;
      } else {
        this.displayMessage = ERROR_RESPONSE_TYPES.default.message;
      }
    }

    // setting handler property
    if (this.name) {
      this.handler =
        ErrorHandlerManager.instance.getHandler(this.name) ||
        ErrorHandlerManager.instance.getHandler("default");
    } else {
      this.handler = ErrorHandlerManager.instance.getHandler("unknown");
    }
  }

  toString() {
    // set to stack for rollbar error
    let msg: string = this.message;
    if (this.type) {
      msg = this.type + ": " + msg;
    }
    return this.name + " ( " + msg + " ) " + ": " + this.stack;
  }

  static fromBEResponse(response: HttpErrorResponse): CFError {
    logAtLevel(
      "debug",
      "Inside fromBEResponse with error:" + response.toString()
    );
    let name: string;
    let data: object;
    let logLevel: string;

    // if api exception or not from backend
    if (typeof response.error === "object" && response.error.errors) {
      name = response.error.errors[0].name;
      data = response.error.errors[0].data;
      logLevel = "info";
    } else {
      logLevel = "error";
      switch (response.status) {
        case 500:
          name = "Server Error";
          break;
        case 504:
          name = "gatewayTimeout";
          break;
        case 429:
          name = "rateLimit";
          data = response.error;
          break;
        case 413:
          name = "maxFileSizeLimit";
          logLevel = "debug";
          break;
        default:
          name = "Unknown Server Error";
          break;
      }
    }

    let error: CFError = new CFError(
      name,
      "Backend error response",
      undefined,
      undefined,
      logLevel
    );
    error.statusCode = response.status;
    error.data = data;
    logAtLevel("debug", "parsed error object: " + error.toString());
    return error;
  }

  static fromJSError(error: Error): CFError {
    let name: string = "JS Error";
    let errorObj: CFError = new CFError(
      name,
      error.message,
      error.stack,
      error.name
    );
    return errorObj;
  }
}
