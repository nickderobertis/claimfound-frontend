export interface DocumentArgs {
  docType?: string; //Identity, Address, Company, etc.
  forClaims?: string[]; //array of claim ids which this references
  references?: string; //actual company, address, etc. (blank for indentity, social)
  invalid_references?: string[];
  condition?: string; //stores !company_doc, !address_doc for either/or prompts
  doc?: File;
  documentUrl?: string;
  fileType?: string;
  backendUrl?: boolean;
  userUploaded?: boolean;
}
