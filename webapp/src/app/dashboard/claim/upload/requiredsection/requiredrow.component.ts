import { Component, Input } from "@angular/core";
import { RequiredDocRowModel } from "./requireddocrow.model";

/**
 * A single row of the table on the Upload Documents page which displays which
 * claims' requirements have been met.
 */
@Component({
  selector: "cf-required-row",
  templateUrl: "./requiredrow.component.html",
  styleUrls: [
    "../../../../global/css/normalize.scss",
    "../../../../global/css/webflow.scss",
    "./requiredrow.component.scss",
  ],
})
export class RequiredRowComponent {
  @Input() model: RequiredDocRowModel;

  get claimId(): string {
    return this.model.claimId;
  }

  get reportingCompany(): string {
    return this.model.reportingCompany;
  }

  get requiredDocuments(): string {
    return this.model.requiredDocuments.join(", ");
  }

  get completed(): boolean {
    return this.model.completed;
  }

  get statusText(): string {
    return this.completed ? "Complete" : "Incomplete";
  }

  get statusClass(): string {
    return this.completed ? "complete" : "incomplete";
  }
}
