import { Component } from "@angular/core";

/**
 * The page component for the main landing page which is displayed without any other URL
 */
@Component({
  selector: "cf-landing-home-FAQ",
  templateUrl: "./homeFAQ.component.html",
  styleUrls: [
    "../../../global/css/normalize.scss",
    "../../../global/css/webflow.scss",
    "./homeFAQ.component.scss",
  ],
})
export class HomeFAQComponent {
  expandedFlags: boolean[] = [];

  numberOfFaqSections: number = 10;

  constructor() {
    for (let i = 0; i < this.numberOfFaqSections; i++) {
      this.expandedFlags.push(false);
    }
  }

  sectionIsExpanded(section: number): boolean {
    return this.expandedFlags[section];
  }

  expandSection(section: number): void {
    this.expandedFlags[section] = true;
  }

  collapseSection(section: number): void {
    this.expandedFlags[section] = false;
  }

  toggleSection(section: number): void {
    if (this.sectionIsExpanded(section)) {
      this.collapseSection(section);
    } else {
      this.expandSection(section);
    }
  }

  sectionTriggerClass(section: number): string {
    if (this.sectionIsExpanded(section)) {
      return "collapse";
    } else {
      return "expand";
    }
  }
}
