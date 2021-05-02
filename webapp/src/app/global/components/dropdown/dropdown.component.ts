import {
  Component,
  Input,
  ElementRef,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
} from "@angular/core";
import { DropDownModel } from "./dropdown.model";
import { DropDownBaseComponent } from "./base/dropdownbase";

/**
 * A styled implementation of a dropdown input.
 *
 * Handles single-select dropdowns.
 */
@Component({
  selector: "cf-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: [
    "../../css/normalize.scss",
    "../../css/webflow.scss",
    "./dropdown.component.scss",
  ],
  host: {
    "(document:click)": "onClickOutside($event)",
  },
})
export class DropdownComponent extends DropDownBaseComponent {
  private _disabled: boolean = false;
  @Input() set disabled(value: boolean) {
    this._disabled = value;
    this.model.selectedItems.clear();
    this.setSelections(this.model.defaultPlaceHolder);
    this.emitSelections();
  }

  get disabled(): boolean {
    return this._disabled;
  }

  constructor(private elRef: ElementRef) {
    super();
  }

  onSelectionChange(selection: number): void {
    this.setSelections(this.model.items[selection]);
    this.emitSelections();
  }

  setSelections(selection: string): void {
    if (this.model.multiSelect) {
      this.model.selectedItems.add(selection);
      return;
    }
    this.model.selectedItems.clear();
    this.model.selectedItems.add(selection);
    this.showItems = false;
  }

  emitSelections(): void {
    this.selectionsChanged.emit(Array.from(this.model.selectedItems.values()));
  }

  get placeHolderText(): string {
    let ss = this.model.selectedItems;
    if (!ss.size) {
      return this.model.defaultPlaceHolder;
    }

    return Array.from(ss.values()).join(", ");
  }

  onClick(event: any): void {
    if (this.disabled) {
      return;
    }
    if (this.showItems === false) {
      this.showItems = true;
    } else {
      this.showItems = false;
    }
  }

  onClickOutside(event: any): void {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.showItems = false;
    }
  }

  get disabledClass(): string {
    if (this.disabled) {
      return "disabled";
    } else {
      return "";
    }
  }

  get scrollableClass(): string {
    if (this.scrollable && this.showItems) {
      return "scroll";
    } else {
      return "";
    }
  }

  getNextSelectionIndex(currentIndex: number): number {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= this.model.items.length) {
      nextIndex = 0;
    }
    return nextIndex;
  }
  getPrevSelectionIndex(currentIndex: number): number {
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      prevIndex = this.model.items.length - 1;
    }
    return prevIndex;
  }
  toggleDropdown() {
    this.onClick(null);
  }
}
