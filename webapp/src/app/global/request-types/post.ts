import { JSONBodyRequest } from "./index";

export class POST extends JSONBodyRequest {
  get requestMethod(): string {
    return "post";
  }
}
