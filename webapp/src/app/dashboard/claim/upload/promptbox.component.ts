import {
  Component,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  SimpleChanges,
} from "@angular/core";

import { LoggerService } from "../../../global/logger.service";
import { Document } from "../../../global/models/document.model";
import { ErrorBarService } from "../../../global/services/error-bar.service";

/**
 * The main area of the section of the section of the Upload Documents page where the
 * user is prompted for which document to upload next, conaining the central functionality
 * to upload to display and upload the document.
 *
 * The tooltip functionality is offloaded to
 * [AddressToolTipComponent]{@link AddressToolTipComponent}.
 *
 * Subcomponents:
 * [AddressToolTipComponent]{@link AddressToolTipComponent}
 */
@Component({
  selector: "cf-prompt-box",
  templateUrl: "./promptbox.component.html",
  styleUrls: [
    "../../../global/css/normalize.scss",
    "../../../global/css/webflow.scss",
    "./promptbox.component.scss",
  ],
})
export class PromptBoxComponent implements OnChanges {
  question: string = "";
  docIsUploading: boolean = false;

  @Input() model: Document = new Document();
  @Input() docsBeingUploaded: object;
  @Output() uploadEvent: EventEmitter<any> = new EventEmitter();
  @Output() selectEvent: EventEmitter<any> = new EventEmitter();
  @Output() updateEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private logger: LoggerService,
    private errorBarService: ErrorBarService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.updateModel();
  }

  updateModel(): void {
    this.setQuestion();
  }

  setQuestion(): void {
    if (this.model) {
      this.question = this.determineQuestion();
    } else {
      this.question = "";
    }
  }

  selectDoc(docNum: number): void {
    this.selectEvent.emit(docNum);
  }

  determineQuestion(): string {
    let questionMap: { [questionType: string]: string } = {
      company:
        "a document that proves that you have relationship with " +
        this.model.references,
      address:
        "a document that proves that you lived at " + this.model.references,
      identity: "an official government ID that verifies your identity",
      social: "a document that proves your social security number",
    };
    let question: string = "Please upload ";
    // allow user to upload document only if it is not in process of being uploaded
    if (this.docsBeingUploaded[this.model.docType + this.model.references]) {
      this.docIsUploading = true;
      question = "Document is currently being uploaded for proof ";
    } else {
      this.docIsUploading = false;
    }

    question += questionMap[this.model.docType] + ".";
    return question;
  }

  onUpload(event: any) {
    this.errorBarService.clearNonFormErrorMessages("uploadDocsErrorBar");
    this.logger.debug("Activating on upload for document", this.model);

    this.docsBeingUploaded[this.model.docType + this.model.references] = true;

    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file = fileList[0];

      this.model.doc = file;
      this.model.fileType = file.type;

      this.uploadEvent.emit();

      this.logger.debug("Attached file to document model");
    }

    event.target.value = null;
  }

  emitUpdateEvent() {
    this.updateEvent.emit();
  }
}
