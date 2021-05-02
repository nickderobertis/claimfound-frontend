import { Component, OnInit } from "@angular/core";

import { StorageService } from "../../../global/storage.service";
import { LoggerService } from "../../../global/logger.service";
import { Name } from "../../../global/models/name.model";

/**
 * The main page component for the page which shows success after the user has submitted claims
 */
@Component({
  selector: "cf-success",
  templateUrl: "./success.component.html",
  styleUrls: [
    "./success.component.scss",
    "../../../global/css/normalize.scss",
    "../../../global/css/webflow.scss",
  ],
})
export class SuccessComponent implements OnInit {
  public name: Name = new Name({ first_name: "" });

  constructor(private storage: StorageService, private logger: LoggerService) {}

  ngOnInit() {
    this.name = new Name({
      first_name: this.storage.read("cf-user-name") as string,
    });
  }
}
