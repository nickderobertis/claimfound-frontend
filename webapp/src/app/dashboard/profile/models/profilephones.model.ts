import { UserDetailsGETPhonesAPIArgs } from "src/app/global/api/interfaces/endpoints/user-details/userdetails.interface";

export interface ProfilePhoneArgs {
  id: number;
  primary: boolean;
  phone: string;
  current: boolean;
}

export class ProfilePhone implements ProfilePhoneArgs {
  id: number;
  primary: boolean;
  phone: string;
  current: boolean;

  constructor(args: ProfilePhoneArgs) {
    for (let key in args) {
      this[key] = args[key];
    }
  }

  get formattedPhoneNumber(): string {
    let pre: string = this.phone.slice(1, 2);
    let area: string = this.phone.slice(2, 5);
    let mid: string = this.phone.slice(5, 8);
    let last: string = this.phone.slice(8);
    return pre + " (" + area + ") " + mid + "-" + last;
  }
}

export class ProfilePhones {
  phones: ProfilePhone[];

  constructor(args: UserDetailsGETPhonesAPIArgs) {
    let phones: ProfilePhone[] = [];
    for (let key in args) {
      let phoneArgs: ProfilePhoneArgs = {
        phone: args[key].phone,
        current: args[key].current,
        primary: args[key].is_primary,
        id: args[key]._id,
      };
      let phone: ProfilePhone = new ProfilePhone(phoneArgs);
      phones.push(phone);
    }
    this.phones = phones;
  }
}
