export class DropDownModel {
  items: string[];
  defaultPlaceHolder: string;
  multiSelect: boolean;
  defaultIsSelected: boolean;
  selectedItems = new Set<string>();

  constructor(
    items: string[],
    defaultPlaceholder: string = "",
    multiSelect: boolean = false,
    defaultIsSelected: boolean = false
  ) {
    this.items = items;
    this.defaultPlaceHolder = defaultPlaceholder;
    this.multiSelect = multiSelect;
    this.defaultIsSelected = defaultIsSelected;
    if (this.defaultIsSelected) {
      for (let item of this.items) {
        this.selectedItems.add(item);
      }
    }
  }

  hasSelection(): boolean {
    return this.selectedItems.size > 0;
  }

  getSelectionsArray(): string[] {
    return Array.from(this.selectedItems.values());
  }

  // Convenience method to get the selection when multi-select is disabled
  getSingleSelection(): string {
    if (this.multiSelect) {
      throw new Error(
        "Called GetSingleSelection when multi-select was enabled"
      );
    }
    if (this.selectedItems.size > 0) {
      return this.getSelectionsArray()[0];
    } else {
      return "";
    }
  }
}
