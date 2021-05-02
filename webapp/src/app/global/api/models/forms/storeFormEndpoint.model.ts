export class StoreFormEndpointModel {
  completedForm: string;
  formIndex: number;

  constructor(args: StoreFormAPIResponseArgs) {
    this.completedForm = args.completed_doc;
    this.formIndex = args.form_index;
  }
}

export interface StoreFormAPIResponseArgs {
  completed_doc: string;
  form_index: number;
}

export interface StoreFormAPIRequestArgs {
  selectedForm: number;
  formId: number;
}
