import { CFError } from 'src/app/global/error.service';

export interface ErrorMessagesArgs {
  [errorBarId: string]: string[];
}

export interface ErrorBarCFErrorArgs {
  [errorBarId: string]: CFError;
}
