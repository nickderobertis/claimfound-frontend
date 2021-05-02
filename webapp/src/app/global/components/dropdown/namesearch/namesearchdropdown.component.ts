import {
  Component,
  Input,
  ElementRef,
  Output,
  EventEmitter,
  OnInit,
} from "@angular/core";
import { DropDownBaseComponent } from "../base/dropdownbase";
import { state } from "@angular/animations";

/**
 * The styled dropdown input being used in the property search.
 */
@Component({
  selector: "cf-namesearch-dropdown",
  templateUrl: "./namesearchdropdown.component.html",
  styleUrls: [
    "../../../css/normalize.scss",
    "../../../css/webflow.scss",
    "./namesearchdropdown.component.scss",
  ],
  host: {
    "(document:click)": "onClickOutside($event)",
  },
})
export class NameSearchDropdownComponent extends DropDownBaseComponent
  implements OnInit {
  @Input() idPrefix: string = "default";
  private supportedStates = ["FL"];
  public selectBooleans: boolean[] = [];

  constructor(private elRef: ElementRef) {
    super();
  }

  ngOnInit() {
    this.setDefaultSelections();
    this.emitSelections();
  }

  onSelectionChange(selectIndex: number) {
    if (this.model.multiSelect) {
      this.selectBooleans[selectIndex] = !this.selectBooleans[selectIndex];
    } else {
      this.showItems = false;
      let currentSelectionValue = this.selectBooleans[selectIndex];
      for (let i = 0; i < this.selectBooleans.length; i++) {
        this.selectBooleans[i] = false;
      }
      this.selectBooleans[selectIndex] = !currentSelectionValue;
    }
    this.emitSelections();
  }

  setDefaultSelections() {
    if (this.model.defaultIsSelected) {
      let index = 0;
      for (let state of this.model.items) {
        if (this.supportedStates.includes(state)) {
          this.selectBooleans[index] = true;
        }
        index++;
      }
    } else {
      this.selectBooleans = this.booleanArr(false);
    }
  }

  emitSelections() {
    this.selectionsChanged.emit(this.selectedItems);
  }

  get selectedItems(): string[] {
    let selectedItemsArr = [];
    for (let i = 0; i < this.model.items.length; ++i) {
      let item = this.model.items[i];
      let selectBoolean = this.selectBooleans[i];
      if (selectBoolean) {
        selectedItemsArr.push(item);
      }
    }
    return selectedItemsArr;
  }

  get placeHolderText(): string {
    let ss = this.selectedItems;
    if (!ss.length) {
      return this.model.defaultPlaceHolder;
    }

    if (this.selectedItems.length > 4) {
      // just keep 4 and append ...
      let count = 0;
      let states = "";

      for (let state of this.selectedItems) {
        if (count === 4) {
          states += "...";
          break;
        }
        states += state + ", ";
        count++;
      }
      return states;
    }

    return ss.join(", ");
  }

  booleanArr(bool: boolean): boolean[] {
    return new Array(this.model.items.length).fill(bool);
  }

  onClick(event: any) {
    if (this.showItems === false) {
      this.showItems = true;
    } else {
      this.showItems = false;
    }
  }

  onClickOutside(event: any) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.showItems = false;
    }
  }

  getVisibleClass() {
    if (this.showItems) {
      return "visible";
    } else {
      return "";
    }
  }

  toggleDropdown() {
    this.onClick(null);
  }
  getNextSelectionIndex(currentIndex): number {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= this.model.items.length) {
      nextIndex = 0;
    }
    return nextIndex;
  }
  getPrevSelectionIndex(currentIndex): number {
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      prevIndex = this.model.items.length - 1;
    }
    return prevIndex;
  }
}
