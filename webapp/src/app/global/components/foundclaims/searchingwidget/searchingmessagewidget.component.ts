import { Component } from "@angular/core";

/**
 * This component is for a resued set of static html that is often used as a loading widget
 * on pages which use the new claims totals widget.
 *
 * It is not included as part of that widget because how the pages handle loading displays
 * varies too much.
 */
@Component({
  selector: "cf-searching-message-widget",
  templateUrl: "./searchingmessagewidget.component.html",
  styleUrls: [
    "../../../../global/css/normalize.scss",
    "../../../../global/css/webflow.scss",
    "./searchingmessagewidget.component.scss",
  ],
})
export class SearchingMessageWidgetComponent {
  constructor() {}
}
