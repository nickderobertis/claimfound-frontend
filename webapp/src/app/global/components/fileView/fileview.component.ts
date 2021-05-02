import { Component, Input } from "@angular/core";
import { LoggerService } from "../../../global/logger.service";

import { FileViewModel } from "./models/fileview.model";

/**
 * The component which displays a set of files and allows viewing those files in iframes.
 *
 * This component is just a wrapper to show multiple [FileViewRowComponents]{@link FileViewRowComponent} which actually
 * handle the display functionality.
 *
 * Subcomponents:
 * * [FileViewRowComponent]{@link FileViewRowComponent}
 */
@Component({
  selector: "file-view-list",
  templateUrl: "./fileview.component.html",
  styleUrls: [
    "../../../global/css/normalize.scss",
    "../../../global/css/webflow.scss",
    "./fileview.component.scss",
  ],
})
export class FileViewComponent {
  @Input() model: FileViewModel[];

  constructor(private logger: LoggerService) {}
}
