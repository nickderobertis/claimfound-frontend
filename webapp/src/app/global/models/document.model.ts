import { DocumentArgs } from "../api/interfaces/general/documents/document.interface";
import {
  UploadedDocArgs,
  UploadedDocsArgs,
} from "../api/interfaces/general/documents/uploaded.interface";
import {
  RequiredDocArgs,
  RequiredDocsObjectArgs,
} from "../api/interfaces/general/documents/required-doc.interface";

export class Document {
  docType: string = "";
  forClaims: string[];
  references: string;
  invalid_references: string[];
  condition: string;
  doc: File;
  documentUrl: string;
  fileType: string;
  backendUrl: boolean;
  userUploaded: boolean = true;

  constructor(args?: DocumentArgs) {
    if (!args) {
      return;
    }

    this.docType = args.docType;
    this.forClaims = args.forClaims;
    this.references = args.references;
    this.invalid_references = args.invalid_references;
    this.condition = args.condition;
    this.doc = args.doc;
    this.documentUrl = args.documentUrl;
    this.fileType = args.fileType;
    this.backendUrl = args.backendUrl;
    this.userUploaded = args.userUploaded;
  }

  static fromUploadedDoc(data: UploadedDocArgs, docType: string): Document {
    let docData: DocumentArgs = {
      docType: docType,
      references: data[docType],
      forClaims: [],
      documentUrl: data.docUrl,
      fileType: data.file_type,
    };
    if (data.doc_type && data.doc_type === "cf_report") {
      docData.userUploaded = false;
    } else {
      docData.userUploaded = true;
    }
    return new Document(docData);
  }

  static arrayFromUploadedDocsArray(
    data: UploadedDocArgs[],
    docType: string
  ): Document[] {
    let uploadedDocuments: Document[] = [];
    for (let key in data) {
      uploadedDocuments.push(Document.fromUploadedDoc(data[key], docType));
    }
    return uploadedDocuments;
  }

  static arrayFromUploadedDocs(data: UploadedDocsArgs): Document[] {
    let documents = [];
    for (let docType in data) {
      documents = documents.concat(
        Document.arrayFromUploadedDocsArray(data[docType], docType)
      );
    }
    return documents;
  }

  static fromRequiredDoc(data: RequiredDocArgs): Document {
    let docData = {
      docType: data.doc_type,
      references: data.reference,
      invalid_references: data.invalid_references,
      forClaims: data.for_claims,
    };
    return new Document(docData);
  }

  static arrayFromRequiredDocs(
    data: RequiredDocArgs[] | RequiredDocsObjectArgs
  ): Document[] {
    let index = 0;
    let requiredDocuments: Document[] = [];
    for (let key in data) {
      requiredDocuments[index] = Document.fromRequiredDoc(data[key]);
      index++;
    }
    return requiredDocuments;
  }
}
