import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "cf-ssn-popup",
  templateUrl: "./ssnpopup.component.html",
  styleUrls: [
    "../../../../../../global/css/normalize.scss",
    "../../../../../../global/css/webflow.scss",
    "./ssnpopup.component.scss",
  ],
  host: {
    "(document:click)": "onClickOutside($event)",
  },
})
export class SSNPopupComponent {
  @Input() showModal: boolean;
  @Output() closeModalEvent: EventEmitter<boolean> = new EventEmitter();

  @ViewChild("modalBody", { static: true }) modal: ElementRef;

  constructor(public router: Router) {}

  onContinueClick() {
    this.closeModalEvent.emit(false);
  }

  onCloseClick() {
    this.closeModalEvent.emit(true);
  }

  onClickOutside(event: any): void {
    if (!this.modal.nativeElement.contains(event.target)) {
      this.closeModalEvent.emit(true);
    }
  }

  onPrivacyLinkClick() {
    this.router.navigate(["/privacy"]);
  }
}
