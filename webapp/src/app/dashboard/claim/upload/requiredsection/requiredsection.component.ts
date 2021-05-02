import { Component, Input } from "@angular/core";

import { RequiredDocRowModel } from "./requireddocrow.model";

/**
 * The top-level component for the table on the Upload Documents page which displays which
 * claims' requirements have been met.
 *
 * Subcomponents:
 * [RequiredRowComponent]{@link RequiredRowComponent}
 */
@Component({
  selector: "cf-required-section",
  templateUrl: "./requiredsection.component.html",
  styleUrls: [
    "../../../../global/css/normalize.scss",
    "../../../../global/css/webflow.scss",
    "./requiredsection.component.scss",
  ],
})
export class RequiredSectionComponent {
  @Input() rowModels: RequiredDocRowModel[];
}
