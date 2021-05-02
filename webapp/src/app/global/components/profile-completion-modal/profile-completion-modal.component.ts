import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { Subscription } from "rxjs";

import { ProfileCompletionService } from "../../services/profile-completion.service";

/**
 * The modal which displays if the user tries to navigate too far in the process
 * without having completed the profile.
 *
 * Contains a button to send the user back to the profile page.
 */
@Component({
  selector: "cf-profile-completion-modal",
  templateUrl: "./profile-completion-modal.component.html",
  styleUrls: [
    "../../css/normalize.scss",
    "../../css/webflow.scss",
    "./profile-completion-modal.component.scss",
  ],
})
export class ProfileCompletionModalComponent implements OnInit, OnDestroy {
  modalVisible: boolean = false;
  showProfileIncomplete$: Subscription;
  @ViewChild("profileCompletionModalWrapper", { static: false })
  profileCompletionModalWrapper: ElementRef;
  @Input() raiseImmediately: boolean = true;
  @Input() showRedCross = false;

  constructor(private profileCompletionService: ProfileCompletionService) {
    this.showProfileIncomplete$ = this.profileCompletionService.showProfileIncomplete.subscribe(
      (event) => {
        this.enableModal();
      }
    );
  }

  ngOnInit(): void {
    if (this.raiseImmediately) {
      this.profileCompletionService.getStatusPushEvents();
    }
    if (this.showRedCross) {
      this.enableCloseButton();
    }
  }

  enableModal(): void {
    this.modalVisible = true;
  }

  disableModal(): void {
    this.modalVisible = false;
  }

  enableCloseButton(): void {
    this.showRedCross = true;
  }

  closeIfClickedOutside(event: MouseEvent): void {
    if (
      this.showRedCross &&
      !this.profileCompletionModalWrapper.nativeElement.contains(event.target)
    ) {
      this.disableModal();
    }
  }

  ngOnDestroy(): void {
    this.showProfileIncomplete$.unsubscribe();
  }
}
