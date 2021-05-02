import { Component, Input, ElementRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { StepConstants } from "src/app/dashboard/step/stepconstants";
import { Claim } from "src/app/global/models/claim.model";

/**
 * A modal displaying information about a claim which will show when the user clicks
 * a link for additional details about a claim.
 */
@Component({
  selector: "cf-details-modal",
  templateUrl: "./detailsmodal.component.html",
  styleUrls: [
    "./detailsmodal.component.scss",
    "../../../../global/css/normalize.scss",
    "../../../../global/css/webflow.scss",
  ],
})
export class ClaimDetailsModalComponent {
  @Input() modalCloseSubject: Subject<any>;
  @Input() helpModalOpenSubject: Subject<any>;
  @Input() model: Claim;
  @ViewChild("detailsModalWrapper", { static: true })
  detailsModalWrapper: ElementRef;

  constructor(private router: Router) {}

  closeModal(): void {
    this.modalCloseSubject.next();
  }

  closeIfClickedOutside(event: any): void {
    if (!this.detailsModalWrapper.nativeElement.contains(event.target)) {
      this.closeModal();
    }
  }

  openHelpModal(): void {
    this.helpModalOpenSubject.next();
  }

  get isMultiOwnerClaim(): boolean {
    return this.model.step === "pause";
  }

  get step(): string {
    return StepConstants.pageNames[this.frontendStepKey];
  }

  get showStepUrl(): boolean {
    let path = window.location.pathname;

    if (this.isMultiOwnerClaim) {
      return true;
    }

    return this.stepUrl && path !== this.stepUrl;
  }

  get stepUrl(): string {
    return StepConstants.routesForPage[this.frontendStepKey];
  }

  get amount(): string {
    return `${this.model.amount}`;
  }

  get frontendStepKey(): string {
    return StepConstants.pageKeysByBackendKeys[this.model.step];
  }

  onNextStepClick(): void {
    this.router.navigate([this.stepUrl]);
  }
}
