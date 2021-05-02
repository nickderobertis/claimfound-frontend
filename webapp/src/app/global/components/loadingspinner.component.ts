import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";

/**
 * The component which displays a loading animation.
 *
 * Currently displays a spinning circle which cycles through colors.
 */
@Component({
  selector: "cf-loading-spinner",
  templateUrl: "./loadingspinner.component.html",
  styleUrls: [
    "../css/normalize.scss",
    "../css/webflow.scss",
    "./loadingspinner.component.scss",
  ],
})
export class LoadingSpinnerComponent implements OnChanges, OnInit {
  @Input() size?: number = 65;
  private boxSize: number;

  ngOnChanges(changes: SimpleChanges) {
    this.setBoxSize();
  }

  ngOnInit() {
    this.setBoxSize();
  }

  setBoxSize() {
    //FIXME: May have to rework this for sizes other than 65px
    this.boxSize = this.size + 1;
  }
}
