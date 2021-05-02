import { NgModule } from "@angular/core";

import { JumpoffPageComponent } from "./jumpoff.component";

/**
 * This module contains the page to display messaging before routing the user to an external link.
 *
 * When the user clicks a link to an external site, for legal reasons we want to make it clear they
 * are leaving the site and will no longer be bound by TOS/PP.
 */
@NgModule({
  declarations: [JumpoffPageComponent],
})
export class JumpoffModule {}
