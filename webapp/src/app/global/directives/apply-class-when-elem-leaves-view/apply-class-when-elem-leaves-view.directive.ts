import {
  Directive,
  ElementRef,
  Input,
  NgZone,
  Renderer2,
  OnInit,
  OnDestroy,
} from "@angular/core";
import { elemInView } from "../../utils";

/**
 * A directive that will apply a class when the element is no longer in the view.
 *
 * @example
 * <div cf-apply-class-when-elem-leaves-view leaveClass="resume-scroll"></div>
 */
@Directive({
  selector: "[cf-apply-class-when-elem-leaves-view]",
})
export class ApplyClassWhenElemLeavesViewDirective
  implements OnInit, OnDestroy {
  /**
   * The class to apply once the element leaves the view.
   */
  @Input() leaveClass: string = "";
  private classApplied: boolean = false;

  constructor(
    private elRef: ElementRef,
    private ngZone: NgZone,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener("scroll", this.onScroll, <any>{
        capture: true,
        passive: true,
      });
    });
  }

  ngOnDestroy() {
    window.removeEventListener("scroll", this.onScroll, <any>{
      capture: true,
      passive: true,
    });
    //unfortunately the compiler doesn't know yet about this object, so cast to any
  }

  onScroll = (): void => {
    this.setClass();
  };

  setClass() {
    let inView = elemInView(this.elRef);
    if (!this.classApplied && !inView) {
      this.renderer.addClass(this.elRef.nativeElement, this.leaveClass);
      this.classApplied = true;
    } else if (this.classApplied && inView) {
      this.renderer.removeClass(this.elRef.nativeElement, this.leaveClass);
      this.classApplied = false;
    }
  }
}
