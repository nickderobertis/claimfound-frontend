export interface FormArgs {
  cf_esign?: boolean; // Indicates whether the user must provide an e-signature
  completeFormUrl?: string;
  downloading?: boolean;
  incompleteFormUrl?: string;
  url?: string;
  form_type?: string;
}
