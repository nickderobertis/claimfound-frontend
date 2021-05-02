import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Highlightable } from "@angular/cdk/a11y";

/**
 * A dropdown input.
 */
@Component({
  selector: "cf-dropdown-item",
  templateUrl: "./dropdownitem.component.html",
  styleUrls: [
    "../../../css/normalize.scss",
    "../../../css/webflow.scss",
    "./dropdownitem.component.scss",
  ],
})
export class DropdownItemComponent implements Highlightable {
  @Input() item: string;
  @Input() itemIndex: number;
  @Output() itemSelected: EventEmitter<number> = new EventEmitter();

  shouldHighlight: boolean = false;

  onItemSelected() {
    this.itemSelected.emit(this.itemIndex);
  }

  setActiveStyles(): void {
    this.shouldHighlight = true;
  }

  setInactiveStyles(): void {
    this.shouldHighlight = false;
  }

  disabled?: boolean;

  getLabel?(): string {
    return this.item;
  }

  getDropDownClass() {
    if (this.shouldHighlight) {
      return "highlighted";
    } else {
      return "";
    }
  }
}
