import { Component, OnInit } from "@angular/core";
import { StorageService } from "../global/storage.service";
import { LoggerService } from "../global/logger.service";

/**
 * The page which displays that ClaimFound has sent the user an email to verify their account
 */
@Component({
  selector: "cf-email-sent",
  templateUrl: "./emailsent.component.html",
  styleUrls: [
    "../global/css/normalize.scss",
    "../global/css/webflow.scss",
    "./emailsent.component.scss",
  ],
  providers: [StorageService],
})
export class EmailSentComponent implements OnInit {
  public email: any = "your email";

  constructor(private storage: StorageService, private logger: LoggerService) {}

  ngOnInit() {
    this.email = this.storage.read("cf-email-sent") as string;
    this.logger.debug("Sent email to ", this.email);
  }
}
