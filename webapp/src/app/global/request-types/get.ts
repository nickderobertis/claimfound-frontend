import { HttpParams } from "@angular/common/http";

import { RequestType } from "./index";

export class GET extends RequestType {
  get requestMethod(): string {
    return "get";
  }

  beforeRequest(token?: string) {
    super.beforeRequest(token);

    this.requestOptions.headers = this.requestOptions.headers.delete(
      "Content-Type"
    );

    if (this.data) {
      this.requestOptions.params = new HttpParams();

      for (let key in this.data) {
        if (Array.isArray(this.data[key])) {
          this.requestOptions.params = this.requestOptions.params.append(
            key,
            JSON.stringify(this.data[key])
          );
        } else {
          this.requestOptions.params = this.requestOptions.params.set(
            key,
            this.data[key]
          );
        }
      }
    }
  }
}
