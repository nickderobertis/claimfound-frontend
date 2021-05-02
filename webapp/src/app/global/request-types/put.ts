import { JSONBodyRequest } from "./index";

export class PUT extends JSONBodyRequest {
  get requestMethod(): string {
    return "put";
  }
}
