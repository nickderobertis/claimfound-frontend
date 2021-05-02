import { Directive, ElementRef, Input, Renderer2, OnInit } from "@angular/core";

interface ApplyClassesToClassesObj {
  [existingClass: string]: string;
}

/**
 * A directive which applies classes to nested HTML elements based on the classes which
 * are already on the elements.
 *
 * This is useful for when styling control is needed over a nested component from its direct parent.
 *
 * @example
 * <my-component
 *    cf-apply-class-to-classes
 *    [applyClassesObj]="{
 *        'existing-class-1': 'new-class-1',
 *        'existing-class-2': 'new-class-2',
 *        'existing-class-3': 'new-class-1',
 *    }"
 * ></my-component>
 */
@Directive({
  selector: "[cf-apply-class-to-classes]",
})
export class ApplyClassToClasses implements OnInit {
  @Input() applyClassesObj: ApplyClassesToClassesObj = {};

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.setClasses();
  }

  setClasses() {
    for (let origClass in this.applyClassesObj) {
      let newClass = this.applyClassesObj[origClass];
      let elements = this.elementsForClass(origClass);
      this.applyClassToElements(elements, newClass);
    }
  }

  elementsForClass(klass: string): NodeList {
    return this.elRef.nativeElement.querySelectorAll("." + klass);
  }

  applyClassToElements(elements: NodeList, klass: string) {
    for (let i = 0; i < elements.length; ++i) {
      this.renderer.addClass(elements[i], klass);
    }
  }
}
