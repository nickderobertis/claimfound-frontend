import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Document } from "../../../../global/models/document.model";
import { StateStringMap } from "../../../../global/constants/statestringmap";

import { LoggerService } from "../../../../global/logger.service";
import { UploadService } from "../upload.service";

/**
 * The section of the Upload Documents page where the user can get an explanation
 * of why a document is required and adjust address document requirements if it is
 * an invalid address we have flagged as valid or a valid address we have flagged
 * as invalid.
 *
 * Contains the tooltip as well as the small text on the prompt box.
 */
@Component({
  selector: "cf-address-tooltip",
  templateUrl: "./addresstooltip.component.html",
  styleUrls: [
    "../../../../global/css/normalize.scss",
    "../../../../global/css/webflow.scss",
    "./addresstooltip.component.scss",
  ],
})
export class AddressToolTipComponent {
  @Input() model: Document = new Document();
  @Output() updateEvent: EventEmitter<any> = new EventEmitter();

  showAddressTooltip: boolean = false;

  constructor(
    private logger: LoggerService,
    private uploadService: UploadService
  ) {}

  emitUpdateEvent() {
    this.updateEvent.emit();
  }

  onToolTipHover() {
    this.showAddressTooltip = true;
  }

  onToolTipExit() {
    this.showAddressTooltip = false;
  }

  getStateString() {
    return StateStringMap.getStateStringFromClaimId(this.model.forClaims[0]);
  }

  get invalidAddresses(): string[] {
    return this.model.invalid_references;
  }

  helpText(index = 0): string {
    if (this.model.docType == "social") {
      let hText: string =
        this.getStateString() +
        " requires proof of social \
            security when processing a claim without an address attached to it.";
      if (this.hasInvalidReferences) {
        hText =
          hText +
          " We saw that the address attached to the claim was " +
          this.model.invalid_references[index] +
          ", which we marked as an invalid address.";
      }
      return hText;
    } else if (this.model.docType == "address") {
      return (
        this.getStateString() +
        " requires you to prove that you are associated with the with the address listed on the claim. " +
        "The address we have listed for this claim is: " +
        this.model.references +
        ".  If this is not a valid address, you will need to upload a different document to prove the claim belongs to you. "
      );
    } else if (this.model.docType == "identity") {
      return (
        this.getStateString() +
        " requires you to prove your identity to ensure someone is not trying to fraudulently claim your unclaimed property."
      );
    } else {
      return this.getStateString() + " requires proof of " + this.model.docType;
    }
  }

  get buttonText(): string {
    if (this.model.docType == "social") {
      return "This is actually a valid address.";
    } else if (this.model.docType == "address") {
      return "That is not a valid address.";
    }
  }

  get showButton(): boolean {
    if (this.model.docType == "social") {
      if (this.hasInvalidReferences) {
        return true;
      } else {
        return false;
      }
    } else if (this.model.docType == "address") {
      return true;
    } else {
      return false;
    }
  }

  get hasInvalidReferences(): boolean {
    if (
      this.model.invalid_references != null &&
      this.model.invalid_references.length > 0
    ) {
      return true;
    }
  }

  documentVerificationButtonClick(index: number) {
    let addresses: string[];
    let verified: boolean;
    if (this.model.docType == "social") {
      addresses = [this.model.invalid_references[index]];
      verified = true;
    } else if (this.model.docType == "address") {
      addresses = [this.model.references];
      verified = false;
    }

    this.uploadService.verifyAddress(addresses, verified).subscribe(
      (result) => this.onAddressVerificationSuccess(),
      (error) => this.onAddressVerificationError(error)
    );
  }

  onAddressVerificationSuccess() {
    this.emitUpdateEvent();
  }

  onAddressVerificationError(error: any) {
    this.logger.error("Error verifying address");
  }
}
