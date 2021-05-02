import { UserDetailsGETNameAPIArgs } from "src/app/global/api/interfaces/endpoints/user-details/userdetails.interface";

export interface ProfileNameArgs {
  firstName: string;
  lastName: string;
  middleName: string;
  primary: boolean;
  id: number;
}

export class ProfileName implements ProfileNameArgs {
  firstName: string;
  lastName: string;
  middleName: string;
  primary: boolean;
  id: number;

  constructor(args: ProfileNameArgs) {
    for (let key in args) {
      this[key] = args[key];
    }
  }

  get fullName(): string {
    if (this.middleName) {
      return this.firstName + " " + this.middleName + " " + this.lastName;
    } else {
      return this.firstName + " " + this.lastName;
    }
  }
}

export class ProfileNames {
  names: ProfileName[];

  constructor(args: UserDetailsGETNameAPIArgs) {
    let names: ProfileName[] = [];
    for (let key in args) {
      let nameArgs: ProfileNameArgs = {
        firstName: args[key].first_name,
        lastName: args[key].last_name,
        middleName: args[key].middle_name,
        primary: args[key].is_primary,
        id: args[key]._id,
      };
      let name: ProfileName = new ProfileName(nameArgs);
      names.push(name);
    }
    this.names = names;
  }
}
