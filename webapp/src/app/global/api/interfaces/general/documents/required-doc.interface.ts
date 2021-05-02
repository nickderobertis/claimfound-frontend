export interface RequiredDocsObjectArgs {
  [index: string]: RequiredDocArgs;
}

export interface RequiredDocArgs {
  doc_type: string;
  for_claims: string[];
  reference: string;
  invalid_references: string[];
}
