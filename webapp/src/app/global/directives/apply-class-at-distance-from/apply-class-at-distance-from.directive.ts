import {
  Directive,
  ElementRef,
  Input,
  NgZone,
  Renderer2,
  OnInit,
  OnDestroy,
} from "@angular/core";

/**
 * A directive that will apply a class when the element is a certain distance from the edge of a page.
 *
 * @example
 * <div
 *     cf-apply-class-at-distance-from
 *     position="375"
 *     applyClass="stop-scroll"
 *     direction="bottom"
 * ></div>
 */
@Directive({
  selector: "[cf-apply-class-at-distance-from]",
})
export class ApplyClassAtDistanceFromDirective implements OnInit, OnDestroy {
  /**
   * The class to apply when the appropriate position is reached
   */
  @Input() applyClass: string = "";

  /**
   * The distance from the edge of the page when the class should be applied
   */
  @Input() position: number;

  /**
   * The edge of the page to look for how close the element is. Possible values are 'top', 'bottom', 'left', and 'right'.
   */
  @Input() direction: string = "bottom";
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
    let currentOffset = offset(this.elRef)[this.direction];

    if (!this.classApplied && currentOffset < this.position) {
      this.renderer.addClass(this.elRef.nativeElement, this.applyClass);
      this.classApplied = true;
    } else if (this.classApplied && currentOffset >= this.position) {
      this.renderer.removeClass(this.elRef.nativeElement, this.applyClass);
      this.classApplied = false;
    }
  }
}

// Distance of element from edges of page
function offset(el: ElementRef) {
  let body = document.body,
    html = document.documentElement;
  let pageHeight = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
  let pageWidth = Math.max(
    body.scrollWidth,
    body.offsetWidth,
    html.clientWidth,
    html.scrollWidth,
    html.offsetWidth
  );
  let rect = el.nativeElement.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft,
    bottom: pageHeight - window.pageYOffset - rect.bottom,
    right: pageWidth - window.pageXOffset - rect.right,
  };
}
