export interface UploadedDocsArgs {
  [docType: string]: UploadedDocArgs[];
}

export interface UploadedDocsObjectArgs {
  [index: string]: UploadedDocArgs;
}

export interface UploadedDocArgs {
  docUrl: string;
  file_type: string;
  user_id: number;
  address?: string;
  company?: string;
  doc_type?: string;
}
