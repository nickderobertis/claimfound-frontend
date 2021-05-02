import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  EventEmitter,
  Output,
} from "@angular/core";

import { LoggerService } from "../../../../global/logger.service";

import { RelativeClaimsModel } from "../../models/relative-claims.model";

/**
 * This is a modal that lets the user know a claim has been added to thier dashboard
 */
@Component({
  selector: "cf-claim-added-to-dashboard-modal",
  templateUrl: "./claimaddedtodashboardmodal.component.html",
  styleUrls: [
    "../../../../global/css/normalize.scss",
    "../../../../global/css/webflow.scss",
    "./claimaddedtodashboardmodal.component.scss",
  ],
})
export class AddedClaimToDashboardComponent implements OnInit {
  @Input() model: RelativeClaimsModel;
  @Output() closeModalEvent: EventEmitter<any> = new EventEmitter<any>();

  showClaimAddedModal = false;
  @ViewChild("deceasedRelativeModalContainer", { static: true })
  deceasedRelativeModalContainer: ElementRef;

  constructor(private logger: LoggerService) {}

  ngOnInit() {}

  openClaimAddedToDashboardModal(relative: RelativeClaimsModel) {
    this.showClaimAddedModal = true;
  }

  closeIfClickedOutside(event: any) {
    if (
      !this.deceasedRelativeModalContainer.nativeElement.contains(event.target)
    ) {
      this.closeClaimsAddedModal();
    }
  }

  closeClaimsAddedModal() {
    this.closeModalEvent.emit();
  }
}
