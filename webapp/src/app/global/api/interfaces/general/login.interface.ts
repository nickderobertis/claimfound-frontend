export interface LoginFieldArgs{
    email?:string,
    password?:string
  }

  export interface LoginFieldErrorsArgs {
  fields_errors: LoginFieldArgs;
}
