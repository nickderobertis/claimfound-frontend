import { Injectable, EventEmitter } from "@angular/core";

/**
 * The service which turns on and off the loading modal.
 */
@Injectable()
export class LoadingService {
  loadingEvent: EventEmitter<boolean> = new EventEmitter();

  setLoading(loading: boolean) {
    this.loadingEvent.emit(loading);
  }
}
