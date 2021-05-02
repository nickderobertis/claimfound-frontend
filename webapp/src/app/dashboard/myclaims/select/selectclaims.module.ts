import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { LoggerService } from "../../../global/logger.service";
import { SelectClaimsService } from "./selectclaims.service";

import { GlobalComponentsModule } from "../../../global/components/globalcomponents.module";

import { SelectClaimsPageComponent } from './selectclaimspage.component';
import { SelectClaimTableComponent } from './claimlists/selectclaims/selectclaimtable.component';
import { SelectClaimTableRowComponent } from './claimlists/tablerows/select/selectclaimtablerow.component';
import { PreviouslyViewedClaimsTableComponent } from './claimlists/selectclaims/previouslyviewedclaims/previouslyviewedclaimstable.component';
import { RemoveClaimTableComponent } from './claimlists/removeclaimtable/removeclaimtable.component';
import { RemoveClaimTableRowComponent } from './claimlists/tablerows/remove/removeclaimtablerow.component';
import { SelectedClaimsTotalsWidgetComponent } from './totals/selected/selectedclaimstotals.component';
import { RemoveClaimModalComponent } from './removeclaimmodal.component';
import { SelectClaimsInstructionsComponent } from './instructions/selectclaimsinstructions.component';

/**
 * The module which allows the user to make claim selections.
 *
 * Contains only the select claims page, but that page is a set of nested components.
 */
@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
        GlobalComponentsModule,
    ],
    declarations: [
        SelectClaimsPageComponent,
        SelectClaimTableComponent,
        SelectClaimTableRowComponent,
        PreviouslyViewedClaimsTableComponent,
        RemoveClaimTableComponent,
        RemoveClaimTableRowComponent,
        SelectedClaimsTotalsWidgetComponent,
        RemoveClaimModalComponent,
        SelectClaimsInstructionsComponent
    ],
    exports: [
    ],
    providers: [
        LoggerService,
        SelectClaimsService,
    ]
})
export class SelectClaimsModule {}
