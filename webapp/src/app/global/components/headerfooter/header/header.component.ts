/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { Component, OnChanges, SimpleChanges } from "@angular/core";
import { expectedException } from "src/app/global/global";
import { LoggerService } from "src/app/global/logger.service";
declare let Intercom: Function;
declare let env: any;
@Component({
  selector: "cf-header",
  templateUrl: "./header.component.html",
  styleUrls: [
    "./header.component.scss",
    "../../../../global/css/normalize.scss",
    "../../../../global/css/webflow.scss",
  ],
})
export class HeaderComponent implements OnChanges {
  constructor(private logger: LoggerService) {}

  modal: boolean = false;

  ngOnChanges(changes: SimpleChanges) {}

  openDocument(event: any) {
    if (env.CF_ANALYTICS_FE) {
      try {
        Intercom("show");
      } catch {
        this.modal = true;
      }
    } else {
      this.logger.warn("Clicked support, Intercom disabled");
      this.modal = true;
    }
  }

  closeDocument(event: any) {
    this.modal = false;
  }
}
