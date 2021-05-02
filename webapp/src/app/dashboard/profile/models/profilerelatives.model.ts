import { UserDetailsGETRelativesAPIArgs } from "src/app/global/api/interfaces/endpoints/user-details/userdetails.interface";

export interface ProfileRelativeArgs {
  id: number;
  firstName: string;
  lastName: string;
  relationship: string;
  deceased: boolean;
  userIsHeir: string;
}

export class ProfileRelative implements ProfileRelativeArgs {
  id: number;
  firstName: string;
  lastName: string;
  relationship: string;
  deceased: boolean;
  userIsHeir: string;

  constructor(args: ProfileRelativeArgs) {
    for (let key in args) {
      this[key] = args[key];
    }
  }

  get fullName(): string {
    return this.firstName + " " + this.lastName;
  }
}

export class ProfileRelatives {
  relatives: ProfileRelative[];

  constructor(args: UserDetailsGETRelativesAPIArgs) {
    let relatives: ProfileRelative[] = [];
    for (let key in args) {
      let relativeArgs: ProfileRelativeArgs = {
        firstName: args[key].first_name,
        lastName: args[key].last_name,
        relationship: args[key].relationship,
        deceased: args[key].deceased,
        userIsHeir: args[key].user_is_heir,
        id: args[key]._id,
      };
      let relative: ProfileRelative = new ProfileRelative(relativeArgs);
      relatives.push(relative);
    }
    this.relatives = relatives;
  }
}
