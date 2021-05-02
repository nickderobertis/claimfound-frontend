import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  OnDestroy,
  OnInit,
} from "@angular/core";

/**
 * A directive which modifies an input text field to add a button which will toggle between
 * hiding the text as a password, and displaying as plain text.
 *
 * Currently being used in password fields to give the user the ability to view the typed password.
 */
@Directive({
  selector: "[cfPasswordToggle]",
})
export class PasswordToggleDirective implements OnDestroy, OnInit {
  @Input() passwordId: string;
  private togglePasswordCallback: () => void;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.setup();
  }

  togglePassword(): void {
    // getting password element through parent element
    let passwordElement: HTMLElement = this.el.nativeElement.parentElement
      .children[this.passwordId];

    let passwordFieldType: string = passwordElement.getAttribute("type");
    let imageClassWhenToggled: string = "toggled";

    if (passwordFieldType === "password") {
      this.renderer.setAttribute(passwordElement, "type", "text");
      // changing image of toggle button
      this.renderer.addClass(this.el.nativeElement, imageClassWhenToggled);
    } else {
      this.renderer.setAttribute(passwordElement, "type", "password");
      // reverting the change with toggled image
      this.renderer.removeClass(this.el.nativeElement, imageClassWhenToggled);
    }
  }

  setup(): void {
    // adding event listener dynamically to toggle element
    this.togglePasswordCallback = () => this.togglePassword();
    this.el.nativeElement.addEventListener(
      "click",
      this.togglePasswordCallback
    );
  }

  ngOnDestroy(): void {
    this.el.nativeElement.removeEventListener(
      "click",
      this.togglePasswordCallback
    );
  }
}
