import { Component, Input, OnInit } from "@angular/core";

import { DomSanitizer } from "@angular/platform-browser";

import { LoggerService } from "../../../global/logger.service";
import { StorageService } from "../../../global/storage.service";
import { CLIENT_API_KEY } from "../../../global/org-settings";

import { FileViewModel } from "./models/fileview.model";

/**
 * The component which displays a single file and allows viewing the files in an iframe modal.
 */
@Component({
  selector: "file-view-row",
  templateUrl: "./fileviewrow.component.html",
  styleUrls: [
    "../../../global/css/normalize.scss",
    "../../../global/css/webflow.scss",
    "./fileviewrow.component.scss",
  ],
})
export class FileViewRowComponent implements OnInit {
  @Input() model: FileViewModel;
  file: File;
  modal: boolean = false;
  url: string;

  constructor(
    private logger: LoggerService,
    private sanitizer: DomSanitizer,
    private storage: StorageService
  ) {}

  ngOnInit() {
    this.url = this.createFileUrl();
  }

  openDocument(event: any) {
    this.modal = true;
  }

  closeDocument(event: any) {
    this.modal = false;
  }

  createFileUrl() {
    let urlString: string;
    let token = this.storage.getToken();
    // if(this.model.url.includes('amazonaws')){
    if (this.model.backendUrl) {
      urlString = `${this.model.url}&token=${token}&api_key=${CLIENT_API_KEY}`;
    } else {
      urlString = this.model.url;
    }
    return this.setAsSafeUrl(urlString);
  }

  setAsSafeUrl(url: any) {
    if (typeof url === "string") {
      this.logger.debug("Setting url to safe:", url);
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    //This is the case where it has already been set as safe
    return url;
  }

  get labelSeparator(): string {
    if (!this.model.description) {
      return "";
    }

    return "|";
  }

  get documentForDisplayText(): string {
    if (!this.model.description) {
      return "";
    }
    return `for ${this.model.description}`;
  }
}
