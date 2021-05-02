import { Document } from "../../../global/models/document.model";
import {
  CurrentDocsArgs,
  DocumentsAPIArgs,
} from "../../../global/api/interfaces/endpoints/documents.interface";
import { RequiredDocRowModel } from "./requiredsection/requireddocrow.model";

export class UploadPageModel {
  claimDocumentRequirements: RequiredDocRowModel[];
  requiredDocs: Document[];
  uploadedDocs: Document[];

  constructor(args: DocumentsAPIArgs) {
    this.claimDocumentRequirements = RequiredDocRowModel.createArrayFromClaimDocumentRequirements(
      args.claims
    );
    this.requiredDocs = Document.arrayFromRequiredDocs(args.required_docs);
    this.uploadedDocs = UploadPageModel.createDocumentModelsFromEndpointCurrentDocs(
      args["current docs"]
    );
  }

  private static createDocumentModelsFromEndpointCurrentDocs(
    docs: CurrentDocsArgs
  ): Document[] {
    let currentDocs: Document[] = [];
    for (let index in docs.IdentityDocs) {
      currentDocs.push(
        Document.fromUploadedDoc(docs.IdentityDocs[index], "identity")
      );
    }

    for (let index in docs.SocialDocs) {
      currentDocs.push(
        Document.fromUploadedDoc(docs.SocialDocs[index], "social")
      );
    }

    for (let index in docs.AddressDocs) {
      currentDocs.push(
        Document.fromUploadedDoc(docs.AddressDocs[index], "address")
      );
    }

    for (let index in docs.CompanyDocs) {
      currentDocs.push(
        Document.fromUploadedDoc(docs.CompanyDocs[index], "company")
      );
    }

    return currentDocs;
  }
}
