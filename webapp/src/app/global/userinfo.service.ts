import { Injectable } from "@angular/core";
import {StorageService} from "./storage.service";
import { log } from "./logger.service";
import {
    BaseService,
    TokenServiceRequestOptions,
  } from "./base.service";
import { LoggerService } from "./logger.service";
import { ErrorModalService } from "../error-modal/errormodal.service";
import { Router } from "@angular/router";
import {
    HttpClient,
    HttpResponse,
    HttpErrorResponse,
} from "@angular/common/http";

import { Observable } from "rxjs";

import { UserNameAndEmailModel } from "src/app/global/api/models/userinfo/user-info.model";
import { UserNameAndEmailArgs } from "src/app/global/api/interfaces/endpoints/userinfo/user-info.interface";
import { of } from 'rxjs';



@Injectable()
export class UserInfoService extends BaseService{

constructor(
      private storage_service: StorageService,
      http: HttpClient,
      logger: LoggerService,
      storage: StorageService,
      router: Router,
      errorModService: ErrorModalService,
    ) {

    super(http, logger, storage, router, errorModService);
 }



@log()
getBothDetails():Observable<UserNameAndEmailModel>{
  let userNameFull = this.storage_service.read<string>("cf-user-full-name");
  let FirstName = this.storage_service.read<string>("cf-user-name");
  let SecondName = this.storage_service.read<string>("cf-user-last-name");
  let email = this.storage_service.read<string>("cf-email-sent");

  if(userNameFull && email && SecondName && FirstName){
    //Check if data is in local storage  
    let res:UserNameAndEmailArgs = {"user_name_full":userNameFull,"email":email,"first_name":FirstName,"second_name":SecondName};  
    let model = new UserNameAndEmailModel(res);
    const observable_of_model=of(model);
    return observable_of_model;
  }

  else{
    //If data not in local storage then fetch from api
    let options = new TokenServiceRequestOptions({
      url: "userinformation",
  });
  
  return this.postInject(
      this.get(options),(res:UserNameAndEmailArgs) => {
        return new UserNameAndEmailModel(res);
      });
  }
}

storeUserInfo(firstName: string, lastName: string, email: string) {
  this.storage_service.write("cf-user-name", firstName);
  this.storage_service.write("cf-user-last-name", lastName);
  this.storage_service.write("cf-email-sent", email);
  this.storage_service.write("cf-user-full-name", firstName + " " + lastName);
}


}
