import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

import { LoggerService } from "../../../global/logger.service";
import { StorageService } from "../../../global/storage.service";
import { Document } from "../../../global/models/document.model";
import { CLIENT_API_KEY } from "../../../global/org-settings";

let ignoreDescriptions = ["identity", "social"];

/**
 * The component on the Upload Documents page which represents a single row of the
 * table which shows the uploaded documents.
 *
 * Contains the functionality to view and delete an uploaded document.
 */
@Component({
  selector: "cf-upload-box-row",
  templateUrl: "./uploadboxrow.component.html",
  styleUrls: [
    "../../../global/css/normalize.scss",
    "../../../global/css/webflow.scss",
    "./uploadboxrow.component.scss",
  ],
})
export class UploadBoxRowComponent implements OnInit {
  file: File;
  modal: boolean = false;
  url: string | SafeResourceUrl;

  @Input() model: Document;
  @Input() num: number; // order of row
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();

  private docModalWrapper: ElementRef;
  @ViewChild("docModalWrapper", { static: false }) set content(
    content: ElementRef
  ) {
    if (this.modal) {
      // initially setter gets called with undefined
      this.docModalWrapper = content;
    }
  }

  constructor(
    private logger: LoggerService,
    private sanitizer: DomSanitizer,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    this.url = this.createFileUrl();
  }

  deleteDocument(event: MouseEvent): void {
    this.logger.debug("Deleting document");
    this.deleteEvent.emit(this.num);
  }

  openDocument(event: MouseEvent): void {
    this.modal = true;
  }

  closeIfClickedOutside(event: MouseEvent): void {
    if (!this.docModalWrapper.nativeElement.contains(event.target)) {
      this.closeDocument(event);
    }
  }

  closeDocument(event: MouseEvent): void {
    this.modal = false;
  }

  createFileUrl(): SafeResourceUrl {
    let urlString: string;
    let token = this.storage.getToken();

    urlString = `${this.model.documentUrl}&token=${token}&api_key=${CLIENT_API_KEY}`;

    return this.setAsSafeUrl(urlString);
  }

  setAsSafeUrl(url: string | SafeResourceUrl): SafeResourceUrl {
    if (typeof url === "string") {
      this.logger.debug("Setting url to safe:", url);
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    // This is the case where it has already been set as safe
    return url;
  }

  get labelSeparator(): string {
    if (ignoreDescriptions.indexOf(this.model.docType) !== -1) {
      return "";
    }

    return "|";
  }

  get description(): string {
    if (ignoreDescriptions.indexOf(this.model.docType) !== -1) {
      return "";
    }

    return `${this.model.references}`;
  }

  get viewDivClass(): string {
    if (this.model.userUploaded) {
      return "completed-documents-body-view-div";
    } else {
      // Delete button is removed for cf report, so add extra padding to fill area
      return "completed-documents-body-view-div view-div-extra-padding";
    }
  }
}
