import { JSONBodyRequest } from "./index";

export class PATCH extends JSONBodyRequest {
  get requestMethod(): string {
    return "patch";
  }
}
