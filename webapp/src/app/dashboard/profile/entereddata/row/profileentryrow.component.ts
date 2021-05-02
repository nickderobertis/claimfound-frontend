import { Component, Input, Output, EventEmitter } from "@angular/core";

import { LoggerService } from "../../../../global/logger.service";
import { ProfileEntryRowModel } from "../profileentry.model";

/**
 * Displays a single profile item for the user and has the option
 * to delete that item.
 */
@Component({
  selector: "cf-profile-entry-row-component",
  templateUrl: "./profileentryrow.component.html",
  styleUrls: [
    "../../../../global/css/normalize.scss",
    "../../../../global/css/webflow.scss",
    "./profileentryrow.component.scss",
  ],
})
export class ProfileEntryRowComponent {
  @Input() model: ProfileEntryRowModel;
  @Output() deleteEvent: EventEmitter<
    ProfileEntryRowModel
  > = new EventEmitter();

  constructor(private logger: LoggerService) {}

  onDelete() {
    this.deleteEvent.emit(this.model);
  }
}
