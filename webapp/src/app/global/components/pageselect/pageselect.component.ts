import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";

import { LoggerService } from "../../../global/logger.service";

/**
 * A component used at the bottom of tables to navigate between pages of the table.
 *
 * Currently being used on the select claims page for the tables which show the user's claims.
 */
@Component({
  selector: "cf-page-select",
  templateUrl: "./pageselect.component.html",
  styleUrls: [
    "../../../global/css/normalize.scss",
    "../../../global/css/webflow.scss",
    "./pageselect.component.scss",
  ],
})
export class PageSelectComponent implements OnInit {
  @Input() numberOfItems: number;
  @Input() itemName: string;
  @Input() itemsPerPage: number;
  @Input() currentPage: number;

  @Output() pageSelectedEvent = new EventEmitter();

  numberOfLinks: number = 7;

  constructor(private logger: LoggerService) {}

  ngOnInit(): void {
    if (window.innerWidth <= 370) {
      this.numberOfLinks = 5;
    }
  }

  selectPage(pageNum: number) {
    if (pageNum != this.currentPage) {
      this.pageSelectedEvent.emit(pageNum);
    }
  }

  selectPreviousPage() {
    if (this.currentPage > 1) {
      this.pageSelectedEvent.emit(this.currentPage - 1);
    }
  }

  selectNextPage() {
    if (this.currentPage < this.totalNumberOfPages) {
      this.pageSelectedEvent.emit(this.currentPage + 1);
    }
  }

  get totalNumberOfPages(): number {
    return Math.ceil(this.numberOfItems / this.itemsPerPage);
  }

  get firstPageItemNumber(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get lastPageItemNumber(): number {
    let n = (this.currentPage - 1) * this.itemsPerPage + this.itemsPerPage;
    if (n < this.numberOfItems) {
      return n;
    } else {
      return this.numberOfItems;
    }
  }

  get selectablePageNumberArray(): number[] {
    let retval: number[] = [];
    retval.push(1);
    if (this.totalNumberOfPages > this.numberOfLinks) {
      if (this.currentPage <= 3) {
        for (let i = 2; i <= this.numberOfLinks - 1; i++) {
          retval.push(i);
        }
        retval.push(this.totalNumberOfPages);
      } else if (this.currentPage >= this.totalNumberOfPages - 2) {
        for (
          let i = this.totalNumberOfPages - (this.numberOfLinks - 2);
          i <= this.totalNumberOfPages;
          i++
        ) {
          retval.push(i);
        }
      } else {
        // Currently supporting values of 5 or 7 for the number of page links.
        let pageSpread = (this.numberOfLinks - 1 - 2) / 2;
        for (
          let i = this.currentPage - pageSpread;
          i <= this.currentPage + pageSpread;
          i++
        ) {
          retval.push(i);
        }
        retval.push(this.totalNumberOfPages);
      }
    } else {
      for (let i = 2; i <= this.totalNumberOfPages; i++) {
        retval.push(i);
      }
    }
    return retval;
  }
}
