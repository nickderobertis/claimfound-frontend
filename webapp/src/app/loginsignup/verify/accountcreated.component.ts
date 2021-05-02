/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { LoggerService } from "../../global/logger.service";

import { VerifyService } from "./verify.service";
import { CFError } from "src/app/global/error.service";

/**
 * The component for account verification.
 *
 * When the user signs up with email, we send a link in the email to this page. The link
 * contains a cryptographic nonce, which we store in the database linked to the user.
 * The nonce from the link is sent to the backend, which checks it against the database.
 */
@Component({
  selector: "cf-account-created",
  templateUrl: "./accountcreated.component.html",
  providers: [VerifyService],
  styleUrls: [
    "../../global/css/normalize.scss",
    "../../global/css/webflow.scss",
    "./accountcreated.component.scss",
  ],
})
export class AccountCreatedComponent implements OnInit, OnDestroy {
  private nonce: string;
  public loading: boolean = true;
  public valid: boolean = false;
  private sub: any;

  constructor(
    private router: Router,
    private verifyService: VerifyService,
    private route: ActivatedRoute,
    private logger: LoggerService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.nonce = params["nonce"];
    });
    this.logger.debug("Got nonce for verify", this.nonce);
    this.send();
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  displayMessage() {
    this.valid = true;
    this.loading = false;
  }

  handleError(error: CFError) {
    this.valid = false;
    this.loading = false;
  }

  send() {
    this.verifyService.sendNonce(this.nonce).subscribe(
      (result) => this.displayMessage(),
      (error: CFError) => this.handleError(error)
    );
  }
}
