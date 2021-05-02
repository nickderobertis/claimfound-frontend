import { UserDetailsGETAddressesAPIArgs } from "src/app/global/api/interfaces/endpoints/user-details/userdetails.interface";

// TODO: this could be refactored after refactoring the global address model

export interface ProfileAddressArgs {
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  primary: boolean;
  id: number;
  current: boolean;
}

export class ProfileAddress implements ProfileAddressArgs {
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  primary: boolean;
  id: number;
  current: boolean;

  constructor(args: ProfileAddressArgs) {
    for (let key in args) {
      this[key] = args[key];
    }
  }

  get fullAddress(): string {
    return (
      this.streetAddress +
      ", " +
      this.city +
      ", " +
      this.state +
      " " +
      this.zipCode
    );
  }
}

export class ProfileAddresses {
  addresses: ProfileAddress[];

  constructor(args: UserDetailsGETAddressesAPIArgs) {
    let addrs: ProfileAddress[] = [];
    for (let key in args) {
      let nameArgs: ProfileAddressArgs = {
        streetAddress: args[key].street_address,
        city: args[key].city,
        state: args[key].state,
        zipCode: args[key].zip_code,
        primary: args[key].is_primary,
        id: args[key]._id,
        current: args[key].current,
      };
      let name = new ProfileAddress(nameArgs);
      addrs.push(name);
    }
    this.addresses = addrs;
  }
}
