import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { FillItemBaseComponent } from "../fillitembase";

/**
 * The component in which the user provides the SSN to be placed on the
 * e-signed forms.
 */
@Component({
  selector: "cf-fill-ssn",
  templateUrl: "./fillssn.component.html",
  styleUrls: [
    "../../../../../global/css/normalize.scss",
    "../../../../../global/css/webflow.scss",
    "./fillssn.component.scss",
  ],
})
export class FillSSNComponent extends FillItemBaseComponent {
  @Output() dontProvideSSNFlagChange: EventEmitter<
    boolean
  > = new EventEmitter();
  @ViewChild("ssnInput", { static: true }) ssnInput: ElementRef;

  formConstants: { [key: string]: string } = {
    ssn: "ssn",
  };

  showModal: boolean = false;
  _dontProvideSSN: boolean = false;
  get dontProvideSSN(): boolean {
    return this._dontProvideSSN;
  }

  set dontProvideSSN(value: boolean) {
    if (this.showModal === false && value === true) {
      this.showModal = true;
    }
    this._dontProvideSSN = value;
    this.dontProvideSSNFlagChange.emit(value);
  }

  onCloseModalEvent(keepProvideSSNSelection: boolean) {
    if (!keepProvideSSNSelection) {
      this.dontProvideSSN = false;
    }
    this.showModal = false;
  }

  onClickReadOurPolicyLink(event: Event) {
    this.showModal = true;
    event.stopPropagation();
  }

  onSSNInputChange() {
    this.dontProvideSSN = false;
  }

  onSSNKeyUp(event: KeyboardEvent) {
    let ssnValue: string = this.ssnInput.nativeElement.value;
    if (ssnValue.length >= 4) {
      if (ssnValue[3] !== "-") {
        ssnValue = this.insertDash(ssnValue, 3);
      }
    }
    if (ssnValue.length >= 7) {
      if (ssnValue[6] !== "-") {
        ssnValue = this.insertDash(ssnValue, 6);
      }
    }
    ssnValue = ssnValue.substr(0, 11);
    this.ssnInput.nativeElement.value = ssnValue;
  }

  insertDash(s: string, index: number): string {
    let firstHalf = s.substr(0, index);
    let secondHalf = s.substr(index);
    return firstHalf + "-" + secondHalf;
  }
}
