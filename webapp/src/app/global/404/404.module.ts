import { NgModule } from "@angular/core";

import { _404Component } from "./404.component";
import { HeaderFooterModule } from "../components/headerfooter/headerfooter.module";

/**
 * The module containing the page which is displayed on 404 page not found errors (user goes to incorrect URL).
 */
@NgModule({
  imports: [HeaderFooterModule],
  declarations: [_404Component],
  exports: [_404Component],
})
export class _404Module {}
