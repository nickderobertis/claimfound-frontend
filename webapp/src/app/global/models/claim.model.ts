import { Name } from "./name.model";
import { Address } from "./address.model";
import {
  ClaimArgs,
  ClaimArgsObj,
} from "../api/interfaces/general/claim.interface";

export interface ClaimProperties {
  claimId: string;
  state: string;
  status: string;
  statusInProgress: boolean;
  amount: number;
  propertyType: string;
  reportingCompany: string;
  names: Name[];
  addresses: Address[];
  score?: number;
  step?: string;
}

export class Claim implements ClaimProperties {
  claimId: string;
  state: string;
  status: string;
  statusInProgress: boolean;
  amount: number;
  propertyType: string;
  reportingCompany: string;
  names: Name[];
  addresses: Address[];
  score?: number;
  step?: string;

  constructor(args?: ClaimArgs) {
    if (!args) {
      return;
    }

    this.claimId = args.all_claims.claim_id;
    this.state = args.all_claims.state;
    this.status = args.all_claims.status;
    this.statusInProgress = args.all_claims.status_in_progress;
    this.amount = args.state_claims.amount;
    this.propertyType = args.state_claims.property_type;
    this.reportingCompany = args.state_claims.reporting_company;
    this.score = args.user_claims ? args.user_claims.score : undefined;
    this.step = args.user_claims ? args.user_claims.step : undefined;

    this.names = Name.arrayFromArgsArrayObj({
      first_name: args.state_claim_people.first_name,
      last_name: args.state_claim_people.last_name,
      middle_name: args.state_claim_people.middle_name,
    });

    this.addresses = Address.arrayFromArgsArrayObj({
      city: args.state_claim_people.city,
      county: args.state_claim_people.county,
      state: args.state_claim_people.state,
      street_address: args.state_claim_people.street_address,
      zip_code: args.state_claim_people.zip_code,
    });
  }

  static arrayFromArgsObj(data: ClaimArgsObj) {
    let claims = [];
    for (let index in data) {
      claims.push(new Claim(data[index]));
    }
    return claims;
  }

  get formattedAmount(): string {
    let formattingOptions: Intl.NumberFormatOptions = {
      style: "currency",
      currency: "USD",
    };
    if (this.amount >= 1000) {
      // decimals too long for display for $1000+
      formattingOptions.minimumFractionDigits = 0;
      formattingOptions.maximumFractionDigits = 0;
    }
    return this.amount.toLocaleString("en-US", formattingOptions);
  }

  // TODO: once forms page (including ClaimTableTopData) handles arrays, remove these methods
  get firstandLastNameCapitalizedString(): string {
    return this.getArrayFromPropertyOfArrayObjects(
      "names",
      "capitalizedFirstAndLastName"
    ).join(", ");
  }

  get streetAddressString(): string {
    return this.getArrayFromPropertyOfArrayObjects(
      "addresses",
      "streetAddress"
    ).join(", ");
  }

  getArrayFromPropertyOfArrayObjects(
    arrayName: string,
    getProperty: string
  ): any[] {
    let array = this[arrayName];
    let outputArray = [];
    for (let item of array) {
      outputArray.push(item[getProperty]);
    }
    return outputArray;
  }
  // TODO: end previous TODO
}
