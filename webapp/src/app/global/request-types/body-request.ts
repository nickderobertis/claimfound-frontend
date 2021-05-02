import { RequestType } from "./index";

export class BodyRequest extends RequestType {
  getRequestFunctionArgs() {
    let args = super.getRequestFunctionArgs();

    let body = this.data ? this.data : "{}";

    args.splice(1, 0, body);

    return args;
  }
}
