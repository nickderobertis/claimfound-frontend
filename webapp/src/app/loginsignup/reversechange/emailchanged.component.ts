import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { LoggerService } from "../../global/logger.service";

import { EmailChangedService } from "./emailchanged.service";
import { CFError } from "src/app/global/error.service";

/**
 * The page component which handles resetting a change to the user's email
 *
 * On the account page in the dashboard, the user can change their email. Once they do,
 * an email is sent to both the new and old email, saying if they did not authorize this
 * change, then they can click the link in the email to reverse the change.
 *
 * Similar to account verification, a crytographic nonce is generated for the user,
 * included in the email, and stored in the database. This page sends the nonce in the
 * link to the backend to verify it against the database, and if it matches then it
 * will reverse the change to the email.
 */
@Component({
  selector: "cf-email-changed",
  templateUrl: "./emailchanged.component.html",
  providers: [EmailChangedService],
  styleUrls: [
    "../../global/css/normalize.scss",
    "../../global/css/webflow.scss",
    "./emailchanged.component.scss",
  ],
})
export class EmailChangedComponent implements OnInit, OnDestroy {
  private nonce: string;
  public loading: boolean = true;
  public valid: boolean = false;
  private sub: any;
  private oldEmail: string;
  private newEmail: string;
  constructor(
    private router: Router,
    private emailChangedService: EmailChangedService,
    private route: ActivatedRoute,
    private logger: LoggerService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.nonce = params["nonce"];
    });
    this.logger.debug("Got nonce for email changed", this.nonce);
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
    this.logger.error("Got error on email changed:" + error.toString());
    this.valid = false;
    this.loading = false;
  }

  send() {
    this.emailChangedService.sendNonce(this.nonce).subscribe(
      (result) => {
        this.oldEmail = result.old_email;
        this.newEmail = result.new_email;
        this.displayMessage();
      },

      (error: CFError) => this.handleError(error)
    );
  }
}
