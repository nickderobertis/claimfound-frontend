import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Highlightable } from "@angular/cdk/a11y";
import { DropdownItemComponent } from "../../dropdownitem/dropdownitem.component";

/**
 * A dropdown input for the namesearch dropdown supports multi-select.
 */
@Component({
  selector: "cf-namesearchdropdown-item",
  templateUrl: "./namesearchdropdownitem.component.html",
  styleUrls: [
    "../../../../css/normalize.scss",
    "../../../../css/webflow.scss",
    "./namesearchdropdownitem.component.scss",
  ],
  providers: [
    {
      provide: DropdownItemComponent,
      useExisting: NameSearchDropdownItemComponent,
    },
  ],
})
export class NameSearchDropdownItemComponent extends DropdownItemComponent {
  @Input() item: string;
  @Input() itemIndex: number;
  @Input() selectBooleans: boolean[];
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
