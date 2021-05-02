import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
} from "@angular/core";

import { LoggerService } from "../../global/logger.service";
import { StorageService } from "../../global/storage.service";
import { NewClaimsTotalsService } from "src/app/global/components/foundclaims/newclaimstotals.service";
import { SelectClaimsTable } from "../myclaims/select/selectclaimstable.model";
import { Subscription } from "rxjs";
import { CFError } from "src/app/global/error.service";
import { ProfileService } from "../profile/profile.service";
import { UserInfoService } from "../../global/userinfo.service";
import { UserNameAndEmailModel } from "src/app/global/api/models/userinfo/user-info.model";

/**
 * The header for the dashboard.
 *
 * A single, static component.
 */
declare let Intercom: Function;
declare let env: any;
@Component({
  selector: "cf-dashboard-header",
  templateUrl: "./dashboardheader.component.html",
  styleUrls: [
    "../../global/css/normalize.scss",
    "../../global/css/webflow.scss",
    "./dashboardheader.component.scss",
  ],
})
export class DashboardHeaderComponent implements OnChanges, OnInit {
  @Input() expanded: boolean = false;
  modal: boolean = false;
  userName: string;
  updatedUserInfoEvent$: Subscription;

  constructor(
    private logger: LoggerService,
    private storage: UserInfoService,
    private newClaimsTotalsService: NewClaimsTotalsService,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.updateName();

    this.updatedUserInfoEvent$ = this.profileService.updatedUserInfoEvent.subscribe(
      (res: boolean) => {
        this.updateName();
      }
    );
  }

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

  onGetPreviouslyViewedClaimsError(error: CFError): void {
    this.logger.error("Error getting previously viewed claims", error);
  }

  updateName() {
    this.storage.getBothDetails().subscribe((result: UserNameAndEmailModel) => {
      this.userName = result.firstName.replace(/"/g, "");
    });
  }
}
