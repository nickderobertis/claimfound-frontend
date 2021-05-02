import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ApplyClassAtDistanceFromDirective } from "./apply-class-at-distance-from/apply-class-at-distance-from.directive";
import { ApplyClassWhenElemLeavesViewDirective } from "./apply-class-when-elem-leaves-view/apply-class-when-elem-leaves-view.directive";
import { ApplyClassToClasses } from "./apply-class-to-classes/apply-class-to-classes.directive";
import { PasswordToggleDirective } from "./password-toggle.directive";

/**
 * A module containing directives which are used on more than one page and which were simple and isolated enough to
 * not put in their own modules.
 */
@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    ApplyClassAtDistanceFromDirective,
    ApplyClassWhenElemLeavesViewDirective,
    ApplyClassToClasses,
    PasswordToggleDirective,
  ],
  exports: [
    ApplyClassAtDistanceFromDirective,
    ApplyClassWhenElemLeavesViewDirective,
    ApplyClassToClasses,
    PasswordToggleDirective,
  ],
})
export class GlobalDirectivesModule {}
