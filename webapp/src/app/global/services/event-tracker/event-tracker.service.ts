import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";

import { Router } from "@angular/router";

import { BaseService } from "../../base.service";

import { LoggerService } from "../../logger.service";

import { StorageService } from "../../storage.service";

import { ErrorModalService } from "../../../error-modal/errormodal.service";

import {
  EventTracker,
  GoogleAnalyticsEventTracker,
  IntercomEventTracker,
} from "./models/index";

declare let env: any;

let registeredEvents = [
  "pageVisit",
  "propertySearch",
  "propertySearchGetStarted",
  "emailGetStarted",
  "referralGetStarted",
  "signupError",
  "profileUpdateError",
  "accountUpdateError",
  "signinError",
  "documentUpload",
  "deleteDocument",
  "formsPageTimeout",
  "formsPageFLDown",
  "formsPageFormComplete",
  "referralLinkCopied",
  "referralLinkEmailed",
  "referralFacebook",
  "emailSignUp",
  "updateEmailError",
  "updatePasswordError",
  "updatePhone",
  "addRelative",
  "addAddress",
  "addName",
  "clickSupport",
  "relativeFollowUp",
  "addressFollowUp",
  "phoneFollowUp",
  "errorFollowUp",
  "errorAddProfileInfo",
  "selectClaim",
  "removeClaim",
  "prevViewedClaims",
  "navSelectClaims",
  "navPrevClaims",
  "timedModalSignup",
];

/**
 * The service which enables analytics tracking of user events.
 *
 * This is the main service to be used throughout the application. It is a wrapper around individual analytics
 * services, and enables reporting the same information to multiple analytics destinations.
 *
 * For adding a new event, add the key of the event to `registeredEvents`,
 * then go to each event tracker and add a handler for the event.
 * If there is any data associated
 * with the event, add it to google-analytics-event-tracker.ts and
 * configure the new data dimension via web. No data setup required
 * for Intercom.
 */
@Injectable()
export class EventTrackerService extends BaseService {
  eventTrackers: EventTracker[] = [];
  eventTrackersByName: any = {};

  constructor(
    http: HttpClient,
    logger: LoggerService,
    storage: StorageService,
    router: Router,
    errorModalService: ErrorModalService
  ) {
    super(http, logger, storage, router, errorModalService);

    if (env.CF_ANALYTICS_FE) {
      this.setupEventTrackers();
    }

    (window as any).et = this;
  }

  setupEventTrackers() {
    this.addEventTracker(
      new GoogleAnalyticsEventTracker(this.logger)
    ).addEventTracker(new IntercomEventTracker(this.logger));
  }

  addEventTracker(eventTracker: EventTracker): EventTrackerService {
    let name = eventTracker.name;
    if (this.getEventTracker(name)) {
      throw `Already eventTracker with name: ${name}`;
    }

    this.eventTrackers.push(eventTracker);
    this.eventTrackersByName[name] = eventTracker;

    return this;
  }

  getEventTracker(name: string) {
    return this.eventTrackersByName[name];
  }

  removeEventTracker(name: string): EventTrackerService {
    let eventTracker = this.getEventTracker(name);
    if (!eventTracker) {
      return;
    }

    let index = this.eventTrackers.indexOf(eventTracker);
    if (index !== -1) {
      this.eventTrackers.splice(index, 0);
    }

    delete this.eventTrackersByName[name];

    return this;
  }

  triggerEvent(name: string, data: any) {
    if (registeredEvents.indexOf(name) === -1) {
      throw `Event not registered: ${name}`;
    }

    for (let i = 0; i < this.eventTrackers.length; ++i) {
      let eventTracker = this.eventTrackers[i];

      eventTracker.triggerEvent(name, data);
    }
  }
}
