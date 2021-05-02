import { ElementRef } from "@angular/core";

/**
 * Checks whether a HTML element is currently in the view of the window
 * @param el HTML element reference
 */
export function elemInView(el: ElementRef): boolean {
  let rect = el.nativeElement.getBoundingClientRect();
  if (rect.bottom > document.documentElement.clientHeight) {
    return false;
  }
  if (rect.top < 0) {
    return false;
  }
  if (rect.left < 0) {
    return false;
  }
  if (rect.right > document.documentElement.clientWidth) {
    return false;
  }

  return true;
}
