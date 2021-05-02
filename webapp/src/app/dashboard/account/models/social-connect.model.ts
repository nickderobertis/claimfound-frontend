import {
  SocialConnectGETAPIArgs,
  SocialConnectArgs,
} from "./account-page.interface";

export class SocialConnectModel {
  socialRows: SocialConnectArgs[] = [];

  constructor(arg?: SocialConnectGETAPIArgs) {
    if (!arg) {
      return;
    }

    for (let i of arg.services) {
      this.socialRows.push({
        name: i.name,
        connected: i.connected,
      });
    }
  }
}
