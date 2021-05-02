import { ViewChildren, QueryList, Input, Output, EventEmitter, ElementRef, ViewChild } from "@angular/core";
import { DropdownItemComponent } from "../dropdownitem/dropdownitem.component";
import { ActiveDescendantKeyManager } from "@angular/cdk/a11y";
import { DropDownModel } from '../dropdown.model';

/**
 * Base class for dropdowns handles keyboard navigation for our custom dropdowns.
 */
export abstract class DropDownBaseComponent {
  @Input() model: DropDownModel;
  @Input() scrollable: boolean = false;
  @Output() selectionsChanged: EventEmitter<string[]> = new EventEmitter();
  @ViewChildren(DropdownItemComponent) dropdownOptions: QueryList<
    DropdownItemComponent
  >;

  // This element ref is currently used only to handle scrolling on scrollable dropdowns.
  // Look at dropdown.component.html to get an example of some html it is working with.
  dropdownElement: ElementRef;
  @ViewChild('dropdownel', { static: false }) set content(content: ElementRef) {
    if(this.showItems) { // initially setter gets called with undefined
        this.dropdownElement = content;
    }
  }

  keyManager: ActiveDescendantKeyManager<DropdownItemComponent>;

  showItems: boolean = false;
  // This is defaulted to -1 so that the first press doesn't skip the first option
  highlightedIndex = -1;

  public ngAfterViewInit() {
    this.keyManager = new ActiveDescendantKeyManager(this.dropdownOptions);
  }

  public onKeyDown(event: KeyboardEvent) {
    if (event.key == "Enter" || event.key == " ") {
      if (this.showItems && this.highlightedIndex != -1) {
        this.onSelectionChange(this.highlightedIndex);
      } else {
        this.toggleDropdown();
        if(!this.model.multiSelect){
          let setHighlightCallback = () => {
            if(this.highlightedIndex == -1) {
              this.setHighlightedItemIfItemMatchesString(this.model.defaultPlaceHolder);
            } else {
              this.setHighlightedItemIfItemMatchesString(this.model.getSingleSelection());
            }
            this.keyManager.setActiveItem(this.highlightedIndex);
            this.scrollToItemIfScrollable(this.highlightedIndex);
          };
          setTimeout(setHighlightCallback, 0);
        }
      }
      return false;
    } else if (this.showItems) {
      if (
        [
          "ArrowUp",
          "Up",
          "ArrowDown",
          "Down",
          "ArrowRight",
          "Right",
          "ArrowLeft",
          "Left",
        ].indexOf(event.key) > -1
      ) {
        if (["ArrowUp", "Up", "ArrowLeft", "Left"].indexOf(event.key) > -1) {
          this.highlightedIndex = this.getPrevSelectionIndex(
            this.highlightedIndex
          );
          this.keyManager.setActiveItem(this.highlightedIndex);
          this.scrollToItemIfScrollable(this.getPrevSelectionIndex(this.highlightedIndex + 1));
        } else {
          this.highlightedIndex = this.getNextSelectionIndex(
            this.highlightedIndex
          );
          this.keyManager.setActiveItem(this.highlightedIndex);
          this.scrollToItemIfScrollable(this.getNextSelectionIndex(this.highlightedIndex - 1));
        }
      } else if (
        event.key == "Tab" ||
        event.key == "Esc" ||
        event.key == "Escape"
      ) {
        this.toggleDropdown();
      } else if (
        this.keyPressIsLetter(event.key)
      ) {
        this.highlightNextEntryWithMatchingFirstCharacter(event.key);
      }
      return false;
    }
  }

  scrollToItemIfScrollable(itemIndex: number) {
    if(this.scrollable) {
      let scrollPosition = 0;
      if(itemIndex >= 5) {
        scrollPosition = (itemIndex * 45) - 180;
      }
      this.dropdownElement.nativeElement.scrollTo(0, scrollPosition);
    }
  }

  keyPressIsLetter(key: string): boolean {
    let regex = /[a-zA-Z]/g;
    let matches = key.match(regex);
    if(matches && matches.length == 1) {
      return true;
    }
    return false;
  }

  highlightNextEntryWithMatchingFirstCharacter(char: string) {
    char = char.toLowerCase();
    for(let i = this.highlightedIndex + 1; i < this.model.items.length; i++) {
      if(this.model.items[i].slice(0,1).toLowerCase() == char) {
        this.highlightedIndex = i;
        this.keyManager.setActiveItem(i);
        this.scrollToItemIfScrollable(i);
        return;
      }
    }
    for(let i = 0; i < this.highlightedIndex; i++) {
      if(this.model.items[i].slice(0,1).toLowerCase() == char) {
        this.highlightedIndex = i;
        this.keyManager.setActiveItem(i);
        this.scrollToItemIfScrollable(i);
        return;
      }
    }
  }

  setHighlightedItemIfItemMatchesString(value: string) {
    for(let i = 0; i < this.model.items.length; i++) {
      if(this.model.items[i] == value) {
        this.highlightedIndex = i;
        return;
      }
    }
  }

  abstract toggleDropdown();
  abstract getNextSelectionIndex(number): number;
  abstract getPrevSelectionIndex(number): number;
  abstract onSelectionChange(selection: number);
}
