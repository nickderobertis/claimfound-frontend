import { FormArgs } from "../api/interfaces/general/form.interface";

export class Form {
  cfEsign: boolean;
  completeFormUrl: string;
  downloading: boolean;
  incompleteFormUrl: string;
  url: string;
  formType: string;

  constructor(args?: FormArgs) {
    if (!args) {
      return;
    }

    this.cfEsign = args.cf_esign;
    this.completeFormUrl = args.completeFormUrl;
    this.downloading = args.downloading;
    this.incompleteFormUrl = args.incompleteFormUrl;
    this.url = args.url;
    this.formType = args.form_type;
  }

  static arrayFromArgsArray(data: FormArgs[]): Form[] {
    let forms = [];
    data.forEach((form, index) => {
      forms[index] = new Form(form);
    });
    return forms;
  }
}
