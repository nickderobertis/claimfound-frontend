// Header scroll
$(function() {
  var scrollTrigger = 5;
  $(window).on("scroll", function() {
    var scrollY = window.scrollY;

    var headerContainer = $("cf-landing-header .header-container");
    if (scrollY >= scrollTrigger) {
      if (!headerContainer.hasClass("scroll")) {
        headerContainer.addClass("scroll");
      }
    } else {
      if (headerContainer.hasClass("scroll")) {
        headerContainer.removeClass("scroll");
      }
    }
  });
});

// Tesimonials
$(function() {
  $(document).on(
    "click",
    ".testimonial-wrapper .testimonial-select-div-block",
    function(event) {
      event.preventDefault();
      event.stopPropagation();

      var selectDivs = $(
        ".testimonial-wrapper .testimonial-select-div-block"
      ).removeClass("select");
      var selectDiv = $(this).addClass("select");
      var frames = $(".testimonial-wrapper .testimonial-div").removeClass(
        "middle"
      );

      var index = selectDivs.index(selectDiv);

      if (index === -1) {
        console.error("Could not find index of selectDiv", index);

        return;
      }

      $(frames.get(index)).addClass("middle");
    }
  );
});
