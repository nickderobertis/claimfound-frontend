import { MapPointGETResponseAPIArgs, TopClaim } from "../interfaces/point-details.interface";

export class PointDetailsModel {
  totalValue: number;
  averageValue: number;
  totalClaims: number;
  address: string;
  topClaims: TopClaimModel[];

  constructor(args?: MapPointGETResponseAPIArgs) {
    if (!args) {
      return;
    }

    this.totalValue = args.total_value;
    this.averageValue = args.average_value;
    this.totalClaims = args.total_claims;
    this.address = args.address;
    this.topClaims = [];
    for(let i = 0; i < args.top_claims.length; i++) {
      this.topClaims.push(new TopClaimModel(args.top_claims[i]));
    }
  }
}

export class TopClaimModel {
  name: string;
  reportingCompany: string;
  propertyType: string;
  amount: string;
  reportedDate: string;
  referralToken: string;

  constructor(args: TopClaim) {
    this.amount = args.amount;
    this.name = args.name;
    this.propertyType = args.property_type;
    this.referralToken = args.referral_token;
    this.reportedDate = args.reported_date;
    this.reportingCompany = args.reporting_company;
  }
}
