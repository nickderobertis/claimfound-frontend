import { Pipe, PipeTransform } from "@angular/core";

/**
 * A pipe while will take an object and pretty print it. Useful for development purposes to display the contents of a model.
 */
@Pipe({
  name: "prettyprintjson",
})
export class PrettyPrintJSONPipe {
  transform(val) {
    return JSON.stringify(val, null, 2)
      .replace(" ", "&nbsp;")
      .replace("\n", "<br/>");
  }
}
