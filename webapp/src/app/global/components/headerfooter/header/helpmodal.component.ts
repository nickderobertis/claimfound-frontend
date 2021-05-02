/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from "@angular/core";

import { LoggerService } from "../../../logger.service";
import { EventTrackerService } from "../../../../global/services/event-tracker/event-tracker.service";

declare let env: any;

@Component({
  selector: "cf-help-modal",
  templateUrl: "./helpmodal.component.html",
  styleUrls: [
    "./helpmodal.component.scss",
    "../../../../global/css/normalize.scss",
    "../../../../global/css/webflow.scss",
  ],
})
export class HelpModalComponent {
  public HelpIsVisible: boolean;
  @Output() closeModalEvent = new EventEmitter<boolean>();
  @ViewChild("supportModalContainer", { static: true })
  supportModalContainer: ElementRef;
  @ViewChild("supportModalHeaderClose", { static: true })
  supportModalHeaderClose: ElementRef;

  constructor(
    private logger: LoggerService,
    private eventTrackerService: EventTrackerService
  ) {}

  onCloseModal(event: any) {
    if (!this.supportModalContainer.nativeElement.contains(event.target)) {
      this.closeModalEvent.emit(false);
    } else if (
      this.supportModalHeaderClose.nativeElement.contains(event.target)
    ) {
      this.closeModalEvent.emit(false);
    }
    if (env.CF_ANALYTICS_FE) {
      this.eventTrackerService.triggerEvent("clickSupport", {
        data: null,
      });
    }
  }

  //    showHelp()
  //    {
  //        this.logger.debug('Showing help dialog.');
  //        this.HelpIsVisible = true;
  //    }
  //
  //    hideHelp()
  //    {
  //        this.logger.debug('Hiding help dialog.');
  //        this.HelpIsVisible = false;
  //    }
}
