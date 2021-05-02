window.addEventListener("load", function() {
  if (env.CF_ANALYTICS_HOTJAR) {
    var head = document.getElementsByTagName("head")[0];
    var js = document.createElement("script");
    js.type = "text/javascript";
    js.src = "hotjar.js";
    head.appendChild(js);
  }
});
