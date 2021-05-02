export interface UpdateRelativeDeceasedHeirAPIArgs {
  updates: UserRelativeDeceasedHeirTableArgs;
}

export interface UserRelativeDeceasedHeirTableArgs {
  [tableName: string]: UserRelativeDeceasedHeirRowArgs;
}

export interface UserRelativeDeceasedHeirRowArgs {
  _id: number;
  deceased?: boolean;
  deceased_confirmed: boolean;
  user_is_heir: string;
  relationship: string;
}
