import {
  Component,
  OnInit,
  OnDestroy,
  Renderer2,
  ViewChild,
  ElementRef,
} from "@angular/core";

import { Subscription } from "rxjs";
import { SelectClaimsService } from "./selectclaims.service";
import { LoggerService } from "../../../global/logger.service";

/**
 * The modal which shows when the user tries to remove a claim that is attached
 * to a form which also has other claims on it, which the user still has selected.
 *
 * As it may be unexpected that removing one claim will delete the forms for others,
 * we display messaging and have the user confirm in this case.
 */
@Component({
  selector: "remove-claim-modal",
  templateUrl: "./removeclaimmodal.component.html",
  styleUrls: [
    "../../../global/css/normalize.scss",
    "../../../global/css/webflow.scss",
    "removeclaimmodal.component.scss",
  ],
})
export class RemoveClaimModalComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  showModal: boolean = false;
  claim_id: string = "";

  claimRemovedEvent$: Subscription;
  showConfirmDeleteEvent$: Subscription;

  @ViewChild("modaloutside", { static: false }) modal: ElementRef;

  constructor(private logger: LoggerService, public selectClaimsService: SelectClaimsService) { }

  ngOnInit(): void {
    this.claimRemovedEvent$ = this.selectClaimsService.claimRemovedEvent.subscribe(
      (result: string) => {
        this.handleRemovedClaim(result);
      }
    );

    this.showConfirmDeleteEvent$ = this.selectClaimsService.showConfirmDeleteEvent.subscribe(
      (result: string) => {
        this.showConfirmModal(result);
      }
    );
  }

  showConfirmModal(result: string) {
    this.claim_id = result;
    this.showModal = true;
  }

  handleRemovedClaim(result: string) {
    this.showModal = false;
    this.isLoading = false;
  }

  clickedOk() {
    this.isLoading = true;
    this.logger.info("remove claim from removeclaimmodal comp claim: ", this.claim_id);
    this.selectClaimsService.removeClaim(this.claim_id, true);
  }

  clickedExit() {
    this.showModal = false;
    this.selectClaimsService.emitClaimRemovalCancelledEvent(this.claim_id);
  }

  clickedOutside(event: Event) {
    if (event.target === this.modal.nativeElement) {
      this.clickedExit();
    }
  }

  ngOnDestroy() {
    this.claimRemovedEvent$.unsubscribe();
    this.showConfirmDeleteEvent$.unsubscribe();
  }
}
