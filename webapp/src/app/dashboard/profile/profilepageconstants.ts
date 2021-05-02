export const profileRootPath = "dashboard/profile";
export interface ProfilePagePaths {
  names: string;
  birthdayGender: string;
  relatives: string;
  relativesQuestions: string;
  phones: string;
  phonesQuestions: string;
  addresses: string;
  addressesQuestions: string;
}

export class ProfilePageConstants {
  static pageRelativePaths: ProfilePagePaths = {
    names: "names",
    birthdayGender: "birthdayandgender",
    relatives: "relatives",
    relativesQuestions: "relatives/questions",
    phones: "phones",
    phonesQuestions: "phones/questions",
    addresses: "addresses",
    addressesQuestions: "addresses/questions",
  };

  static get pagePaths(): ProfilePagePaths {
    let outPaths = {};
    for (let pathKey in ProfilePageConstants.pageRelativePaths) {
      outPaths[pathKey] =
        "/" +
        profileRootPath +
        "/" +
        ProfilePageConstants.pageRelativePaths[pathKey];
    }
    return outPaths as ProfilePagePaths;
  }

  // All the page paths as an array
  static get pagePathsArr(): string[] {
    return Object.keys(this.pagePaths).map(key => this.pagePaths[key]);
  }
}
