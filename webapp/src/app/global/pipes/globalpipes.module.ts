import { NgModule } from "@angular/core";

import { PrettyPrintJSONPipe } from "./prettyprintjson.pipe";

/**
 * A module containing pipes which are used on more than one page and which were simple and isolated enough to
 * not put in their own modules.
 */
@NgModule({
  exports: [PrettyPrintJSONPipe],
  declarations: [PrettyPrintJSONPipe],
})
export class GlobalPipesModule {}
