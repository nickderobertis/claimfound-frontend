export interface ClaimDocumentRequirementObjectArgs {
  [index: string]: ClaimDocumentRequirementArgs;
}

export interface ClaimDocumentRequirementArgs {
  address?: string;
  claim_id?: string;
  company?: string;
  required_docs: string[];
  state: string;
  step: string;
}
