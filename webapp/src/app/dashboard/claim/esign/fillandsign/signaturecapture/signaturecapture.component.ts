import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Point } from "angular2-signaturepad/signature-pad";
import { Observable, Subscription, Subject } from "rxjs";

/**
 * The component responsible for collecting a signature or other
 * manually drawn info.
 *
 * Delegates the main functionality to [SignaturePadComponent]{@link SignaturePadComponent}.
 * This component mainly provides the outer text and sends events.
 */
@Component({
  selector: "cf-signature-capture",
  templateUrl: "./signaturecapture.component.html",
  styleUrls: [
    "../../../../../global/css/normalize.scss",
    "../../../../../global/css/webflow.scss",
    "./signaturecapture.component.scss",
  ],
})
export class SignatureCaptureComponent {
  @Input() titleText: string = "🖌 Claim Form Signature";
  @Input() instructionsText: string =
    "Florida requires a manually created signature to validate your claim form. Please create your signature with a mouse or your finger below.";
  @Input() errorText: string = "Please provide a signature.";
  @Input() submitEvent: Observable<void>;
  @Output() saveEvent: EventEmitter<Point[][]> = new EventEmitter();

  hadNoSigAlerted: boolean = false;

  private submitSubscription: Subscription;
  submitSubject: Subject<void> = new Subject<void>();

  ngOnInit() {
    this.submitSubscription = this.submitEvent.subscribe(() =>
      this.passSubmitEvent()
    );
  }

  ngOnDestroy() {
    this.submitSubscription.unsubscribe();
  }

  passSubmitEvent() {
    this.submitSubject.next();
  }

  onSaveEvent(points: Point[][]) {
    this.saveEvent.emit(points);
    this.hadNoSigAlerted = false;
  }

  onNoSignatureEvent() {
    this.hadNoSigAlerted = true;
  }
}
