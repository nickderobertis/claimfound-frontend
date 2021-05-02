import { EventTracker } from "./event-tracker";

import { LoggerService } from "../../../logger.service";

/**
 * Before adding a property here, make sure it is already
 * added as a Custom dimension/metric via Google Analytics
 * web interface under Admin -> Property Settings -> Custom Definitions
 */
let eventPropertyMap = {
  email: "dimension1",
  errorJSON: "dimension2",
  docType: "dimension3",
  fileType: "dimension4",
  firstName: "dimension5",
  lastName: "dimension6",
  searchingFor: "dimension9",
  claimCount: "metric1",
  totalAmount: "metric2",
};

/**
 * All event categories are defined here
 * Create a variable for each new category for consistency
 */
const REFERRAL = "Referral";
const DOCUMENT = "Document";
const SIGN_IN = "Sign In";
const SIGN_UP = "Sign Up";
const ACCOUNT = "Account";
const PROFILE = "Profile";
const EMAIL = "Email";
const PROPERTY_SEARCH = "Property Search";
const FORMS = "Forms";
const SUPPORT = "Support";
const CLAIMS = "Claims";

/**
 * All error types are defined here
 * Create a variable for each new error type for consistency
 */
const ERROR = "Error";
const TIMEOUT = "Timeout";

/**
 * Google Analytics setup:
 * Event Category: 'CF Tracking'
 * Event Action: 'Default Event Action',
 * Event Label: Registered Event in event-tracker.service.ts
 * Event Data: Custom Dimension/Metric in eventPropertyMap
 */
export class GoogleAnalyticsEventTracker extends EventTracker {
  constructor(logger: LoggerService) {
    super("googleAnalytics", logger);
  }

  setupEventHandlers() {
    this.eventHandlers.pageVisit = (data: any) => {
      this.pageVisit(data);
    };

    this.eventHandlers.propertySearch = (data: any) => {
      this.propertySearchResults(data);
    };

    this.eventHandlers.propertySearchGetStarted = (data: any) => {
      this.propertySearchGetStarted(data);
    };

    this.eventHandlers.emailGetStarted = (data: any) => {
      this.emailGetStarted(data);
    };

    this.eventHandlers.referralGetStarted = (data: any) => {
      this.referralGetStarted(data);
    };

    this.eventHandlers.signupError = (data: any) => {
      this.signupError(data);
    };

    this.eventHandlers.profileUpdateError = (data: any) => {
      this.profileUpdateError(data);
    };

    this.eventHandlers.accountUpdateError = (data: any) => {
      this.accountUpdateError(data);
    };

    this.eventHandlers.signinError = (data: any) => {
      this.signinError(data);
    };

    this.eventHandlers.documentUpload = (data: any) => {
      this.documentUpload(data);
    };

    this.eventHandlers.deleteDocument = (data: any) => {
      this.deleteDocument(data);
    };

    this.eventHandlers.formsPageTimeout = (data: any) => {
      this.formsPageTimeout(data);
    };

    this.eventHandlers.formsPageFLDown = (data: any) => {
      this.formsPageFLDown(data);
    };

    this.eventHandlers.formsPageFormComplete = (data: any) => {
      this.formsPageFormComplete(data);
    };

    this.eventHandlers.referralLinkCopied = (data: any) => {
      this.referralLinkCopied(data);
    };

    this.eventHandlers.referralLinkEmailed = (data: any) => {
      this.referralLinkEmailed(data);
    };

    this.eventHandlers.referralFacebook = (data: any) => {
      this.referralFacebook(data);
    };

    this.eventHandlers.emailSignUp = (data: any) => {
      this.emailSignUp(data);
    };

    this.eventHandlers.updateEmailError = (data: any) => {
      this.updateEmailError(data);
    };

    this.eventHandlers.updatePasswordError = (data: any) => {
      this.updatePasswordError(data);
    };

    this.eventHandlers.updatePhone = (data: any) => {
      this.updatePhone(data);
    };

    this.eventHandlers.addRelative = (data: any) => {
        this.addRelative(data);
    };

    this.eventHandlers.addAddress = (data: any) => {
      this.addAddress(data);
    };

    this.eventHandlers.addName = (data: any) => {
      this.addName(data);
    };

    this.eventHandlers.clickSupport = (data: any) => {
      this.clickSupport(data);
    };

    this.eventHandlers.relativeFollowUp = (data: any) => {
      this.relativeFollowUp(data);
    };

    this.eventHandlers.addressFollowUp = (data: any) => {
      this.addressFollowUp(data);
    };

    this.eventHandlers.phoneFollowUp = (data: any) => {
      this.phoneFollowUp(data);
    };

    this.eventHandlers.errorFollowUp = (data: any) => {
      this.errorFollowUp(data);
    };

    this.eventHandlers.errorAddProfileInfo = (data: any) => {
      this.errorAddProfileInfo(data);
    };

    this.eventHandlers.selectClaim = (data: any) => {
      this.selectClaim(data);
    };

    this.eventHandlers.removeClaim = (data: any) => {
      this.removeClaim(data);
    };

    this.eventHandlers.prevViewedClaims = (data: any) => {
      this.prevViewedClaims(data);
    };

    this.eventHandlers.navSelectClaims = (data: any) => {
      this.navSelectClaims(data);
    };
    
    this.eventHandlers.navPrevClaims = (data: any) => {
      this.navPrevClaims(data);
    };

    this.timedModalSignup = (data: any) => {
      this.timedModalSignup(data);
    }
  }

