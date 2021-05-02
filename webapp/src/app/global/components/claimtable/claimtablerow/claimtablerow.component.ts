import { Component, Input, OnInit } from "@angular/core";
import { Subject } from "rxjs";

import { Claim } from "src/app/global/models/claim.model";

/**
 * An individual row of the tables which are used throughout the app to show claim information.
 */
@Component({
  selector: "cf-claim-table-row",
  templateUrl: "./claimtablerow.component.html",
  styleUrls: [
    "../../../../global/css/normalize.scss",
    "../../../../global/css/webflow.scss",
    "./claimtablerow.component.scss",
  ],
})
export class ClaimTableRowComponent implements OnInit {
  @Input() modal: boolean = false;
  showHelpModal: boolean = false;

  modalCloseSubject: Subject<any> = new Subject();
  helpModalOpenSubject: Subject<any> = new Subject();

  @Input() model: Claim;

  constructor() {}

  ngOnInit(): void {
    this.modalCloseSubject.subscribe(() => {
      this.closeDocument();
    });

    this.helpModalOpenSubject.subscribe(() => {
      this.openHelpModal();
    });
  }

  openDocument(event: MouseEvent): void {
    this.modal = true;
  }

  closeDocument(): void {
    this.modal = false;
  }

  openHelpModal(): void {
    this.modal = false;
    this.showHelpModal = true;
  }

  closeHelpModal(event: MouseEvent): void {
    this.modal = true;
    this.showHelpModal = false;
  }
}
