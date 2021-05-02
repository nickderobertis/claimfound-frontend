import { NgModule } from "@angular/core";

import { landingRouting } from "./landing.routes";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { LandingComponent } from "./landing.component";
import { AboutUsComponent } from "./aboutus.component";
import { ContactComponent } from "./contact.component";
import { HomeComponent } from "./home.component";
import { LandingFooterComponent } from "./landingfooter.component";
import { LandingHeaderComponent } from "./landingheader.component";
import { PrivacyComponent } from "./privacy.component";
import { StoriesComponent } from "./stories.component";
import { TOSComponent } from "./tos.component";
import { AcknowledgementComponent } from "./acknowledgement.component";

import { PropertySearchModule } from "./propertySearch/propertysearch.module";
import { GlobalDirectivesModule } from "../global/directives/global-directives.module";
import { ReferralLandingComponent } from "./referral/referrallanding.component";
import { GlobalComponentsModule } from "../global/components/globalcomponents.module";
import { SignupModule } from "../loginsignup/signup/signup.module";

import { SignUpModalService } from "../loginsignup/signup/sign-up-modal.service";
import { StorageService } from "../global/storage.service";
import { LocationLandingModule } from "./location/location.module";
import { HomePropertySearchComponent } from './home/propertysearch/homepropertysearch.component';
import { HomeUnclaimedOverviewComponent } from './home/unclaimedoverview/homeunclaimedoverview.component';
import { HomeMoneyBackComponent } from './home/moneyback/homemoneyback.component';
import { HomeWorksSectionComponent } from './home/workssection/homeworkssection.component';
import { HomeAnyoneSectionComponent } from './home/anyonesection/homeanyonesection.component';
import { HomeTestimonialSectionComponent } from './home/testimonialsection/hometestimonialsection.component';
import { HomeMapComponent } from './location/home/homemap.component';
import {HomeFAQComponent} from "./home/FAQ/homeFAQ.component";
import { LandingModalService } from './modal/landingmodal.service';
import { LandingModelComponent } from './modal/landingmodal/landingmodal.component';

/**
 * The Landing module covers all the pages outside of the main application.
 *
 * The goal of the landing pages is the educate the user about unclaimed property and the company.
 * These pages are mostly static HTML/CSS with a couple exceptions.
 * The property search (see Property Search Module) is on many landing pages and
 * interfaces with the backend. The acknowledgements page also requests the backend packages.
 *
 * The structure of the pages is that there is a fixed header and footer, with a router outlet
 *  to display the pages between the header and footer.
 */
@NgModule({
  imports: [
    landingRouting,
    PropertySearchModule,
    CommonModule,
    BrowserModule,
    GlobalDirectivesModule,
    GlobalComponentsModule,
    SignupModule,
    FormsModule,
    ReactiveFormsModule,
    LocationLandingModule
  ],
  declarations: [
    LandingComponent,
    AboutUsComponent,
    ContactComponent,
    HomeComponent,
    LandingFooterComponent,
    LandingHeaderComponent,
    PrivacyComponent,
    TOSComponent,
    AcknowledgementComponent,
    StoriesComponent,
    ReferralLandingComponent,
    HomePropertySearchComponent,
    HomeUnclaimedOverviewComponent,
    HomeMoneyBackComponent,
    HomeWorksSectionComponent,
    HomeAnyoneSectionComponent,
    HomeFAQComponent,
    HomeTestimonialSectionComponent,
    HomeMapComponent,
    LandingModelComponent,
  ],
  providers: [SignUpModalService, StorageService, LandingModalService],
})
export class LandingModule {}
