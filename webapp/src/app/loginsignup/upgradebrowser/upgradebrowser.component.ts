import { Component, OnInit } from "@angular/core";
import { StorageService } from "../../global/storage.service";

@Component({
  selector: "app-upgradebrowser",
  templateUrl: "./upgradebrowser.component.html",
  styleUrls: ["./upgradebrowser.component.scss"],
})
export class UpgradebrowserComponent implements OnInit {
  constructor(private _storageService: StorageService) {}

  ngOnInit() {
    this._storageService.removeToken();
    this._storageService.remove("cf-jwt-expiration");
  }
}
