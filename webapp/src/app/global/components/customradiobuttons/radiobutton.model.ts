export class RadioButtonModel {
  options: string[];
  selectedOption: string;

  constructor(options: string[], defaultSelection: string) {
    this.options = options;
    this.selectedOption = defaultSelection;
  }
}
