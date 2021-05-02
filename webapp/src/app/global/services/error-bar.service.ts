import { Injectable, EventEmitter } from "@angular/core";
import { ErrorMessagesArgs, ErrorBarCFErrorArgs } from "src/app/global/api/interfaces/general/error-bar.interface";
import { CFError } from '../error.service';

/**
 * The service which sends events to trigger the [ErrorBarComponent]{@link ErrorBarComponent}.
 */
@Injectable({
  providedIn: "root",
})
export class ErrorBarService {
  onCFErrorEvent: EventEmitter<ErrorBarCFErrorArgs> = new EventEmitter();
  pushErrorMessageEvent: EventEmitter<ErrorMessagesArgs> = new EventEmitter();
  clearNonFormErrorsEvent: EventEmitter<string> = new EventEmitter();

  constructor() {}

  /**
   * Trigger an error message in an [ErrorBarComponent]{@link ErrorBarComponent}.
   * @param messages An object where the key(s) are the IDs of the ErrorBarComponents and the
   * values are the messages to be displayed within those ErrorBarComponents.
   */
  pushErrorMessages(messages: ErrorMessagesArgs) {
    this.pushErrorMessageEvent.emit(messages);
  }

  /**
   * Trigger an error message in an [ErrorBarComponent]{@link ErrorBarComponent}.
   * @param messages An object where the key(s) are the IDs of the ErrorBarComponents and the
   * values are CFError object to be handled by ErrorBarComponents.
   */
  pushCFErrorEvent(error: ErrorBarCFErrorArgs) {
    this.onCFErrorEvent.emit(error);
  }

  /**
   * Clears errors that aren't tied to an input form
   * @param id The id of the errorBar you wish to clear.
   */
  clearNonFormErrorMessages(id: string) {
    this.clearNonFormErrorsEvent.emit(id);
  }
}
