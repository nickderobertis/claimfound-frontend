import {
  ClaimDocumentRequirementArgs,
  ClaimDocumentRequirementObjectArgs,
} from "../../../../global/api/interfaces/general/documents/claim-document-requirement.interface";

export class RequiredDocRowModel {
  claimId: string;
  reportingCompany: string;
  requiredDocuments: string[];
  completed: boolean;

  documentUploadInProgress: boolean = false;

  constructor(args?: ClaimDocumentRequirementArgs) {
    this.claimId = args.claim_id;
    this.requiredDocuments = args.required_docs;
    this.reportingCompany = args.company;
    this.completed = args.required_docs.length == 0;
  }

  public static createArrayFromClaimDocumentRequirements(
    args: ClaimDocumentRequirementArgs[] | ClaimDocumentRequirementObjectArgs
  ): RequiredDocRowModel[] {
    let outArray: RequiredDocRowModel[] = [];
    for (let index in args) {
      outArray[index] = new RequiredDocRowModel(args[index]);
    }
    return outArray;
  }

  public setDocumentUploadInProgress(
    claimsList: string[]
  ): RequiredDocRowModel {
    if (
      claimsList.indexOf(this.claimId) > -1 &&
      this.requiredDocuments.length > 0 &&
      this.completed == false
    ) {
      this.documentUploadInProgress = true;
    }

    return this;
  }
}
