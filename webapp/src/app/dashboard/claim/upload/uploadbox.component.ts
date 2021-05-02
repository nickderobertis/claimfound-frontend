import { Component, Input, Output, EventEmitter } from "@angular/core";

import { LoggerService } from "../../../global/logger.service";
import { Document } from "../../../global/models/document.model";

/**
 * The main component of the section of the Upload Documents page where the
 * user's currently uploaded documents are displayed.
 *
 * This component is just a container which holds the table rows which are
 * [UploadBoxRowComponents]{@link UploadBoxRowComponent}
 *
 * Subcomponents:
 * [UploadBoxRowComponent]{@link UploadBoxRowComponent}
 */
@Component({
  selector: "cf-upload-box",
  templateUrl: "./uploadbox.component.html",
  styleUrls: [
    "../../../global/css/normalize.scss",
    "../../../global/css/webflow.scss",
    "./uploadbox.component.scss",
  ],
})
export class UploadBoxComponent {
  @Input() model: Document[];
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();

  constructor(private logger: LoggerService) {}

  emitDeleteEvent(num: number): void {
    this.deleteEvent.emit(num);
  }
}
