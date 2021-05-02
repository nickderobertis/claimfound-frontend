import { FormArgs } from "./form.interface";
import { UploadedDocsArgs } from "./documents/uploaded.interface";
import { ClaimArgs, ClaimArgsObj } from "./claim.interface";

export interface ReviewTabArgs {
  uploadedDocs: UploadedDocsArgs;
  claimForms: FormArgs[];
  totalValue: number;
  claims: ClaimArgsObj;
}
