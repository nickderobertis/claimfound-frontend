/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { Router } from "@angular/router";

import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { serverURL } from "./global";
import { LoggerService } from "./logger.service";
import { StorageService } from "./storage.service";
import { ErrorModalService } from "../error-modal/errormodal.service";

import { stringify } from "./utils/stringHelper";

import { GET, POST, POSTFILE, PUT, DELETE, PATCH } from "./request-types/index";
import { CFError } from "./error.service";

declare var BSON: any; //pull bson object from bson package. See index.html

@Injectable()
export class BaseService {
  private serverUrl = serverURL;

  constructor(
    private http: HttpClient,
    public logger: LoggerService,
    public storage: StorageService,
    public router: Router, // Need to be accessible to inherited services for routing
    public errorModalService: ErrorModalService
  ) {}

  request(options: RequestMethodOptions): Observable<any> {
    let requestType = new options.type({
      url: this.serverUrl + options.url,
      data: options.data,
    });

    let addToken = options.addToken;

    let token = addToken ? (this.storage.getToken() as string) : null;

    this.logger.debug(
      "base.service.request: running http",
      requestType.requestMethod,
      "to url",
      requestType.url,
      "with data",
      stringify(options.data)
    );

    return requestType.request(this.http, token).pipe(
      map(this.extractData, this),
      catchError((err) => this.handleError(err, requestType.url))
    );
  }

  get(options: ServiceRequestOptions): Observable<any> {
    let rmOptions = new RequestMethodOptions(GET, options);

    return this.request(rmOptions);
  }

  post(options: ServiceRequestOptions): Observable<any> {
    let rmOptions = new RequestMethodOptions(POST, options);

    return this.request(rmOptions);
  }

  postFile(options: ServiceRequestOptions): Observable<any> {
    let rmOptions = new RequestMethodOptions(POSTFILE, options);

    return this.request(rmOptions);
  }

  postFileAndData(url: string, data: any, files: any[]): Observable<any> {
    let formData = new FormData();
    for (var i = 0; i < files.length; i++) {
      let file = files[i];
      formData.append("files", file, "file");
    }

    for (let key in data) {
      let value = data[key];
      formData.append(key, value);
    }

    this.logger.debug("formdata key is:", formData.get("docType"));
    let options = new TokenServiceRequestOptions({
      url: url,
      data: formData,
    });

    return this.postFile(options);
  }

  postInject(postObserve: Observable<any>, cb?: Function): Observable<any> {
    let obs = Observable.create((observer) => {
      postObserve.subscribe(
        (res) => {
          let cleanedRes;
          if (cb) {
            cleanedRes = cb(res);
          } else {
            cleanedRes = res;
          }

          observer.next(cleanedRes);
          observer.complete();
        },
        (error) => {
          observer.error(error);
          observer.complete();
        }
      );
    });

    return obs;
  }

  put(options: ServiceRequestOptions): Observable<any> {
    let rmOptions = new RequestMethodOptions(PUT, options);

    return this.request(rmOptions);
  }

  patch(options: ServiceRequestOptions): Observable<any> {
    let rmOptions = new RequestMethodOptions(PATCH, options);

    return this.request(rmOptions);
  }

  delete(options: ServiceRequestOptions): Observable<any> {
    let rmOptions = new RequestMethodOptions(DELETE, options);

    return this.request(rmOptions);
  }

  private extractData(res: HttpResponse<object>) {
    this.logger.debug("Starting extract data. Response has status: " + res);

    let body = res.body;

    this.logger.info("Extracted data: " + JSON.stringify(body));

    return body || {};
  }

  private handleError(error: any, url: string): Observable<CFError> {
    this.logger.debug("Starting handleError in BaseService.");

    if (!(error instanceof HttpErrorResponse)) {
      return throwError(CFError.fromJSError(error));
    }
    let errorObj: CFError = CFError.fromBEResponse(error);

    // url is having full path but we just need endpoint name
    // e.g http://api.localhost/supported-states -> supported-states
    url = url.replace(serverURL, "");

    return errorObj.handler.handleErrors(this, errorObj, url);
  }
}

export class ServiceRequestOptions {
  url: string;
  data?: any;
  addToken: boolean = false;

  constructor(options: any) {
    this.url = options.url;
    this.data = options.data;
    this.addToken = options.addToken;
  }
}

export class RequestMethodOptions extends ServiceRequestOptions {
  // TODO type safe type
  constructor(public type: any, options: ServiceRequestOptions) {
    super(options);
  }
}

export class TokenServiceRequestOptions extends ServiceRequestOptions {
  constructor(options: any) {
    options.addToken = true;

    super(options);
  }
}
