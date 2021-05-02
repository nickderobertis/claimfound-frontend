export interface UserDetailsGETNameAPIArgs {
  [index: string]: UserDetailsName;
}

export interface UserDetailsName {
  _id: number;
  first_name: string;
  last_name: string;
  deleted: boolean;
  is_primary: boolean;
  middle_name: string;
}

export interface UserDetailsPOSTNameArgs {
  first_name: string;
  last_name: string;
  is_primary: boolean;
  middle_name?: string;
}

export interface UserDetailsGetBirthdayGenderAPIArgs {
  [index: string]: UserDetailsBirthdayGender;
}

export interface UserDetailsBirthdayGender {
  _id: number;
  deleted: boolean;
  birth_day: string;
  gender: string;
  user_id: number;
}

export interface UserDetailsPOSTBirthdayGenderArgs {
  birth_day: string;
  gender: string;
}

export interface UserDetailsGETRelativesAPIArgs {
  [index: string]: UserDetailsRelative;
}

export interface UserDetailsRelative {
  _id: number;
  first_name: string;
  last_name: string;
  deleted: boolean;
  relationship: string;
  deceased: boolean;
  deceased_confirmed: boolean;
  user_is_heir: string;
}

export interface UserDetailsPOSTRelativeArgs {
  first_name: string;
  last_name: string;
  deceased: boolean;
  relationship: string;
  user_is_heir: string;
}

export interface UserDetailsGETPhonesAPIArgs {
  [index: string]: UserDetailsPhone;
}

export interface UserDetailsPhone {
  _id: number;
  deleted: boolean;
  is_primary: boolean;
  phone: string;
  current: boolean;
}

export interface UserDetailsPOSTPhoneArgs {
  is_primary: boolean;
  phone: string;
  current: boolean;
}

export interface UserDetailsGETAddressesAPIArgs {
  [index: string]: UserDetailsAddress;
}

export interface UserDetailsAddress {
  _id: number;
  deleted: boolean;
  is_primary: boolean;
  street_address: string;
  city: string;
  state: string;
  zip_code: string;
  current: boolean;
}

export interface UserDetailsPOSTAddressArgs {
  is_primary: boolean;
  street_address: string;
  city: string;
  state: string;
  zip_code: string;
  current: boolean;
}

export type UserDetailsPOSTArgs =
  | UserDetailsPOSTAddressArgs
  | UserDetailsPOSTNameArgs
  | UserDetailsPOSTPhoneArgs
  | UserDetailsPOSTRelativeArgs
  | UserDetailsPOSTBirthdayGenderArgs;

export interface UserDetailsPOSTAPIRequestArgs {
  data: UserDetailsPOSTArgs;
  table_name: string;
}

export interface UserDetailsDELETEAPIRequestArgs {
  _id: number;
  table_name: string;
}

export interface UserDetailsPOSTAPIArgs {
  id: number;
}

export type UserDetailsGETAPIArgs =
  | UserDetailsGETAddressesAPIArgs
  | UserDetailsGETNameAPIArgs
  | UserDetailsGETPhonesAPIArgs
  | UserDetailsGETRelativesAPIArgs
  | UserDetailsGetBirthdayGenderAPIArgs;