  defaultEvent(
    eventName: string,
    eventCategory: string,
    data: any,
    eventLabel?: string
  ) {
    this.logger.debug("Google", eventName, JSON.stringify(data));

    this.cleanEventValues(data);

    (<any>window).ga("send", "event", {
      eventCategory: eventCategory,
      eventAction: eventName,
      eventLabel: eventLabel === undefined ? eventName : eventLabel,
    });

    this.clearEventValues();
  }

  defaultErrorEvent(
    eventName: string,
    eventCategory: string,
    data: any,
    errorType: string
  ) {
    data = data || {};

    this.defaultEvent(
      errorType,
      eventCategory,
      {
        errorJSON: JSON.stringify(data),
      },
      eventName
    );
  }

  cleanEventValues(data: any) {
    for (let key in data) {
      if (!eventPropertyMap[key]) {
        let msg = `${key} not set in ga dimensions`;

        this.logger.warn(msg);

        continue;
      }

      let val = data[key];
      let valType = typeof val;

      if (valType === "object") {
        val = data[key] = JSON.stringify(val);
      }

      let customProperty = eventPropertyMap[key];
      if (customProperty) {
        (<any>window).ga("set", customProperty, val);
      }
    }
  }

  clearEventValues() {
    for (let key in eventPropertyMap) {
      let customProperty = eventPropertyMap[key];
      if (customProperty.includes("metric")) {
        (<any>window).ga("set", customProperty, 0);
      } else {
        (<any>window).ga("set", customProperty, "");
      }
    }
  }

  pageVisit(data: any) {
    this.logger.debug("Google pageview", JSON.stringify(data));
    (<any>window).ga("send", {
      hitType: "pageview",
      page: data["pagePath"],
    });
  }

  propertySearchResults(data: any) {
    this.defaultEvent("Property Search Results", PROPERTY_SEARCH, data);
  }

  propertySearchGetStarted(data: any) {
    this.defaultEvent("Property Search Get Started", PROPERTY_SEARCH, data);
  }

  emailGetStarted(data: any) {
    this.defaultEvent("Email Get Started", EMAIL, data);
  }

  referralGetStarted(data: any) {
    this.defaultEvent("Referral Get Started", REFERRAL, data);
  }

  signupError(data: any) {
    this.defaultErrorEvent("Signup Error", SIGN_UP, data, ERROR);
  }

  profileUpdateError(data: any) {
    this.defaultErrorEvent("Profile Update Error", PROFILE, data, ERROR);
  }

  accountUpdateError(data: any) {
    this.defaultErrorEvent("Account Update Error", ACCOUNT, data, ERROR);
  }

  signinError(data: any) {
    this.defaultErrorEvent("Signin Error", SIGN_IN, data, ERROR);
  }

  documentUpload(data: any) {
    this.defaultEvent("Document Upload", DOCUMENT, data);
  }

  deleteDocument(data: any) {
    this.defaultEvent("Delete Document", DOCUMENT, data);
  }

  formsPageTimeout(data: any) {
    this.defaultErrorEvent("Forms Page Timeout", FORMS, data, TIMEOUT);
  }

  formsPageFLDown(data: any) {
    this.defaultEvent("Forms Page FL Down", FORMS, data);
  }

  formsPageFormComplete(data: any) {
    this.defaultEvent("Forms Page Form Complete", FORMS, data);
  }

  referralLinkCopied(data: any) {
    this.defaultEvent("Referral Link Copied", REFERRAL, data);
  }

  referralLinkEmailed(data: any) {
    this.defaultEvent("Referral Link Emailed", REFERRAL, data);
  }

  referralFacebook(data: any) {
    this.defaultEvent("Referral Facebook", REFERRAL, data);
  }

  emailSignUp(data: any) {
    this.defaultEvent("Email Signup", SIGN_UP, data);
  }

  updateEmailError(data: any) {
    this.defaultErrorEvent("Update Email Error", ACCOUNT, data, ERROR);
  }

  updatePasswordError(data: any) {
    this.defaultErrorEvent("Update Password Error", ACCOUNT, data, ERROR);
  }

  updatePhone(data: any) {
    this.defaultEvent("Updated phone", PROFILE, data);
  }

  addRelative(data: any){
    this.defaultEvent("Added relative", PROFILE, data);
  }

  addAddress(data: any){
    this.defaultEvent("Updated address", PROFILE, data);
  }

  addName(data: any){
    this.defaultEvent("Added name", PROFILE, data);
  }

  clickSupport(data: any){
    this.defaultEvent("Clicked support", SUPPORT, data);
  }

  relativeFollowUp(data: any){
    this.defaultEvent("Answered relative follow up", PROFILE, data);
  }

  addressFollowUp(data: any){
    this.defaultEvent("Answered address follow up", PROFILE, data);
  }

  phoneFollowUp(data: any){
    this.defaultEvent("Answered phone follow up", PROFILE, data);
  }

  errorFollowUp(data: any){
    this.defaultEvent("Error in answering follow up question", PROFILE, data);
  }

  errorAddProfileInfo(data: any){
    this.defaultEvent("Error in adding profile info", PROFILE, data);
  }

  selectClaim(data: any){
    this.defaultEvent("Selected claim", CLAIMS, data);
  }

  removeClaim(data: any){
    this.defaultEvent("Removed selected claim", CLAIMS, data);
  }

  prevViewedClaims(data: any){
    this.defaultEvent("Previously viewed claims", CLAIMS, data);
  }

  navSelectClaims(data: any){
    this.defaultEvent("Next/Back on claims select table",CLAIMS, data);
  }

  navPrevClaims(data: any){
    this.defaultEvent("Next/Back on prev viewed claims table",CLAIMS, data);
  }

  timedModalSignup(data: any){
    this.defaultEvent("Added email from timed modal", SIGN_UP, data);
  }
}
