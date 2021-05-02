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

/**
 * The top-level component for the section of the Upload Documents page where the
 * user is prompted for which document to upload next, as well as the button
 * to upload the document.
 *
 * Directly has the header and the number of the document, the rest of the
 * functionality is offloaded to [PromptBoxComponent]{@link PromptBoxComponent}.
 *
 * Subcomponents:
 * [PromptBoxComponent]{@link PromptBoxComponent}
 */
@Component({
  selector: "cf-prompt-section",
  templateUrl: "./promptsection.component.html",
  styleUrls: [
    "../../../global/css/normalize.scss",
    "../../../global/css/webflow.scss",
    "./promptsection.component.scss",
  ],
})
export class PromptSectionComponent implements OnChanges {
  currentDocNumber: number = 0;
  numDocs: number = 0;

  public currentDoc: Document = new Document();
  @Input() model: Document[];
  @Input() docsBeingUploaded: object;
  @Output() uploadEvent: EventEmitter<any> = new EventEmitter();
  @Output() updateEvent: EventEmitter<any> = new EventEmitter();

  constructor(private logger: LoggerService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.updateModel();
  }

  updateModel(): void {
    this.numDocs = this.model.length;
    this.setCurrentDoc();
  }

  onUpload(event: EventEmitter<number>): void {
    this.logger.debug("Document", this.currentDocNumber, "was uploaded.");
    this.uploadEvent.emit(this.currentDocNumber);
    this.updateModel();
  }

  onUpdate() {
    this.updateEvent.emit();
  }

  incrementDocument() {
    this.currentDocNumber++;
    this.setCurrentDoc();
  }

  decrementDocument(): void {
    this.currentDocNumber--;
    this.setCurrentDoc();
  }

  setCurrentDoc(): void {
    if (this.currentDocNumber > this.numDocs - 1) {
      this.currentDocNumber = this.numDocs - 1;
    }

    if (this.currentDocNumber < 0) {
      this.currentDocNumber = 0;
    }

    this.currentDoc = this.model[this.currentDocNumber];
  }

  selectDoc(docNum: number): void {
    this.currentDocNumber = docNum;
    this.setCurrentDoc();
  }
}
