// The following constants are defaults, they may be set when creating the model
// Background color before clicking submit
const ORIGINAL_BACKGROUND_COLOR: string = "rgba(36, 90, 170, 0.8)";

// Border color when disabled
const DISABLED_BORDER_COLOR: string = "rgba(170, 185, 210, 0.8)";

// Original circle background (gray for first cycle, not repeated)
const ORIGINAL_CIRCLE_BACKGROUND: string = "rgb(101, 102, 101)";

// Cycle colors. Circle starts drawing form first of these, while background will be ORIGINAL_CIRCLE_BACKGROUND.
// Thereafter both background and drawn circle cycle through these
const CYCLE_COLORS: string[] = [
  "rgb(59, 254, 184)",
  "rgb(19, 235, 162)",
  "rgb(10, 212, 139)",
  "rgb(5, 172, 114)",
  "rgb(5, 102, 68)",
];

export interface ProgressButtonArgs {
  submitText?: string;
  textSize?: number;
  autoReset?: boolean;
  width?: number;
  height?: number;
  disabled?: boolean;
  origBackgroundColor?: string;
  disabledBorderColor?: string;
  origCircleColor?: string;
  cycleColors?: string[];
}

export class ProgressButtonModel implements ProgressButtonArgs {
  submitText: string = "Submit";
  textSize: number = 16;
  autoReset: boolean = true;
  width: number = 140;
  height: number = 60;
  disabled: boolean = false;
  origBackgroundColor: string = ORIGINAL_BACKGROUND_COLOR;
  disabledBorderColor: string = DISABLED_BORDER_COLOR;
  origCircleColor: string = ORIGINAL_CIRCLE_BACKGROUND;
  cycleColors: string[] = CYCLE_COLORS;

  drawColorIdx: number = 0;
  backgroundCircleColorIdx: number = -1;
  circleState: string = "hidden";
  submitState: string = "unsubmitted";
  checkVisible: boolean = false;
  xVisible: boolean = false;

  constructor(args?: ProgressButtonArgs) {
    if (!args) {
      return;
    }

    // Assign any properties which were passed
    for (let argName in args) {
      this[argName] = args[argName];
    }
  }

  get backgroundCircleColor(): string {
    if (this.submitState === "unsubmitted") {
      // While this is a button and not the background of the loading circle, use original button color or disabled color
      if (this.currentlyDisabled) {
        // Disabled, return disabled border color
        return this.disabledBorderColor;
      }
      // Enabled but not clicked, original border color
      return ORIGINAL_BACKGROUND_COLOR;
    }
    if (this.backgroundCircleColorIdx < 0) {
      // Start with gray, then cycle through colors after that
      return ORIGINAL_CIRCLE_BACKGROUND;
    }

    return CYCLE_COLORS[this.backgroundCircleColorIdx];
  }

  get drawCircleColor(): string {
    return CYCLE_COLORS[this.drawColorIdx];
  }

  get triggered(): boolean {
    return this.submitState !== "unsubmitted";
  }

  get currentlyDisabled(): boolean {
    return this.disabled || this.triggered;
  }

  get circleSize(): number {
    return Math.min(this.width, this.height);
  }

  get circlePathOffset(): number {
    return this.circleSize / 2;
  }

  get circleRadius(): number {
    return this.circlePathOffset - 2.5;
  }

  get circleDashArraySize(): number {
    // Multiply by pi to get circumference of circle, but back off a bit because for some reason
    // creates a delay between drawing circles on small circle sizes
    return this.circleSize * 3;
  }

  incrementDrawColor() {
    this.drawColorIdx++;
    if (this.drawColorIdx > CYCLE_COLORS.length - 1) {
      this.drawColorIdx = 0;
    }
  }

  incrementBackgroundColor() {
    this.backgroundCircleColorIdx++;
    if (this.backgroundCircleColorIdx > CYCLE_COLORS.length - 1) {
      this.backgroundCircleColorIdx = 0;
    }
  }

  resetButton() {
    this.checkVisible = false;
    this.xVisible = false;
    this.circleState = "hidden";
    this.drawColorIdx = 0;
    this.backgroundCircleColorIdx = -1;
    this.submitState = "unsubmitted";
  }
}
