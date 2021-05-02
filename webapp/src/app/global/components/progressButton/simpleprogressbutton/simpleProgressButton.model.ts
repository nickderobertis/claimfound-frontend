export class SimpleProgressButtonModel {
    showSpinner: boolean = false;
    buttonText: string = "Submit";
    disabled: boolean = false;
    width: number = 80;
    height: number = 30;

    constructor(args: SimpleProgressButtonModelArgs) {
        for(let key in args) {
            this[key] = args[key];
        }
    }

    get spinnerSize(): number {
        return this.height / 2;
    }
}

export interface SimpleProgressButtonModelArgs {
    showSpinner?: boolean;
    buttonText?: string;
    disabled?: boolean;
    width?: number;
    height?: number;
}