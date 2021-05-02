import { Component, Input, Output, EventEmitter } from "@angular/core";

import { Document } from "../../../global/models/document.model";

/**
 * The top-level component of the section of the Upload Documents page which
 * displays the documents that the user currently has uploaded.
 *
 * This is just a wrapper component which contains only the header directly,
 * the functionality is offloaded to
 * [UploadBoxComponent]{@link UploadBoxComponent}
 *
 * Subcomponents:
 * [UploadBoxComponent]{@link UploadBoxComponent}
 */
@Component({
  selector: "cf-upload-section",
  templateUrl: "./uploadsection.component.html",
  styleUrls: [
    "../../../global/css/normalize.scss",
    "../../../global/css/webflow.scss",
    "./uploadsection.component.scss",
  ],
})
export class UploadSectionComponent {
  @Input() model: Document[];
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();

  emitDeleteEvent(num: number) {
    this.deleteEvent.emit(num);
  }
}
