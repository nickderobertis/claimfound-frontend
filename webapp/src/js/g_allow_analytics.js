if (env.CF_ANALYTICS_FE) {
  // var gaUrl = 'https://www.google-analytics.com/analytics.js';
  var gaUrl = "/js/g_analytics.js";
  if (env.CF_ANALYTICS_FE_DEBUG) {
    console.log("Initializing Google Analytics in trace level debug mode");
    window.ga_debug = { trace: true };
    gaUrl = "https://www.google-analytics.com/analytics_debug.js";
  }
  (function(i, s, o, g, r, a, m) {
    i["GoogleAnalyticsObject"] = r;
    (i[r] =
      i[r] ||
      function() {
        (i[r].q = i[r].q || []).push(arguments);
      }),
      (i[r].l = 1 * new Date());
    (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
  })(window, document, "script", gaUrl, "ga");

  ga("create", env.GOOGLE_ANALYTICS_TRACKING_ID, "auto");
}

// (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
//     (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
//     m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
//     })(window,document,'script', gaURL,'ga');

//     ga('create', env.GOOGLE_ANALYTICS_TRACKING_ID, 'auto');
//     ga('send', 'pageview');
