import { Component, ViewChild, ElementRef, OnDestroy } from "@angular/core";
import { MapService } from "../map.service";
import { LoggerService } from "src/app/global/logger.service";
import { Subscription } from "rxjs";
import {
  PointDetailsModel,
  TopClaimModel,
} from "../models/point-details.model";
import { SignUpModalService } from "src/app/loginsignup/signup/sign-up-modal.service";
import { ReferralService } from "src/app/referrals/referral.service";
import { EventTrackerService } from "src/app/global/services/event-tracker/event-tracker.service";
import { ReferralTokenFunctions } from "src/app/global/utils/tokens/referralTokenFunctions";
import { ReferralEmailModalModel } from "src/app/referrals/referralEmailModal/referralemailmodal.model";
import { copyToClipboard, elemInView } from "src/app/global/utils";

/**
 * The component that displays point details and provides referral and sign up options
 */
@Component({
  selector: "cf-map-point-table",
  templateUrl: "./mappointtable.component.html",
  styleUrls: [
    "../../../global/css/normalize.scss",
    "../../../global/css/webflow.scss",
    "./mappointtable.component.scss",
  ],
})
export class MapPointTableComponent implements OnDestroy {
  model: PointDetailsModel;
  gotPointDetailsEvent$: Subscription;

  // Toggle for whether to show a message saying only top ten claims are shown
  showTopTenOnlyMessage: boolean = true;

  // Toggles for whether referral link copyable state is active
  referralLinkTextToggles: boolean[];

  // Get an anchor in the page for where to scroll to if table is out of view on point click
  @ViewChild("thisonlyexistsforscrolling", { static: false })
  mapTable: ElementRef;

  constructor(
    protected mapService: MapService,
    protected signUpModalService: SignUpModalService,
    private referralService: ReferralService,
    private eventTrackerService: EventTrackerService,
    protected logger: LoggerService
  ) {}

  ngOnInit() {
    // This event will fire when user clicks on a point in the map
    this.gotPointDetailsEvent$ = this.mapService.gotPointDetailsEvent.subscribe(
      (result: PointDetailsModel) => {
        this.model = result;

        // Reset toggles for link text to copyable state active
        this.referralLinkTextToggles = [];
        this.model.topClaims.forEach((element) => {
          this.referralLinkTextToggles.push(true);
        });

        // Set toggle for top claims message
        if (this.model.totalClaims <= 10) {
          this.showTopTenOnlyMessage = false;
        }

        // Scroll to table if it is out of view
        if (!elemInView(this.mapTable)) {
          let yOffset = -100;
          let y =
            this.mapTable.nativeElement.getBoundingClientRect().top +
            window.pageYOffset +
            yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.gotPointDetailsEvent$) {
      this.gotPointDetailsEvent$.unsubscribe();
    }
  }

  onSignUpButtonClick() {
    this.signUpModalService.showSignUpModal();
  }

  openEmailReferralModal(item: TopClaimModel) {
    let emailModalModel: ReferralEmailModalModel = new ReferralEmailModalModel(
      item.name,
      item.referralToken
    );
    this.referralService.openReferralEmailModal(emailModalModel);
  }

  openFacebookShareWindow(item: TopClaimModel) {
    this.eventTrackerService.triggerEvent("referralFacebook", {
      firstName: item.name,
    });
    this.referralService.openFacebookShareWindow(encodeURI(item.name));
  }

  copyReferralLinkClick(item: TopClaimModel, itemIndex: number) {
    let referralLink: string = ReferralTokenFunctions.createReferralLink(
      item.referralToken,
      "referral",
      "link",
      encodeURI(item.name)
    );

    copyToClipboard(referralLink);

    // Display link copied for one second on this row
    this.referralLinkTextToggles[itemIndex] = false;
    setTimeout(() => {
      this.referralLinkTextToggles[itemIndex] = true;
    }, 1000);

    this.eventTrackerService.triggerEvent("referralLinkCopied", {
      firstName: item.name,
    });
  }

  getReferralLinkText(itemIndex: number) {
    if (this.referralLinkTextToggles[itemIndex]) {
      return "COPY LINK";
    } else {
      return "LINK COPIED";
    }
  }

  getReferralLinkTextStyle(itemIndex: number) {
    if (this.referralLinkTextToggles[itemIndex]) {
      return "";
    } else {
      return "copied";
    }
  }
}
