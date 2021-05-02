export function landingSectionScroll(event, id: string, offset: number = 0) {
  let w = this.browser.window;
  let d = this.browser.document;

  this.router.navigate([""]);

  setTimeout(function() {
    let el = d.getElementById(id);

    if (!el) {
      throw "Could not find element for scrolling: (ID)=" + id;
    }

    //w.location.hash = id; // Would be good to have, but not important enough right now.

    let elY = el.offsetTop;

    w.scrollTo(w.scrollX, elY + offset);
  });
}
