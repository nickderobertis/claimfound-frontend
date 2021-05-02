import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GlobalComponentsModule } from "../../global/components/globalcomponents.module";

import { LoggerService } from "../../global/logger.service";
import { ProfileService } from "./profile.service";

import { DashboardHeaderModule } from "../header/dashboardheader.module";
import { profileRouting } from "./profilepage.routes";
import { ProfileComponent } from "./profile.component";
import { ProfileNavigationComponent } from "./navigation/profilenavigation.component";
import { ProfileStepComponent } from "./step/profilestep.component";
import { ProfileNamesBodyComponent } from "./body/personalinfo/names/profilenamesbody.component";
import { ProfileEntryComponent } from "./entereddata/profileentry.component";
import { ProfileEntryRowComponent } from "./entereddata/row/profileentryrow.component";
import { ProfileBirthdayGenderBodyComponent } from "./body/personalinfo/birthdaygender/profilebirthdaygenderbody.component";
import { ProfileRelativesBodyComponent } from "./body/family/relatives/profilerelativesbody.component";
import { ProfilePhonesBodyComponent } from "./body/phones/phones/profilephonesbody.component";
import { ProfileAddressBodyComponent } from "./body/addresses/addresses/profileaddressbody.component";
import { ProfileRelativesQuestionsComponent } from "./body/family/questions/profilerelativesquestions.component";
import { ProfileRelativesQuestionsRowComponent } from "./body/family/questions/row/relativequestionrow.component";
import { RelativeQuestionsDropdownComponent } from "./body/family/questions/row/dropdown/relativequestionsdropdown.component";
import { ProfilePhonesQuestionsComponent } from "./body/phones/questions/profilephonesquestions.component";
import { ProfileAddressesQuestionsComponent } from "./body/addresses/questions/profileaddressesquestions.component";
import { ProfileNewClaimsTotalsWidgetComponent } from "./totalswidget/profilenewclaimtotalswidget";
import { PhoneMaskDirective } from "src/app/global/directives/phone-mask.directive";
// import { IMaskModule } from "angular-imask";
/**
 * This module contains the Profile page where the user can update details on their
 * addresses, phones, relatives, prior names, etc.
 *
 * This module is also used to ask the user follow-up questions on
 * the dashboard. We ask questions about their relatives, phone numbers,
 * and addresses.
 */
@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    RouterModule,
    FormsModule,
    GlobalComponentsModule,
    ReactiveFormsModule,
    DashboardHeaderModule,
    profileRouting,
  ],
  declarations: [
    ProfileComponent,
    ProfileNavigationComponent,
    ProfileStepComponent,
    ProfileNamesBodyComponent,
    ProfileEntryComponent,
    ProfileEntryRowComponent,
    ProfileBirthdayGenderBodyComponent,
    ProfileRelativesBodyComponent,
    ProfilePhonesBodyComponent,
    ProfileAddressBodyComponent,
    ProfileRelativesQuestionsComponent,
    ProfileRelativesQuestionsRowComponent,
    RelativeQuestionsDropdownComponent,
    ProfilePhonesQuestionsComponent,
    ProfileAddressesQuestionsComponent,
    ProfileNewClaimsTotalsWidgetComponent,
    PhoneMaskDirective,
  ],
  exports: [ProfileComponent, PhoneMaskDirective],
  providers: [LoggerService, ProfileService],
})
export class ProfileModule {}
