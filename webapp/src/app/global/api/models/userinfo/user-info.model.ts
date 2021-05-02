import {
    UserNameAndEmailArgs,
  } from "../../interfaces/endpoints/userinfo/user-info.interface";

export class UserNameAndEmailModel{
    userNameFull: string;
    email:string;
    firstName:string;
    secondName:string;
    constructor(data: UserNameAndEmailArgs ){
        this.userNameFull=data.user_name_full;
        this.email=data.email;
        this.firstName=data.first_name;
        this.secondName=data.second_name;
    }
}