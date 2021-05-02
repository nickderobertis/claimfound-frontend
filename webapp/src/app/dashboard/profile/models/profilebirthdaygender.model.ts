import { UserDetailsGetBirthdayGenderAPIArgs } from "src/app/global/api/interfaces/endpoints/user-details/userdetails.interface";

export interface ProfileBirthdayGenderArgs {
  birthday: string;
  gender: string;
  primary: boolean;
  id: number;
}

export class ProfileBirthdayGender implements ProfileBirthdayGenderArgs {
  birthday: string;
  gender: string;
  primary: boolean;
  id: number;

  constructor(args: ProfileBirthdayGenderArgs) {
    for (let key in args) {
      this[key] = args[key];
    }
  }
}

export class ProfileBirthdayGenders {
  birthdayGenders: ProfileBirthdayGender[];

  constructor(args: UserDetailsGetBirthdayGenderAPIArgs) {
    let bdayGenders: ProfileBirthdayGender[] = [];
    for (let key in args) {
      let bdayGenderArgs: ProfileBirthdayGenderArgs = {
        birthday: args[key].birth_day,
        gender: args[key].gender,
        primary: true,
        id: args[key]._id,
      };
      let bdayGender = new ProfileBirthdayGender(bdayGenderArgs);
      bdayGenders.push(bdayGender);
    }
    this.birthdayGenders = bdayGenders;
  }
}
