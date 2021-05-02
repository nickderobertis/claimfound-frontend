import { Component, Input, Output, EventEmitter } from "@angular/core";

import { LoggerService } from "../../../global/logger.service";
import { ProfileEntryModel, ProfileEntryRowModel } from "./profileentry.model";

/**
 * The top-level component used to display the user's profile information.
 *
 * Directly displays the title, is mainly a container of rows which are
 * [ProfileEntryRowComponents]{@link ProfileEntryRowComponent}.
 *
 * Subcomponents:
 * [ProfileEntryRowComponent]{@link ProfileEntryRowComponent}
 */
@Component({
  selector: "cf-profile-entry-component",
  templateUrl: "./profileentry.component.html",
  styleUrls: [
    "../../../global/css/normalize.scss",
    "../../../global/css/webflow.scss",
    "./profileentry.component.scss",
  ],
})
export class ProfileEntryComponent {
  @Input() title: string;
  @Input() model: ProfileEntryModel;
  @Output() deleteEvent: EventEmitter<
    ProfileEntryRowModel
  > = new EventEmitter();

  constructor(private logger: LoggerService) {}

  get hasNoData(): boolean {
    return this.model.rows.length <= 0;
  }

  onDeleteEvent(event: ProfileEntryRowModel): void {
    this.deleteEvent.emit(event);
  }
}
