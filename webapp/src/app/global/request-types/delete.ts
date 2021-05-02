import { RequestType } from "./index";

export class DELETE extends RequestType {
  get requestMethod(): string {
    return "delete";
  }

  beforeRequest(token?: string) {
    super.beforeRequest(token);
    let body = this.data ? JSON.stringify(this.data) : "{}";

    this.requestOptions.body = body;
  }
}
