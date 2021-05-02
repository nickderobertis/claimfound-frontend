import { Component, OnInit } from "@angular/core";
import { StorageService } from "../../global/storage.service";
import { LoggerService } from "../../global/logger.service";

/**
 * The page which shows that an email to reset the user's password was sent.
 *
 * This is part of the forgot password feature. See
 * [ForgotPasswordComponent]{@link ForgotPasswordComponent} for more details.
 */
@Component({
  selector: "cf-reset-sent",
  templateUrl: "./reset-sent.component.html",
  styleUrls: [
    "../../global/css/normalize.scss",
    "../../global/css/webflow.scss",
    "./reset-sent.component.scss",
  ],
  providers: [StorageService],
})
export class ResetSentComponent implements OnInit {
  public email: any = "your email";

  constructor(private storage: StorageService, private logger: LoggerService) {}

  ngOnInit() {
    this.email = this.storage.read("cf-email-sent") as string;
    this.logger.debug("Sent email to ", this.email);
  }
}
