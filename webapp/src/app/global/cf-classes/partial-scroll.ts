import { OnInit } from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { LANDING_LINKS } from "../utils/landing-links";

/**
 * Used by the privacy and terms of service pages to scroll to page sections when theuser clicks certain links.
 */
export class PartialScroll implements OnInit {
  links: any = LANDING_LINKS;
  private fragment: string;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.onAnchorClick();
  }

  onAnchorClick() {
    this.router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        const tree = this.router.parseUrl(this.router.url);
        if (tree.fragment) {
          const element = document.querySelector("#" + tree.fragment);
          this.scrollToElement(element);
        }
      }
    });
  }

  scrollToElement(element) {
    if (element) {
      element.scrollIntoView(true);
      window.scrollBy(0, -100);
    }
  }
}
