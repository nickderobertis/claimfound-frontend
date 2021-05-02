import {
  Component,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  Input,
} from "@angular/core";
import {
  trigger,
  transition,
  animate,
  style,
  query,
  state,
  AnimationEvent,
} from "@angular/animations";
import { sleep } from "../../utils";
import { ProgressButtonModel } from "./progressButton.model";

/**
 * This is an animated submit button that will show success or failure.
 *
 * ## Usage:
 * - Include `<cf-progress-button (submitEvent)="onProgressSubmit()" #progressButton></cf-progress-button>` in html
 * - Add the method `onProgressSubmit()` to ts, upon which it should run the submit logic
 * - Add to ts: `@ViewChild('progressButton', {static: true}) progressEl: ProgressButtonComponent;`
 * - Subscribe to submit:
 *     - on success call `this.progressEl.triggerResult(true)`;
 *     - on fail, call `this.progressEl.triggerResult(false)`;
 * - If something needs to happen after final animation finishes, can also bind to `(finishAnimationEvent)` output
 *   which occurs after button has finished all its animations
 * - Can also set size of button, colors, and text
 * - Optionally can include `[model]="progressButtonModel"` in the html
 *   by defining `progressButtonModel: ProgressButtonModel = new ProgressButtonModel()` and passing any arguments of
 *   [ProgressButtonArgs]{@link ProgressButtonArgs} into `ProgressButtonModel()` such as `ProgressButtonModel({width: 100})`
 * - if `autoReset=false` in the model then doesn't go back to button at end. In that case can reset by `this.progressEl.resetButton()`;
 */
@Component({
  selector: "cf-progress-button",
  templateUrl: "./progressButton.component.html",
  styleUrls: [
    "../../css/normalize.scss",
    "../../css/webflow.scss",
    "./progressButton.component.scss",
  ],
  animations: [
    trigger("drawCircle", [
      state(
        "undrawn",
        style({ strokeDashoffset: "{{ dashOffset }}", opacity: 1 }),
        { params: { dashOffset: 172.79 } }
      ),
      state("drawn", style({ strokeDashoffset: 0, opacity: 1 })),
      state("hidden", style({ opacity: 0 })),
      transition("undrawn => drawn", [animate(3000)]),
    ]),
    trigger("submitStateChange", [
      state(
        "unsubmitted",
        style({
          width: "{{ origWidth }}px",
          height: "{{ origHeight }}px",
          borderWidth: "2px",
          borderColor: "rgba(36, 90, 170, 0.8)",
        }),
        { params: { origWidth: 140, origHeight: 70 } }
      ),
      state(
        "submitted",
        style({
          width: "{{ circleWidth }}px",
          height: "{{ circleWidth }}px",
          borderWidth: "5px",
          borderColor: "#ddd",
          color: "#fff",
        }),
        { params: { circleWidth: 60 } }
      ),
      state(
        "success",
        style({
          width: "{{ origWidth }}px",
          height: "{{ origHeight }}px",
          borderWidth: "2px",
          borderColor: "#1ECD97",
          borderRadius: "4px",
        }),
        { params: { origWidth: 140, origHeight: 70 } }
      ),
      state(
        "fail",
        style({
          width: "{{ origWidth }}px",
          height: "{{ origHeight }}px",
          borderWidth: "2px",
          borderColor: "#FB797E",
          borderRadius: "4px",
        }),
        { params: { origWidth: 140, origHeight: 70 } }
      ),
      transition("unsubmitted => submitted", animate(100)),
      transition("* => *", animate(500)),
    ]),
    trigger("drawCheck", [
      state(
        "false",
        style({
          opacity: 0,
        })
      ),
      state(
        "true",
        style({
          opacity: 1,
        })
      ),
      transition("false => true", animate(500)),
    ]),
    trigger("drawX", [
      state(
        "false",
        style({
          opacity: 0,
        })
      ),
      state(
        "true",
        style({
          opacity: 1,
        })
      ),
      transition("* <=> *", animate(500)),
    ]),
  ],
})
export class ProgressButtonComponent {
  @Output() submitEvent: EventEmitter<void> = new EventEmitter();
  @Output() finishAnimationEvent: EventEmitter<void> = new EventEmitter();
  @Input() model: ProgressButtonModel = new ProgressButtonModel();

  constructor(private _cd: ChangeDetectorRef) {}

  triggerResult(successful: boolean) {
    this.model.circleState = "hidden";
    if (successful) {
      this.model.submitState = "success";
      this.model.checkVisible = true;
    } else {
      this.model.submitState = "fail";
      this.model.xVisible = true;
    }
    this._cd.detectChanges();
  }

  onClick($event: MouseEvent) {
    this.submitEvent.emit();
    this.model.submitState = "undrawn";
    this.model.submitState = "submitted";
    this.model.circleState = "drawn";
  }

  onFinishDrawCircle($event: AnimationEvent) {
    if (!this.model.triggered) {
      // Stop drawing circle when done loading
      return;
    }

    if ($event.toState !== "drawn") {
      // Only need cycling logic on finish draw events
      return;
    }

    if (this.model.circleState === "hidden") {
      // Result was triggered but this event already in the chain. Stop looping
      return;
    }

    // Still loading, draw circle with next color
    this.model.incrementBackgroundColor();
    this._cd.detectChanges();
    // Background and drawn circle now the same color, now make the drawn circle empty as it will be invisible
    this.model.circleState = "undrawn";
    this.model.incrementDrawColor();
    this._cd.detectChanges();
    // Foreground circle empty and ready to be drawn again
    this.model.circleState = "drawn";
  }

  onFinishSubmitAnimation($event: AnimationEvent) {
    if (!this.model.autoReset) {
      // Auto reset turned off, just finish with success or fail animation
      this.finishAnimationEvent.emit();
      return;
    }

    if (!($event.toState === "success" || $event.toState === "fail")) {
      // Only call return to unsubmitted animation after success or fail
      return;
    }

    // Got success or fail animation end. Sleep, then call animation back to original unsubmitted state
    sleep(1000).then(() => {
      this.model.resetButton();
      this.finishAnimationEvent.emit();
    });
  }
}
