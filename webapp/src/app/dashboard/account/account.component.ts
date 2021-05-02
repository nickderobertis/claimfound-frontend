import { Component, OnInit } from "@angular/core";

/**
 * The main page component for the account page where the user can change email, password,
 * and connect social accounts
 *
 * This is just a wrapper, the main functionality is offloaded to subcomponents.
 *
 * Subcomponents:
 * * [UpdateRowComponent]{@link UpdateRowComponent}
 * * [ExternalLoginRowComponent]{@link ExternalLoginRowComponent}
 *
 * @example
 * <cf-account-component></cf-account-component>
 */
@Component({
  selector: "cf-account-component",
  templateUrl: "./account.component.html",
  styleUrls: ["../../../globalcss/base.scss", "./account.component.scss"],
})
export class AccountComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
