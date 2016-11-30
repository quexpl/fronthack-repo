$(window).bind("styleguide:onRendered", function(e) {
  $(".owl-carousel").owlCarousel({
    loop: true,
    items: 1,
    autoPlay: true,
    nav: true
  });
});
