import { SignaturePadOptions } from "./signaturepadoptions.model";
import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { SignaturePad, Point } from "angular2-signaturepad/signature-pad";
import { HostListener } from "@angular/core";
import { sleep } from "src/app/global/utils/sleep";
import { Observable, Subscription } from "rxjs";

/**
 * The lowest-level component responsible for collecting the user's signature
 * or other manually drawn information. Represents only the signature area itself.
 */
@Component({
  selector: "cf-signaturepad",
  templateUrl: "./signaturepad.component.html",
  styleUrls: ["./signaturepad.component.scss"],
})
export class SignaturePadComponent {
  @ViewChild(SignaturePad, { static: false }) signaturePad: SignaturePad;
  @ViewChild("sigPadBox", { static: false }) sigPadBox: ElementRef;

  @Input() submitEvent: Observable<void>;
  private submitSubscription: Subscription;

  @Input() errorText: string;

  @Output() saveEvent: EventEmitter<Point[][]> = new EventEmitter();
  @Output() hadNoSigEvent: EventEmitter<any> = new EventEmitter();

  data: Point[][];
  screenWidth: number = window.innerWidth;

  public signaturePadOptions: SignaturePadOptions = {
    // passed through to szimek/signature_pad constructor
    minWidth: 2,
    maxWidth: 2,
    canvasWidth: 1,
    canvasHeight: 125,
    velocityFilterWeight: 1.5,
  };

  constructor() {}

  ngOnInit() {
    this.submitSubscription = this.submitEvent.subscribe(() =>
      this.handleSubmitEvent()
    );
  }

  ngOnDestroy() {
    this.submitSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.onResize();
  }

  @HostListener("window:resize", ["$event"])
  onResize(event?) {
    this.resizeCanvas();
  }

  resizeCanvas() {
    sleep(5).then(() => {
      let width = this.sigPadBox.nativeElement.clientWidth;
      this.signaturePad.set("canvasWidth", width);
      this.clear();
    });
  }

  clear() {
    this.signaturePad.clear();
  }

  save() {
    if (this.signaturePad.isEmpty()) {
      this.hadNoSigEvent.emit();
      return alert(this.errorText);
    }

    this.data = this.signaturePad.toData();
    this.saveEvent.emit(this.data);
  }

  handleSubmitEvent() {
    this.save();
  }
}
