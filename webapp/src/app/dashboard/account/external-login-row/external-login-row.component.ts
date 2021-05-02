import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  QueryList,
  ViewChildren,
} from "@angular/core";
import { Subscription } from "rxjs";

import { SocialConnectModel } from "../models/social-connect.model";

import { AccountService } from "../account.service";
import { ErrorBarService } from "../../../global/services/error-bar.service";
import { LoggerService } from "../../../global/logger.service";
import {
  ExternalConnectService,
  SocialEventArgs,
} from "src/app/external-login/external-login.service";
import { ProgressButtonComponent } from "src/app/global/components/progressButton/progressButton.component";
import {
  ProgressButtonModel,
  ProgressButtonArgs,
} from "src/app/global/components/progressButton/progressButton.model";
import { SocialConnectArgs } from "../models/account-page.interface";
import {
  SimpleProgressButtonModel,
  SimpleProgressButtonModelArgs,
} from "src/app/global/components/progressButton/simpleprogressbutton/simpleProgressButton.model";

// Config for animated submit Connect buttons
const DEFAULT_BUTTON_ARGS: SimpleProgressButtonModelArgs = {
  height: 30,
  width: 100,
  //textSize: 12,
  buttonText: "Connect",
};

/**
 * The component on the Account page which shows the social accounts and
 * for each, whether the user is connected and if not, a button to connect.
 */
@Component({
  selector: "cf-external-login-row",
  templateUrl: "./external-login-row.component.html",
  styleUrls: [
    "../../../../globalcss/base.scss",
    "./external-login-row.component.scss",
  ],
})
export class ExternalLoginRowComponent implements OnInit, OnDestroy {
  @ViewChildren("progressButton") progressButtons: QueryList<
    ProgressButtonComponent
  >;
  socialModel: SocialConnectModel = new SocialConnectModel();
  connectEvent$: Subscription;
  signInEvent$: Subscription;
  animationFinishEvent$: Subscription;
  progressButtonModels: { [socialKey: string]: SimpleProgressButtonModel } = {};

  constructor(
    private accountService: AccountService,
    private errorBarService: ErrorBarService,
    private logger: LoggerService,
    private externalLoginService: ExternalConnectService
  ) {}

  updateSocialModel(): void {
    this.accountService
      .getSocialConnections()
      .subscribe((res: SocialConnectModel) => {
        this.socialModel = res;
        this.resetProgressButtonModels();
      });
  }

  get unconnectedSocialRows(): SocialConnectArgs[] {
    let outRows: SocialConnectArgs[] = [];
    for (let socialRow of this.socialModel.socialRows) {
      if (!socialRow.connected) {
        outRows.push(socialRow);
      }
    }
    return outRows;
  }

  resetProgressButtonModels(): void {
    this.progressButtonModels = {};
    for (let socialRow of this.socialModel.socialRows) {
      let pbModel = new SimpleProgressButtonModel(DEFAULT_BUTTON_ARGS);
      this.progressButtonModels[socialRow.name] = pbModel;
    }
  }

  /*progressButtonFor(socialType: string): ProgressButtonComponent {
    let index: number = -1;
    for (let socialRow of this.unconnectedSocialRows) {
      index++;
      if (socialRow.name === socialType) {
        return this.progressButtons.toArray()[index];
      }
    }
    throw Error(`No progress button found for ${socialType}`);
  }*/

  handleButtonStop(args: SocialEventArgs): void {
    /*const { success, socialType } = args;
    let progressButton: ProgressButtonComponent = this.progressButtonFor(
      socialType
    );
    progressButton.triggerResult(success);
    // Animation finish event gets reused between progress buttons. Unsubscribe to
    // existing before replacing
    if (this.animationFinishEvent$) {
      this.animationFinishEvent$.unsubscribe();
    }

    this.animationFinishEvent$ = progressButton.finishAnimationEvent.subscribe(
      (event: null) => {
        this.updateSocialModel();
      }
    );*/
    this.progressButtonModels[args.socialType].showSpinner = false;
  }

  handleConnect(args: SocialEventArgs): void {
    if (args.success) {
      this.socialModel.socialRows.forEach((row) => {
        if (row.name == args.socialType) {
          row.connected = true;
        }
      });
      this.errorBarService.clearNonFormErrorMessages("socialConnectErrorBar");
    }
  }

  ngOnInit(): void {
    this.updateSocialModel();
    this.connectEvent$ = this.externalLoginService.connectEvent.subscribe(
      (event: SocialEventArgs) => {
        this.handleButtonStop(event);
        this.handleConnect(event);
      }
    );

    this.signInEvent$ = this.externalLoginService.signInEvent.subscribe(
      (event: SocialEventArgs) => {
        this.handleButtonStop(event);
      }
    );
  }

  receiveError(message: string): void {
    this.logger.info("received social connect error: " + message);
    this.errorBarService.pushErrorMessages({
      socialConnectErrorBar: [message],
    });
  }

  ngOnDestroy(): void {
    this.connectEvent$.unsubscribe();
    this.signInEvent$.unsubscribe();
    if (this.animationFinishEvent$) {
      this.animationFinishEvent$.unsubscribe();
    }
  }
}
