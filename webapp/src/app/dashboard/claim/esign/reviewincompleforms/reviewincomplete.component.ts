import { Component, Input, Output, EventEmitter } from "@angular/core";
import { IncompleteFormModel } from "../models/formspage.model";
import { StorageService } from "src/app/global/storage.service";

/**
 * The component within the e-sign forms page which allows the user to
 * view any incomplete forms before signing.
 */
@Component({
  selector: "cf-review-incomplete-forms",
  templateUrl: "./reviewincomplete.component.html",
  styleUrls: [
    "../../../../global/css/normalize.scss",
    "../../../../global/css/webflow.scss",
    "./reviewincomplete.component.scss",
  ],
})
export class ReviewIncompleteFormsComponent {
  @Input() incompleteForms: IncompleteFormModel[];
  @Output() taskCompleteEvent: EventEmitter<any> = new EventEmitter();
  showForms: boolean = false;
  taskComplete: boolean = false;
  formViewed: boolean[];

  constructor(private storage: StorageService) {}

  ngOnInit() {
    this.formViewed = [];
    for (let form of this.incompleteForms) {
      this.formViewed.push(false);
    }
    if (this.allFormsViewed()) {
      this.taskComplete = true;
    }
  }

  onStartTask() {
    this.showForms = true;
  }

  onFormLinkClick(index: number) {
    this.formViewed[index] = true;
    if (this.allFormsViewed()) {
      this.taskComplete = true;
      this.taskCompleteEvent.emit();
    }
    window.open(
      this.incompleteForms[index].authenticatedUrl(this.storage, true),
      "_blank"
    );
  }

  allFormsViewed(): boolean {
    for (let thisFormViewed of this.formViewed) {
      if (thisFormViewed === false) {
        return false;
      }
    }
    return true;
  }

  getFormLinkClass(index: number): string {
    if (this.formViewed[index]) {
      return "link-text viewed";
    } else {
      return "link-text";
    }
  }

  get textColorClass(): string {
    if (this.taskComplete) {
      return "completed";
    } else {
      return "";
    }
  }
}
