import {
  AddressArgs,
  AddressArrayArgs,
} from "../api/interfaces/general/address.interface";

export class Address {
  city: string;
  county: string;
  state: string;
  streetAddress: string;
  zipCode: string;
  latitude: string;
  longitude: string;
  latlongCScore: string;

  get fullAddress() {
    return (
      this.streetAddress +
      " " +
      this.city +
      " " +
      this.state +
      " " +
      this.zipCode
    );
  }

  constructor(args?: AddressArgs) {
    if (!args) {
      return;
    }

    this.city = args.city;
    this.county = args.county;
    this.state = args.state;
    this.streetAddress = args.street_address;
    this.zipCode = args.zip_code;
    this.latitude = String(args.latitude);
    this.longitude = String(args.longitude);
    this.latlongCScore = String(args.latlong_c_score);
  }

  static arrayFromArgsArrayObj(data: AddressArrayArgs): Address[] {
    let addressMap: { [addressType: string]: string } = {
      city: "city",
      county: "county",
      state: "state",
      street_address: "streetAddress",
      zip_code: "zipCode",
      latitude: "latitude",
      longitude: "longitude",
      lat_long_c_Score: "latlongCScore",
    };

    let addresses = new Array(this.getLongestArrayFromAddressArrayArgs(data))
      .fill(null)
      .map(() => new Address());

    for (let addressType in data) {
      data[addressType].forEach((address, index) => {
        if (Object.keys(addressMap).includes(addressType)) {
          addresses[index][addressMap[addressType]] = address;
        }
      });
    }
    return addresses;
  }

  private static getLongestArrayFromAddressArrayArgs(data: AddressArrayArgs): number {
    let retval = 0;
    if(data.city) { retval = Math.max(retval, data.city.length); }
    if(data.county) { retval = Math.max(retval, data.county.length); }
    if(data.latitude) { retval = Math.max(retval, data.latitude.length); }
    if(data.latlong_c_score) { retval = Math.max(retval, data.latlong_c_score.length); }
    if(data.longitude) { retval = Math.max(retval, data.longitude.length); }
    if(data.state) { retval = Math.max(retval, data.state.length); }
    if(data.street_address) { retval = Math.max(retval, data.street_address.length); }
    if(data.zip_code) { retval = Math.max(retval, data.zip_code.length); }
    return retval;
  }
}
