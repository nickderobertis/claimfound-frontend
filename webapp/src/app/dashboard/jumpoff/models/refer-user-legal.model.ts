import { ReferUserLegalAPIArgs } from "../../../global/api/interfaces/endpoints/refer-user-legal.interface";

export class ReferUserLegalEndpointModel {
  legalFoundLink: string;

  constructor(args: ReferUserLegalAPIArgs) {
    this.legalFoundLink = args.circuitLink;
  }
}
