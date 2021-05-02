import { EventTracker } from "./event-tracker";

import { LoggerService } from "../../../logger.service";

declare let env: any;

declare let Intercom: Function;

export class IntercomEventTracker extends EventTracker {
  constructor(logger: LoggerService) {
    super("intercom", logger);
  }

  setupEventHandlers() {
    this.eventHandlers.pageVisit = (data: any) => {
      this.pageVisit(data);
    };

    this.eventHandlers.propertySearch = (data: any) => {
      this.propertySearch(data);
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

    this.eventHandlers.signinError = (data: any) => {
      this.signinError(data);
    };

    this.eventHandlers.signupError = (data: any) => {
      this.signupError(data);
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

    this.eventHandlers.timedModalSignup = (data: any) => {
      this.timedModalSignup(data);
    }
  }

  defaultEvent(eventName: string, data: any) {
    this.logger.debug("Intercom", eventName, JSON.stringify(data));

    Intercom("trackEvent", eventName, data);
  }

  defaultErrorEvent(eventName: string, data: any) {
    data = data || {};
    this.defaultEvent(eventName, {
      errorJSON: JSON.stringify(data),
    });
  }

  bootIntercomEvent(eventName: string, data: any) {
    let intercomData = { app_id: env.INTERCOM_APP_ID };
    let uuid = localStorage["cf-uuid"];
    if (uuid) {
      intercomData["user_id"] = uuid;
    }
    let email = localStorage["cf-email-sent"];
    if (email) {
      intercomData["email"] = email.replace(/["]+/g, ""); // remove quotes
    } else {
      // no need to call intercom boot if don't have an email
      this.logger.warn("Email not found in cf-email-sent!");
      return this.defaultEvent(eventName, data);
    }
    if (data.pagePath == "/login/splashpage") {
      let name = localStorage["cf-user-full-name"];
      if (name) {
        intercomData["name"] = name.replace(/["]+/g, "");
      }
    }
    this.logger.debug(
      "Calling Intercom boot with data: " + JSON.stringify(intercomData)
    );
    Intercom("boot", intercomData);
    this.defaultEvent(eventName, data);
  }

  pageVisit(data: any) {
    if (
      data.pagePath == "/login/splashpage" ||
      data.pagePath == "/login/emailsent"
    ) {
      this.bootIntercomEvent("Page Visit", data);
    } else {
      this.defaultEvent("Page Visit", data);
    }
  }

  propertySearch(data: any) {
    this.defaultEvent("Property Search", data);
  }

  propertySearchGetStarted(data: any) {
    this.defaultEvent("Property Search Get Started", data);
  }

  emailGetStarted(data: any) {
    this.defaultEvent("Email Get Started", data);
  }

  referralGetStarted(data: any) {
    this.defaultEvent("Referral Get Started", data);
  }

  signupError(data: any) {
    this.defaultErrorEvent("Signup Error", data);
  }

  profileUpdateError(data: any) {
    this.defaultErrorEvent("Profile Update Error", data);
  }

  accountUpdateError(data: any) {
    this.defaultErrorEvent("Account Update Error", data);
  }

  signinError(data: any) {
    this.defaultErrorEvent("Signin Error", data);
  }

  documentUpload(data: any) {
    this.defaultEvent("Document Upload", data);
  }

  deleteDocument(data: any) {
    this.defaultEvent("Delete Document", data);
  }

  formsPageTimeout(data: any) {
    this.defaultEvent("Forms Page Timeout", data);
  }

  formsPageFLDown(data: any) {
    this.defaultEvent("Forms Page FL Down", data);
  }

  formsPageFormComplete(data: any) {
    this.defaultEvent("Forms Page Form Complete", data);
  }

  referralLinkCopied(data: any) {
    this.defaultEvent("Referral Link Copied", data);
  }

  referralLinkEmailed(data: any) {
    this.defaultEvent("Referral Link Emailed", data);
  }

  referralFacebook(data: any) {
    this.defaultEvent("Referral Facebook", data);
  }

  emailSignUp(data: any) {
    this.defaultEvent("Email Signup", data);
  }

  updateEmailError(data: any) {
    this.defaultErrorEvent("Update Email Error", data);
  }

  updatePasswordError(data: any) {
    this.defaultErrorEvent("Update Password Error", data);
  }

  updatePhone(data: any) {
    this.defaultEvent("Updated phone", data);
  }

  addRelative(data: any) {
    this.defaultEvent("Added relative", data);
  }

  addAddress(data: any) {
    this.defaultEvent("Updated address", data);
  }

  addName(data: any) {
    this.defaultEvent("Added name", data);
  }

  clickSupport(data: any) {
    this.defaultEvent("Clicked support", data);
  }

  relativeFollowUp(data: any) {
    this.defaultEvent("Answered relative follow up", data);
  }

  addressFollowUp(data: any) {
    this.defaultEvent("Answered address follow up", data);
  }

  phoneFollowUp(data: any) {
    this.defaultEvent("Answered phone follow up", data);
  }

  errorFollowUp(data: any) {
    this.defaultEvent("Error in answering follow up question", data);
  }

  errorAddProfileInfo(data: any) {
    this.defaultEvent("Error in adding profile info", data);
  }

  selectClaim(data: any) {
    this.defaultEvent("Selected claim", data);
  }

  removeClaim(data: any) {
    this.defaultEvent("Removed selected claim", data);
  }

  prevViewedClaims(data: any) {
    this.defaultEvent("Previously viewed claims", data);
  }

  navSelectClaims(data: any) {
    this.defaultEvent("Next/Back on claims select table", data);
  }

  navPrevClaims(data: any) {
    this.defaultEvent("Next/Back on prev viewed claims table", data);
  }

  timedModalSignup(data: any) {
    this.defaultEvent("Added email from timed modal", data);
  }
}
