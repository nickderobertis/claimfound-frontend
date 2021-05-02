import { Claim } from "./claim.model";
import { Form } from "./form.model";
import { Document } from "./document.model";
import { FileViewModel } from "../components/fileView/models/fileview.model";
import { ReviewTabArgs } from "../api/interfaces/general/review-tab.interface";

export class ReviewSubmissionModel {
  documents: Document[];
  forms: Form[];
  totalValue: number;
  userFees: number;
  claims: Claim[];
  state: string;

  formFileViewModels: FileViewModel[];
  docFileViewModels: FileViewModel[];

  constructor(args: ReviewTabArgs) {
    this.documents = Document.arrayFromUploadedDocs(args.uploadedDocs);
    this.forms = Form.arrayFromArgsArray(args.claimForms);
    this.totalValue = args.totalValue;
    this.claims = Claim.arrayFromArgsObj(args.claims);
    this.state = this.claims[0].state;
    this.formFileViewModels = FileViewModel.arrayFromFormArray(this.forms);
    this.docFileViewModels = FileViewModel.arrayFromDocumentArray(
      this.documents
    );
  }
}
