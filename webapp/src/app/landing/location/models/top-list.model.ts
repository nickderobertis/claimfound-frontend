import { TopListValue, TopLists } from "../interfaces/overview.interface";

const reportingCompanyDisplay = "Reporting Companies";
const reportingCompanyDesc =
  "Reporting companies are the companies that you had a relationship with and then they turned over your unclaimed money to the Florida Unclaimed Property Division.";
const upTypesDisplay = "Types of Unclaimed Money";
const upTypesDesc =
  "There are many different ways that you could have unclaimed money. Below are the most common types of unclaimed money that have been reported to the Treasury in Gainesville.";

export class TopListValueModel {
  name: string;
  totalValue: number;
  totalClaims: number;

  constructor(args: TopListValue) {
    this.name = args.name;
    this.totalValue = args.total_value;
    this.totalClaims = args.total_claims;
  }
}

export class TopListModel {
  listName: string;
  description: string;
  rows: TopListValueModel[];

  constructor(
    listName: string,
    description: string,
    rows: TopListValueModel[]
  ) {
    this.listName = listName;
    this.description = description;
    this.rows = rows;
  }
}

export class TopListsModel {
  companies: TopListModel = new TopListModel(
    reportingCompanyDisplay,
    reportingCompanyDesc,
    []
  );
  upTypes: TopListModel = new TopListModel(upTypesDisplay, upTypesDesc, []);

  constructor(args?: TopLists) {
    if (!args) {
      return;
    }

    let companies: TopListValueModel[] = [];
    for (let companyArgs of args.companies) {
      let company: TopListValueModel = new TopListValueModel(companyArgs);
      companies.push(company);
    }
    this.companies = new TopListModel(
      reportingCompanyDisplay,
      reportingCompanyDesc,
      companies
    );

    let upTypes: TopListValueModel[] = [];
    for (let upTypeArgs of args.up_types) {
      let upType: TopListValueModel = new TopListValueModel(upTypeArgs);
      upTypes.push(upType);
    }
    this.upTypes = new TopListModel(upTypesDisplay, upTypesDesc, upTypes);
  }
}
