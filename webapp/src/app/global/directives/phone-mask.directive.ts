import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
  OnChanges,
} from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  AbstractControl,
  Validators,
} from "@angular/forms";
import { Subscription, SubscriptionLike } from "rxjs";
@Directive({
  selector: "[phoneMask]",
})
export class PhoneMaskDirective implements OnChanges, OnDestroy {
  private _phoneControl: AbstractControl;
  private _preValue: string;

  @Input()
  set phoneControl(control: AbstractControl) {
    this._phoneControl = control;
  }
  @Input()
  set preValue(value: string) {
    this._preValue = value;
  }

  private sub: SubscriptionLike;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    this.phoneValidate();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  phoneValidate() {
    this.sub = this._phoneControl.valueChanges.subscribe((data) => {
      /**we remove from input but: 
           @preInputValue still keep the previous value because of not setting.
        */
      let preInputValue: string = this._preValue;
      var lastChar: string = preInputValue.substr(preInputValue.length - 1);
      // remove all mask characters (keep only numeric)
      var newVal = data.replace(/\D/g, "");

      let start = this.renderer.selectRootElement("#phone-box").selectionStart;
      let end = this.renderer.selectRootElement("#phone-box").selectionEnd;
      //when removed value from input
      if (data.length < preInputValue.length) {
        /**while removing if we encounter ) character,
          then remove the last digit too.*/
        if (preInputValue.length < start) {
          if (lastChar == ")") {
            newVal = newVal.substr(0, newVal.length - 1);
          }
        }
        //if no number then flush
        if (newVal.length == 0) {
          newVal = "";
        } else if (newVal.length <= 3) {
          /**when removing, we change pattern match.
          "otherwise deleting of non-numeric characters is not recognized"*/
          newVal = newVal.replace(/^(\d{0,3})/, "($1");
        } else if (newVal.length <= 6) {
          newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, "($1) $2");
        } else {
          newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(.*)/, "($1) $2-$3");
        }

        this._phoneControl.setValue(newVal, { emitEvent: false });
        //keep cursor the normal position after setting the input above.
        this.renderer
          .selectRootElement("#phone-box")
          .setSelectionRange(start, end);
        //when typed value in input
      } else {
        var removedD = data.charAt(start);
        // don't show braces for empty value
        if (newVal.length == 0) {
          newVal = "";
        }
        // don't show braces for empty groups at the end
        else if (newVal.length <= 3) {
          newVal = newVal.replace(/^(\d{0,3})/, "($1)");
        } else if (newVal.length <= 6) {
          newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, "($1) $2");
        } else {
          newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(.*)/, "($1) $2-$3");
        }
        //check typing whether in middle or not
        //in the following case, you are typing in the middle
        if (preInputValue.length >= start) {
          //change cursor according to special chars.
          if (removedD == "(") {
            start = start + 1;
            end = end + 1;
          }
          if (removedD == ")") {
            start = start + 2; // +2 so there is also space char after ')'.
            end = end + 2;
          }
          if (removedD == "-") {
            start = start + 1;
            end = end + 1;
          }
          if (removedD == " ") {
            start = start + 1;
            end = end + 1;
          }
          this._phoneControl.setValue(newVal, { emitEvent: false });
          this.renderer
            .selectRootElement("#phone-box")
            .setSelectionRange(start, end);
        } else {
          this._phoneControl.setValue(newVal, { emitEvent: false });
          this.renderer
            .selectRootElement("#phone-box")
            .setSelectionRange(start + 2, end + 2); // +2 because of wanting standard typing
        }
      }
    });
  }
}
