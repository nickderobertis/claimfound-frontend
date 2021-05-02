import { BodyRequest } from "./body-request";

export class POSTFILE extends BodyRequest {
  get requestMethod(): string {
    return "post";
  }

  beforeRequest(token?: string) {
    super.beforeRequest(token);

    this.requestOptions.headers = this.requestOptions.headers.delete(
      "Content-Type"
    );
  }
}
