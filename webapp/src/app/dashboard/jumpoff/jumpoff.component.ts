import {
  Component,
  Input,
  Output,
  OnInit,
  OnChanges,
  EventEmitter,
  SimpleChanges,
} from "@angular/core";

import { COMPANY_ADDRESS } from "../../global/constants/companyinfo";

import {
  Router,
  ActivatedRoute,
  NavigationStart,
  NavigationEnd,
} from "@angular/router";

import { LoggerService, log } from "../../global/logger.service";

/**
 * The main page component which displays messaging before routing the user to an external link
 */
@Component({
  selector: "cf-jumpoff-page",
  templateUrl: "./jumpoff.component.html",
  styleUrls: [
    "../../global/css/normalize.scss",
    "../../global/css/webflow.scss",
    "./jumpoff.component.scss",
  ],
})
export class JumpoffPageComponent implements OnInit {
  link: string;

  constructor(
    private route: ActivatedRoute,
    private logger: LoggerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.link = this.route.snapshot.paramMap.get("goTo");
  }

  exitLinkClick() {
    window.open(this.link);
  }
}
