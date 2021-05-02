import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";
import { CLIENT_API_KEY } from "../org-settings";

export class RequestType {
  requestOptions: any = {};

  constructor(public _options: RequestTypeOptions) {}

  get url(): string {
    return this._options.url;
  }

  get requestMethod(): string {
    return this._options.method;
  }

  get data(): any {
    return this._options.data;
  }

  request(http: HttpClient, token?: string): Observable<any> {
    return this.callRequestFunction(http, token);
  }

  getRequestFunction(http) {
    let requestFunction = http[this.requestMethod];

    if (!requestFunction) {
      throw `Could not find request method: ${this.requestMethod}`;
    }

    return requestFunction;
  }

  callRequestFunction(http: HttpClient, token?: string): Observable<any> {
    let requestFunction = this.getRequestFunction(http);

    this.beforeRequest(token);

    return requestFunction.apply(http, this.getRequestFunctionArgs());
  }

  getRequestFunctionArgs(): any[] {
    return [this.url, this.requestOptions];
  }

  beforeRequest(token?: string) {
    let headerOptions = {
      "Content-Type": "application/json",
      "CF-API-KEY": CLIENT_API_KEY,
    };

    if (token) {
      headerOptions["X-CF-Token"] = token;
    }

    let headers = new HttpHeaders(headerOptions);

    this.requestOptions = {
      headers: headers,
      observe: "response" as "body",
    };
  }
}

export class RequestTypeOptions {
  url: string;
  method?: string;
  data?: any;
}
