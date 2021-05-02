import { RequestType } from "./index";

export class JSONBodyRequest extends RequestType {
  getRequestFunctionArgs() {
    let args = super.getRequestFunctionArgs();

    let body = this.data ? JSON.stringify(this.data) : "{}";

    args.splice(1, 0, body);

    return args;
  }
}
