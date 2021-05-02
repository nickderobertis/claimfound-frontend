export interface UserDetailsUpdateAPIArgs {
  updates: UserDetailsUpdateTableArgs;
}

export interface UserDetailsUpdateTableArgs {
  [tableName: string]: UserDetailsUpdateRowArgs[];
}

export interface UserDetailsUpdateRowArgs {
  [columnName: string]: string | number | string[] | number[];
}
