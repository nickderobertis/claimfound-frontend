import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";

import { FormsModule } from "@angular/forms";

import { LoadingSpinnerComponent } from "./loadingspinner.component";
import { LoadingModalComponent } from "./loadingmodal.component";
import { GlobalPipesModule } from "../pipes/globalpipes.module";
import { RouterModule } from "@angular/router";

import { FileViewComponent } from "./fileView/fileview.component";
import { FileViewRowComponent } from "./fileView/fileviewrow.component";
import { DropdownComponent } from "./dropdown/dropdown.component";
import { PageSelectComponent } from "./pageselect/pageselect.component";
import { ClaimTableRowComponent } from "./claimtable/claimtablerow/claimtablerow.component";
import { ClaimDetailsModalComponent } from "./claimtable/claimdetailsmodal/detailsmodal.component";
import { NewClaimsTotalsWidgetComponent } from "./foundclaims/newclaimstotalswidget.component";
import { SearchingMessageWidgetComponent } from "./foundclaims/searchingwidget/searchingmessagewidget.component";
import { RadioButtonComponent } from "./customradiobuttons/radiobutton.component";

import { EmailSignUpComponent } from "./emailSignUp/emailsignup.component";
import { ErrorBarComponent } from "./error-bar/error-bar.component";

import { HeaderFooterModule } from "./headerfooter/headerfooter.module";
import { ProgressButtonComponent } from "./progressButton/progressButton.component";
import { SimpleProgressButtonComponent } from "./progressButton/simpleprogressbutton/simpleProgressButton.component";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ErrorBarService } from "../services/error-bar.service";
import { NewClaimsTotalsService } from "./foundclaims/newclaimstotals.service";
import { ProfileCompletionService } from "../services/profile-completion.service";
import { ClaimTableComponent } from "./claimtable/claim-table/claim-table.component";
import { NameSearchDropdownComponent } from "./dropdown/namesearch/namesearchdropdown.component";
import { ProfileCompletionModalComponent } from "./profile-completion-modal/profile-completion-modal.component";
import { DropdownItemComponent } from "./dropdown/dropdownitem/dropdownitem.component";
import { NameSearchDropdownItemComponent } from "./dropdown/namesearch/namesearchdropdownitem/namesearchdropdownitem.component";
import { DetermineLoginDashboardRouteService } from '../services/determine-login-dashboard-route.service';

/**
 * A module containing components which are used on more than one page and which were simple and isolated enough to
 * not put in their own modules.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GlobalPipesModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HeaderFooterModule,
  ],
  declarations: [
    LoadingSpinnerComponent,
    LoadingModalComponent,
    FileViewComponent,
    FileViewRowComponent,
    EmailSignUpComponent,
    ProgressButtonComponent,
    SimpleProgressButtonComponent,
    DropdownComponent,
    DropdownItemComponent,
    PageSelectComponent,
    ClaimDetailsModalComponent,
    ClaimTableRowComponent,
    NewClaimsTotalsWidgetComponent,
    ClaimTableComponent,
    ProfileCompletionModalComponent,
    ErrorBarComponent,
    SearchingMessageWidgetComponent,
    RadioButtonComponent,
    NameSearchDropdownComponent,
    NameSearchDropdownItemComponent,
  ],
  exports: [
    LoadingSpinnerComponent,
    LoadingModalComponent,
    FileViewComponent,
    FileViewRowComponent,
    EmailSignUpComponent,
    ProgressButtonComponent,
    SimpleProgressButtonComponent,
    DropdownComponent,
    DropdownItemComponent,
    PageSelectComponent,
    NewClaimsTotalsWidgetComponent,
    ClaimTableComponent,
    ProfileCompletionModalComponent,
    ErrorBarComponent,
    SearchingMessageWidgetComponent,
    RadioButtonComponent,
    NameSearchDropdownComponent,
    NameSearchDropdownItemComponent,
  ],
  providers: [
    NewClaimsTotalsService,
    ProfileCompletionService,
    DetermineLoginDashboardRouteService,
    ErrorBarService,
  ],
})
export class GlobalComponentsModule {}
