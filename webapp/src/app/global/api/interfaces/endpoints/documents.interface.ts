import {
  UploadedDocArgs,
  UploadedDocsObjectArgs,
} from "../general/documents/uploaded.interface";
import {
  RequiredDocsObjectArgs,
  RequiredDocArgs,
} from "../general/documents/required-doc.interface";
import {
  ClaimDocumentRequirementArgs,
  ClaimDocumentRequirementObjectArgs,
} from "../general/documents/claim-document-requirement.interface";

export interface DocumentsAPIArgs {
  claims: ClaimDocumentRequirementObjectArgs | ClaimDocumentRequirementArgs[];
  "current docs": CurrentDocsArgs;
  required_docs: RequiredDocsObjectArgs | RequiredDocArgs[];
}

export interface CurrentDocsArgs {
  AddressDocs: UploadedDocsObjectArgs | UploadedDocArgs[];
  CompanyDocs: UploadedDocsObjectArgs | UploadedDocArgs[];
  IdentityDocs: UploadedDocsObjectArgs | UploadedDocArgs[];
  SocialDocs: UploadedDocsObjectArgs | UploadedDocArgs[];
}
