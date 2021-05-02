import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { log, LoggerService } from "../global/logger.service";
import { ErrorModalComponent } from "./errormodal.component";

/**
 * The service which enables showing and hiding the global error modal.
 */
@Injectable()
export class ErrorModalService {
  //Observable source
  private messageSource = new BehaviorSubject({
    show: false,
    message: "",
    buttonText: "",
    redirectUrl: "",
  });

  // initial value to pass to observable stream
  //Observable stream
  public message$ = this.messageSource.asObservable();

  constructor(private logger: LoggerService) {}

  showModal(data?: any) {
    //Emits event through message$
    this.messageSource.next({
      show: true,
      message: data.message,
      buttonText: data.buttonText,
      redirectUrl: data.redirectUrl,
    });
  }

  hideModal() {
    this.messageSource.next({
      show: false,
      message: "",
      buttonText: "",
      redirectUrl: "",
    });
  }
}
