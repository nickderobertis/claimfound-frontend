import { Form } from "../../../models/form.model";
import { Document } from "../../../models/document.model";

export class FileViewModel {
  name: string;
  description: string;
  url: string;
  backendUrl: Boolean;

  constructor(args?: FileViewModelArguments) {
    if (!args) {
      return;
    }

    this.name = args.name;
    this.description = args.description;
    this.url = args.url;
    this.backendUrl = args.backendUrl;
  }

  public static arrayFromFormArray(forms: Form[]) {
    let outArray: FileViewModel[] = [];
    forms.forEach((form, index) => {
      let args: any = {};
      args.name = form.formType;
      args.url = form.completeFormUrl;
      args.backendUrl = true;
      outArray[index] = new FileViewModel(args);
    });
    return outArray;
  }

  public static arrayFromDocumentArray(docs: Document[]) {
    let outArray: FileViewModel[] = [];
    docs.forEach((doc, index) => {
      let args: any = {};
      args.name = doc.docType;
      args.description = doc.references;
      args.url = doc.documentUrl;
      args.backendUrl = true;
      outArray[index] = new FileViewModel(args);
    });
    return outArray;
  }
}

interface FileViewModelArguments {
  name?: string;
  description?: string;
  url?: string;
  backendUrl?: Boolean;
}
