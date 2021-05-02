/**
 * The interface for GET /account
 */
export interface AccountDetailsGETAPIArgs {
  /**
   * The current email for the user
   */
  unformatted_email: string;
}

export interface UserHasPasswordGETAPIArg {
  has_password: boolean;
}

export interface EmailUpdatePATCHRequestArgs {
  email: string;
  password: string;
}

export interface PasswordUpdatePATCHRequestArgs {
  new_password: string;
  password: string;
}

export interface SocialConnectArgs {
  name: string;
  connected: boolean;
}

export interface SocialConnectGETAPIArgs {
  services: SocialConnectArgs[];
}

export interface EmailFieldArgs {
  email?: string;
  password?: string;
}

export interface EmailFieldsErrorsArgs {
  fields_errors: EmailFieldArgs;
}

export interface PasswordFieldArgs {
  new_password?: string;
  password?: string;
}

export interface PasswordFieldsErrorsArgs {
  fields_errors: PasswordFieldArgs;
}
