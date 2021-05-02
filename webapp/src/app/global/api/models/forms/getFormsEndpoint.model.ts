import { ClaimProperties, Claim } from "../../../models/claim.model";
import { ClaimArgs } from "../../interfaces/general/claim.interface";

export class GetFormsAPIFormModel {
  claims: Claim[];
  completeFormUrl: string;
  errors: GetFormsAPIFormErrorArgs[];
  status: string;
  url: string;
  formId: string;
}

export class GetFormsEndpointModel {
  forms: GetFormsAPIFormModel[];

  constructor(args: GetFormsAPIResponseArgs) {
    this.forms = [];
    for (let key in args.forms) {
      let form: GetFormsAPIFormModel = new GetFormsAPIFormModel();

      form.claims = [];
      form.completeFormUrl = args.forms[key].completeFormUrl;
      form.status = args.forms[key].status;
      form.url = args.forms[key].url;
      form.formId = key;
      form.errors = args.forms[key].errors;

      for (let claimIdKey in args.forms[key].claims) {
        let claimId: string = args.forms[key].claims[claimIdKey];
        for (let detailsKey in args.details) {
          if (args.details[detailsKey].all_claims.claim_id === claimId) {
            let claimData = args.details[detailsKey];
            let claim: Claim = new Claim(claimData);
            form.claims.push(claim);
          }
        }
      }

      this.forms.push(form);
    }
  }
}

export interface GetFormsAPIDetailsArgs {
  [details: string]: ClaimArgs;
}

// Note the key for this dictonary may be the forms ids
export interface GetFormsAPIFormsArgs {
  [form: string]: GetFormsAPIFormArgs;
}

export interface GetFormsAPIFormArgs {
  claims: string[];
  completeFormUrl: string;
  errors: GetFormsAPIFormErrorArgs[];
  status: string;
  url: string;
}

export interface StringStringDictArgs {
  [key: string]: string;
}

export interface StringNumberDictArgs {
  [key: string]: number;
}

export interface GetFormsAPIResponseArgs {
  details: GetFormsAPIDetailsArgs;
  forms: GetFormsAPIFormsArgs;
}

export interface GetFormsAPIFormErrorArgs {
  // Unfortunatly endpoints don't appear to return data object in consistent format
  // Fortunatly we don't need the data object.
  data: any;
  // The name property of the apiException that was added to errors
  name: string;
}
