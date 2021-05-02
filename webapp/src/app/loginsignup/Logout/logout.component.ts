/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { LoggerService } from "../../global/logger.service";
import { StorageService } from "../../global/storage.service";

/**
 * A static page component which shows that the user has logged out of their account
 */
@Component({
  selector: "cf-logout",
  templateUrl: "./logout.component.html",
  styleUrls: [
    "../../global/css/normalize.scss",
    "../../global/css/webflow.scss",
    "./logout.component.scss",
  ],
})
export class LogoutComponent implements OnInit {
  constructor(private _storageService: StorageService) {}

  ngOnInit() {
    this._storageService.removeToken();
    this._storageService.remove("cf-jwt-expiration");
  }
}
